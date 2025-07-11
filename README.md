## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Stemmer Server

For stemming the Turkish words, [Zemberek Server](https://github.com/cbilgili/zemberek-nlp-server) is used. It should be running at the background in order to analyse the levels of the words in the text.

## Local Development
To run the project, you should have `.env.local` file located in the project root. An example file is shown below:
```
PIPELINE_TOKEN=xx
API_URL=http://tools.nlp.itu.edu.tr/SimpleApi
ZEMBEREK_URL=http://localhost:4567/find_pos
USE_ZEMBEREK=true
OPENAI_CONFIG_MODEL=gpt-4.1-nano
OPENAI_CONFIG_TEMP=0.8
OPENAI_CONFIG_TOP_P=0.95
OPENAI_CONFIG_MAX_TOKENS=8192
OPENAI_API_KEY=xx
```
- `PIPELINE_TOKEN` is the token to use for `tools.nlp.itu.edu.tr` api. If you do not want to use zemberek server, you can use this api with the provided token.
- `USE_ZEMBEREK` is a flag for whether to use zemberek server or not.
- `OPENAPI_x` variables are the configs for ChatGPT connection.

## Final Report
You can see the final report in this [link](https://drive.google.com/file/d/1tTGSd7uIuT7tmOFCmT_3jzPu6H2CFLFC/view?usp=sharing).
