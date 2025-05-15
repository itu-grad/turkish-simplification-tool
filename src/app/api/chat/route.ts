import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { original_text } = await req.json();

  const system_instruction =
    "Sen, öyküleri içerik yönünden sadeleştirme konusunda uzmansın. Görevin, sana verilen metni beşli anlatı şemasına göre analiz edip bu şemayı kullanarak metni sadeleştirmektir.";

  const prompt = `
Beşli anlatı şemasından yararlanarak yalnızca verilen metnin iletisi ile ilgisi olmayan tamamen vazgeçilebilir cümleleri sil. Bu cümleler, çıkarıldığında metnin akışı hiçbir şekilde bozulmayan cümleler olmalıdır.

---

Beşli anlatı şeması şunlardan oluşur:
1. Başlangıç Durumu: Kurulu bir düzenin varlığı belirtilmektedir. Söz konusu düzenle ilgili kişi, zaman ve uzam betimlenmektedir.
2. Dönüştürücü Öğe (Düğüm): Sözü edilen düzeni bozan bir olay gelişmektedir.
3. Dinamik Olaylar Zinciri (Eylem): Dönüştürücü ögeyle gelen yeni olayları içermektedir.
4. Onarıcı/Dengeleyici Öğe: Düzenin bozulmasına neden olan sorun, çözüme ulaştırılır.
5. Bitiş Durumu: Dengenin kurulmasıyla ya başlangıç durumuna dönülmektedir ya da yeni bir durum ortaya çıkmaktadır.

---

Silmediğin cümlelerde bir değişiklik yapma. Metnin son cümlesini silme. Satır yapısını ve paragraf düzenini olduğu gibi koru. Çıktıda sadece sadeleştirilmiş metni ver, herhangi bir açıklama yazma.

---

Özgün Metin:
${original_text}

İçerik Olarak Sadeleşmiş Metin:
`;

  const apiKey = process.env.OPENAI_API_KEY;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: system_instruction },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  const data = await openaiRes.json();
  const reply = data.choices?.[0]?.message?.content;

  return NextResponse.json({ reply });
}
