import sys
from common import conversion_config, client

def oneshot_determination(text):
    system_instruction = "Sen, verilen metinlerin okunabilirlik seviyesini belirleyen bir dil uzmanısın. Görevin, sana verilen metnin okunabilirlik seviyesini (A1, A2, B1, B2) belirlemektir.."
    chat_history = [{"role": "system", "content": system_instruction}]

    prompt = (
        f"Aşağıdaki örneklerden yararlanarak verilen metnin okunabilirlik seviyesini belirle.\n\n---\n\n"
        f"A1: Kahire’den İstanbul’a iki saatte geldik. Uçaktan indim. Heyecanlıyım. Bu tatili çok iyi planladım. Pasaport polisini geçtim. Bavul bandının yanına gittim. Bekledim, bekledim... Bavulum gelmedi. Yine bekledim, yine gelmedi. Güvenlik görevlisini buldum.\n"
        f"A2: Türkiye’yi çok özledim ve şimdi İstanbul’dayım. Yarın üniversiteden arkadaşım Fatih ile buluşacağım. Fatih, müzede çalışıyor. Sabah birlikte kahvaltı yapacağız. Sonra Topkapı Sarayı Müzesine gideceğiz. Dedeme araştırmayı tamamlamak için söz verdim. Sözümü tutmalıyım.\n"
        f"B1: Kenan Bey, erkenden uyandı. Eşi ve çocukları hâlâ uyuyordu. O çok heyecanlıydı. Gardıroptan takım elbisesini alıp hızlıca odadan çıktı. Kıyafetlerini değiştirdi ve kahvaltı etmeden evden çıktı. Sokağın başına kadar yürüdü. Durağa gidip beklemeye başladı. Beş dakika sonra otobüs geldi. Otobüs boştu. Kenan Bey, arka koltuklardan birine oturdu.\n"
        f"B2: Gökhan, kardeşi Bilge ile birlikte kaldığı odanın penceresini açtı. Bağ evlerine gece geç vakitte gelmişlerdi. Onları incir ağaçlarının kuytularında saklanan kuşların ötüşü karşılamıştı. Gökhan bu manzarayı uzun zamandır görmüyordu.\n"
        f"Aşağıdaki metni bu sınıflara göre sınıflandır: A1, A2, B1, B2. Cevabında sadece bu seviyelerden biri olsun. Açıklama yazma.\n"
        f"Metindeki her cümleye karşılık gelecek şekilde, cümle sayısıyla aynı uzunlukta sentenceLevels listesi oluştur.\n"
        f"Metnin seviyesini contentLevel değerine eşitle.\n"
        f"Sadece aşağıdaki JSON formatında cevap ver:\n\n"
        f"{{\n"
        f'  "contentLevel": "B1",\n'
        f'  "sentenceLevels": [\n'
        f'    "A1",\n'
        f'    "B2",\n'
        f'    "B1"\n'
        f'  ]\n'
        f"}}\n\n"
        f"Metin: {text}\n"
        f"Cevap:\n"
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

print(oneshot_determination(sys.argv[1]))
