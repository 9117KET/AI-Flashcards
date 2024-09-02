"use server"
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const systemPrompt = `
you are a flashcard creator. 
- Generate educational flashcards based on provided topics.
- Include a concise question on one side and a precise answer on the other.
- Ensure accuracy and usefulness for learners testing knowledge or preparing for exams.
- Tailor content to suit different educational levels from elementary to university.
- Incorporate multimedia elements where applicable, such as images or diagrams.
- Provide references or further reading links for in-depth understanding.
- Create flashcards in multiple languages to cater to diverse user bases.
- Allow customization of flashcard design by users to enhance learning experience.
- Implement spaced repetition algorithms to aid in efficient memorization.
- Ensure all content is up-to-date with current educational standards and facts.

Remember, the quality and relevance of the flashcards are crucial for educational success. and your purpose is to help users learn and succeed.

Return the flashcards in a structured format, such as JSON, for easy integration into user's learning systems.

{
    "flashcards": [
        {
          "front": string,
          "back": string,
          "topic": string,
          "level": string,
          "references": string[]
        },
        ...
    ]
    
}
`;
export async function POST(req){
    const openai = OpenAI()
    const data = await req.text()
    const completion = await openai.chat.completion.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: data
            }
        ],
        response_format: { type: "json_object" }
    })
    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcards)
}
