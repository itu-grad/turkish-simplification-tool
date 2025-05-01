import { NlpTool } from "./nlpTool";

export async function callPipeline({
    tool = NlpTool.PipelineNoisy,
    input,
}: {
    tool?: string;
    input: string;
}): Promise<string> {
    const token = process.env.PIPELINE_TOKEN;
    const url = process.env.API_URL;
    if (!token || !url) {
        throw new Error('Token or api url is invalid');
    }

    const params = new URLSearchParams({
        tool,
        input,
        token,
    });
    const apiUrl = `${url}?${params.toString()}`;
    // console.log('[DEBUG] Request URL:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return await response.text();
}
