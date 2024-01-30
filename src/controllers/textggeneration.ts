import OpenAI from "openai";
import express from "express";
import {get, merge} from 'lodash';
import { getProfileByUserId } from "../database/profiles";

const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });
const MAX_GENERATIONS = 4

export const generateOutfits = async(req: express.Request, res: express.Response) =>{
    const currentUserId = get(req, 'identity.id') as string;
    let count: number = parseInt(req.params.count, 10);
    const profile = await getProfileByUserId(currentUserId)
    count = count>MAX_GENERATIONS? MAX_GENERATIONS:count
    const styleNames = profile.styles.map(style => style.name);

    const prompt = `Create exactly ${count} Outfit Objects (The objects need to have "top", "bottom", "shoes", "accessory" in it) in a list. for a ${profile.gender.name}. My silhouette is ${profile.silhouette.name}. The style represent those styles: ${styleNames} if a style does not fit to the rest, ignore it.`
    console.log(prompt)
    try{
        const completion = await openai.chat.completions.create({
            messages: [
                {
                  role: "system",
                  content: "You are a professional stylist designed to output JSON.",
                },
                { role: "user", content: prompt },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
            // functions: [
            //     {
            //         name: "createOutfitObject",
            //         description: "Create a great outfit that will fit nicely together",
            //         parameters: {
            //             type: "object",
            //             properties: {
            //                 top: {
            //                     type: "string",
            //                 },
            //                 bottom: {
            //                     type: "string",
            //                 },
            //                 shoes: {
            //                     type: "string",
            //                 },
            //                 accessory: {
            //                     type: "string",
            //                 },
            //             },
            //             required: ["top", "bottom", "shoes", "accessory"]
            //         }
            //     }
            // ],
            // function_call: { name: "createOutfitObject" }
          });
          completion.choices[0].message.content = JSON.parse(completion.choices[0].message.content)
        return res.status(200).json(completion.choices[0].message).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}