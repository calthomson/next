import OpenAI from 'openai';

export const dynamic = 'force-static'
 
export async function GET() {

    const openAIClient = new OpenAI({
        organization: 'org-Euj6SoYHv1Df9JXBrXCy2SXA',
        project: 'proj_fH2j9B6pudMcjGeJ9WEc03TK', // Transplainer
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
    })

    const response = await openAIClient.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-4o-mini'
    }).asResponse();
    console.log("response", response)

//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
//   const data = await res.json()

    const data = await response.json()

    return Response.json({ data })
}