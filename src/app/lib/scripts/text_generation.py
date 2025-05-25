import sys
from common import conversion_config, client

def oneshot_generation(level, word_count, theme, content, target_words, target_grammar):
    system_instruction = (
        "Sen, Türkçe öğretimi için metinler yazan bir dil uzmanısın. "
        "Görevin, belirli bir seviyeye (A1, A2, B1, B2) uygun, hedef kelimeleri ve dil bilgisi yapılarını içeren "
        "özgün bir metin üretmektir. Metin verilen tema ve içeriğe uygun olmalı, öğrencilerin seviyesine uygun bir dil kullanılmalıdır."
    )
    chat_history = [{"role": "system", "content": system_instruction}]

    prompt = (
        f"Aşağıdaki kriterlere göre 3 farklı, özgün ve doğal Türkçe metin üret:\n"
        f"Metin oluşturma kriterleri:\n"
        f"- Seviye: {level}\n"
        f"- Kelime sayısı: Yaklaşık {word_count} kelime\n"
        f"- Tema: {theme}\n"
        f"- İlham alınacak içerik: \"{content}\"\n"
        f"- Hedef kelimeler: {', '.join(target_words) if target_words else 'Yok'}\n"
        f"- Hedef dil bilgisi yapıları: {', '.join(target_grammar) if target_grammar else 'Yok'}\n\n"
        f"Lütfen yukarıdaki kriterlere uygun, özgün ve akıcı bir Türkçe metin üret. Metin seviyeye uygun olmalı, hedef kelimeler "
        f"ve dil bilgisi yapıları doğal bir şekilde kullanılmalıdır.\n"
        f"Lütfen sadece aşağıdaki JSON formatında cevap ver:\n"
        f"{{\n"
        f"  \"alternatives\": [\n"
        f"    {{ \"text\": \"Metin 1\" }},\n"
        f"    {{ \"text\": \"Metin 2\" }},\n"
        f"    {{ \"text\": \"Metin 3\" }}\n"
        f"  ]\n"
        f"}}\n"
    )

    chat_history.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model=conversion_config["model"],
        messages=chat_history,
        temperature=conversion_config["temperature"],
        top_p=conversion_config["top_p"],
        max_tokens=conversion_config["max_tokens"],
    )
    
    output = response.choices[0].message.content
    return output

print(oneshot_generation(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6]))
