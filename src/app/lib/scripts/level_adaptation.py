import os
import sys
from common import conversion_config, client

def clean_story_output(raw_output: str) -> str:

    if "---" in raw_output:
        raw_output = raw_output.split("---")[0].strip()

    lines = raw_output.splitlines()

    if lines:
        lines[0] = lines[0].replace("*", "").strip()

    cleaned = "\n".join(
        " ".join(line.strip().split())
        for line in lines
        if line.strip()
    )

    return cleaned

def oneshot_simplification(original_text, level):
    try:
        system_instruction = "Sen, öyküleri sadeleştirme konusunda uzmansın. Görevin, sana verilen metni belirtilen seviyeye uygun bir şekilde sadeleştirmektir."
        chat_history = [{"role": "system", "content": system_instruction}]

        level_lower = level.lower()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        example_base_path = os.path.join(base_dir, "simplified_stories", "Kayıp")
        example_org_path = os.path.join(example_base_path, "kayıporg.txt")
        example_ref_path = os.path.join(example_base_path, f"kayıp{level_lower}ref.txt")

        try:
            with open(example_org_path, "r", encoding="utf-8") as f:
                example_original = f.read().strip()
            with open(example_ref_path, "r", encoding="utf-8") as f:
                example_simplified = f.read().strip()
        except FileNotFoundError as e:
            print(f"⚠️ file not found: {e}", file=sys.stderr)
            return

        prompt = (
            f"Aşağıdaki örnekten yararlanarak verilen metni {level} seviyesine sadeleştir.\n\n---\n\n"
            f"Özgün Metin:\n{example_original}\n"
            f"{level} Seviyesine Sadeleştirilmiş Metin:\n{example_simplified}\n\n---\n\n"
            f"Çıktıda sadece sadeleştirilmiş metinlerin JSON formatında üç farklı alternatifini ver, "
            f"aşağıdaki yapıya tam olarak uygun olsun ve başka hiçbir şey yazma:\n\n"
            f"{{\n"
            f'  "alternatives": [\n'
            f'    {{"id": 1, "text": "Sadeleştirilmiş Alternatif 1 metni buraya gelecek"}},\n'
            f'    {{"id": 2, "text": "Sadeleştirilmiş Alternatif 2 metni buraya gelecek"}},\n'
            f'    {{"id": 3, "text": "Sadeleştirilmiş Alternatif 3 metni buraya gelecek"}}\n'
            f"  ]\n"
            f"}}\n\n"
            f"Özgün Metin:\n{original_text}\n"
            f"Sadeleştirilmiş Metin Alternatifleri:"
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
        cleaned_output = clean_story_output(output)
        return cleaned_output
    except Exception as e:
        return e.__dict__.get('body')

print(oneshot_simplification(sys.argv[1], sys.argv[2]))