import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content } = body;

        if (!content) {
            return new Response(JSON.stringify({ error: "Parameters wrong" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const pythonPath = path.join(process.cwd(), "src/app/lib/scripts/venv/bin/python");
        const scriptPath = path.join(process.cwd(), "src/app/lib/scripts/level_determination.py");

        const { stdout, stderr } = await execFileAsync(pythonPath, [
            scriptPath,
            content,
        ]);

        if (stderr) {
            console.error(stderr);
            return new Response(JSON.stringify({ error: stderr }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(stdout, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
