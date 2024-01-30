import OpenAI from "openai";
import express from "express";

const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });


export const outfits = async(req: express.Request, res: express.Response) =>{
    try{
        const completion = await openai.chat.completions.create({
            messages: [
                {
                  role: "system",
                  content: "You are a helpful assistant designed to output JSON.",
                },
                { role: "user", content: "write 3 outfits for a MALE. The occasion is a house party. The style should be simple" },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
          });
          completion.choices[0].message.content = JSON.parse(completion.choices[0].message.content)
        return res.status(200).json(completion.choices[0].message).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}