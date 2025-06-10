import ExcelJS, { Style } from "exceljs";

const getLevelStyle = (level: string): Partial<Style> => {
    let levelColor: string;
    switch (level) {
        case "A1":
            levelColor = "A8D5BA";
            break;
        case "A2":
            levelColor = "FFE29A";
            break;
        case "B1":
            levelColor = "9EC9E2";
            break;
        case "B2":
            levelColor = "71B6B2";
            break;
        case "C1":
            levelColor = "FF9B85";
            break;
        case "C2":
            levelColor = "B39CD0";
            break;
        default:
            levelColor = "FFFFFF";
    }

    return {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: `FF${levelColor}` },
        },
        font: {
            bold: true,
        },
        numFmt: 'General',
    };
};


export async function POST(req: Request) {
    const { matchedWords, matchedGrammars, content } = await req.json();

    const workbook = new ExcelJS.Workbook();

    const contentSheet = workbook.addWorksheet("Metin İçeriği");
    contentSheet.addRow(["Metin"]);
    contentSheet.addRow([content]);
    contentSheet.getColumn(1).width = 50;
    contentSheet.getRow(1).height = 30;

    const wordsSheet = workbook.addWorksheet("Kelimeler");
    wordsSheet.addRow(["Kelime", "Seviye"]);
    wordsSheet.getColumn(1).width = 30;
    wordsSheet.getColumn(2).width = 15;
    wordsSheet.getRow(1).height = 30;

    Object.entries(matchedWords as Record<string, string>).forEach(([word, level]) => {
        const row = wordsSheet.addRow([word, level]);
        row.getCell(2).style = getLevelStyle(level);
    });

    const grammarSheet = workbook.addWorksheet("Dil Bilgisi Yapıları");
    grammarSheet.addRow(["Dil Bilgisi", "Seviye"]);
    grammarSheet.getColumn(1).width = 30;
    grammarSheet.getColumn(2).width = 15;
    grammarSheet.getRow(1).height = 30;
    Object.entries(matchedGrammars as Record<string, string>).forEach(([word, level]) => {
        const row = grammarSheet.addRow([word, level]);
        row.getCell(2).style = getLevelStyle(level);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
        status: 200,
        headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="text-analysis.xlsx"',
        },
    });
}
