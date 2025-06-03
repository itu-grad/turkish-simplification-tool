import json
import os
import sys
import random
import concurrent.futures
from common import conversion_config, client

def choose_features(features_file="sources/features.txt" ):
    feature_probabilities = [0.20, 0.35, 0.25, 0.10, 0.05, 0.03, 0.02]
    num_features = random.choices(range(7), weights=feature_probabilities, k=1)[0]
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base_dir, features_file), "r", encoding="utf-8") as file:
        features = [line.strip() for line in file.readlines() if line.strip()]
    
    chosen_features = random.sample(features, num_features)
    
    if chosen_features:
        chosen_features[0] = chosen_features[0].capitalize()
    
    return chosen_features

def select_names(file_path="sources/names.txt"):
    num_probs = [0.5, 0.35, 0.10, 0.05]
    num_names = random.choices(range(1, 5), weights=num_probs, k=1)[0]

    base_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base_dir, file_path), "r", encoding="utf-8") as file:
        names = [line.strip() for line in file.readlines() if line.strip()]

    selected_names = random.sample(names, num_names)

    return selected_names

def get_story(level: str, filename="sources/stories.json"):
    data = None
    base_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base_dir, filename), "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get(level.lower()) if data else None

def build_prompt(level, word_count, theme, content, target_words, target_grammar, story=None):
    names = select_names()
    if len(names) == 1:
        names_prompt = f"Hikayedeki karakterin adı {names[0]} olmalıdır."
    else:
        names_prompt = f"Hikayedeki karakterlerin adları {', '.join(names[:-1])} ve {names[-1]} olmalıdır."

    start_with_name = random.random() < 0.35
    start_prompt = "Hikayeyi bir karakter adı ile başlatma." if not start_with_name else ""

    features = choose_features()
    if not features:
        base_prompt = f"{names_prompt} {start_prompt}"
    elif len(features) == 1:
        feature = features[0].capitalize()
        base_prompt = (
            f"{feature}. Bu özellik, hikayede açıkça ifade edilmemelidir; sadece hikayenin bağlamına doğal bir şekilde dahil edilmelidir. {names_prompt} {start_prompt}"
        )
    else:
        base_prompt = (
            f"Hikayede şu özellikler bulunmalıdır: {', '.join(features)}. Bu özellikler, hikayede açıkça ifade edilmemelidir; sadece hikayenin bağlamına doğal bir şekilde dahil edilmelidir. {names_prompt} {start_prompt}"
        )

    prompt = (
        f"{base_prompt}\n"
        f"Aşağıdaki kriterlere göre özgün ve doğal Türkçe metin üret:\n"
        f"Metin oluşturma kriterleri:\n"
        f"- Seviye: {level}\n"
        f"- Kelime sayısı: Yaklaşık {word_count} kelime\n"
        f"- Tema: {theme}\n"
        f"- İlham alınacak içerik: \"{content}\"\n"
        f"- Hedef kelimeler: {', '.join(target_words) if target_words else 'Yok'}\n"
        f"- Hedef dil bilgisi yapıları: {', '.join(target_grammar) if target_grammar else 'Yok'}\n"
    )

    if story:
        prompt += f"- Verilen seviyeye örnek bir metin: \"{story}\"\n"

    prompt += (
        "\nLütfen yukarıdaki kriterlere uygun, özgün ve akıcı bir Türkçe metin üret. Metin seviyeye uygun olmalı, hedef kelimeler "
        "ve dil bilgisi yapıları doğal bir şekilde kullanılmalıdır.\n"
        "Lütfen sadece aşağıdaki JSON formatında cevap ver:\n"
        "{\n"
        "  \"response\": [\n"
        "    { \"text\": \"Metin 1\" }\n"
        "  ]\n"
        "}\n"
    )
    return prompt

def call_chat_api(prompt):
    system_instruction = (
        "Sen, Türkçe öğretimi için metinler yazan bir dil uzmanısın. "
        "Görevin, belirli bir seviyeye (A1, A2, B1, B2) uygun, hedef kelimeleri ve dil bilgisi yapılarını içeren "
        "özgün bir metin üretmektir. Metin verilen tema ve içeriğe uygun olmalı, öğrencilerin seviyesine uygun bir dil kullanılmalıdır."
    )
    chat_history = [{"role": "system", "content": system_instruction}]
    chat_history.append({"role": "user", "content": prompt})
    response = client.chat.completions.create(
        model=conversion_config["model"],
        messages=chat_history,
        temperature=conversion_config["temperature"],
        top_p=conversion_config["top_p"],
        max_tokens=conversion_config["max_tokens"],
    )
    return response.choices[0].message.content

def oneshot_generation(level, word_count, theme, content, target_words, target_grammar):
    story = get_story(level)
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        futures = [
            executor.submit(call_chat_api, build_prompt(level, word_count, theme, content, target_words, target_grammar, story)) 
            for _ in range(3)
        ]
        results = [f.result() for f in concurrent.futures.as_completed(futures)]

    merged = {"alternatives": []}
    for result in results:
        try:
            part = json.loads(result)
            merged["alternatives"].extend(part.get("response", []))
        except Exception as e:
            continue

    return json.dumps(merged)

print(oneshot_generation(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6]))
