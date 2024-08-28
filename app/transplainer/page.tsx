"use client"

import {useState} from 'react';
import OpenAI from 'openai';
import { FormControlLabel, Checkbox, CircularProgress, Typography, Button, TextField, Select, MenuItem } from '@mui/material';


const Page = () => {
    const [input, setInput] = useState("")
    const [response, setResponse] = useState("")
    const [language, setLanguage] = useState("Japanese")
    const [phonetic, setPhonetic] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const openAIClient = new OpenAI({
        organization: 'org-Euj6SoYHv1Df9JXBrXCy2SXA',
        project: 'proj_fH2j9B6pudMcjGeJ9WEc03TK',
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    })

    const generatePrompt = () => {
        return `Translate the following from English to ${language}, including only the translated text in your response${phonetic && ', written phonetically. Again, only include the phonetic translation, not the foreign characters.'}: ${input}`
    }

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            const { data: chatCompletion, response: raw } = await openAIClient.chat.completions.create({
                messages: [{ role: 'user', content: generatePrompt() }],
                model: 'gpt-4o-mini'
            }).withResponse();
            console.log("response", chatCompletion)
            const resp = chatCompletion.choices[0].message.content
            setResponse(resp || '')
        } catch (error) {
            console.log("Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '200px', height: '100px', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                <Typography variant="h2" component="h2">Transplainer</Typography>
                <TextField
                    label="Text to translate"
                    onChange={e => {setInput(e.target.value)}}
                    variant="standard"
                />
                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Select
                        value={language}
                        label="Language"
                        onChange={e => {setLanguage(e.target.value); console.log(e.target.value)}}
                    >
                        <MenuItem value={"Japanese"}>Japanese</MenuItem>
                        <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
                    </Select>
                    <FormControlLabel control={<Checkbox onChange={e => setPhonetic(!phonetic)}/>} label="Phonetic" />
                </div>
                <Button onClick={handleSubmit}>Translate</Button>
                {isLoading && <CircularProgress />}
                <Typography variant="body1">{response}</Typography>
            </div>
        </div>
    )
}

export default Page