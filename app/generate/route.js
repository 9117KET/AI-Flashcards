import {NextResponse} from "next/server";
import OpenAI from "openai";

// System prompt for the OpenAI model, describing the task of generating flashcards
const systemPrompt = `
You are a flashcard generator. Here are your tasks:
- Accept a topic and a collection of existing flashcards as input.
- Examine the content and structure of the existing flashcards to understand their format and information.
- Create a new flashcard that is pertinent to the specified topic and ensures it adds value to the existing collection without repeating content.
- Craft the new flashcard to be succinct and clear, facilitating efficient learning.
- Check the new flashcard for factual accuracy and topical relevance.
- Employ natural language processing techniques to refine and enhance the content of the flashcard.
- Summarize the new flashcard content for a quick review to ensure it meets the required standards before it is finalized.
- Format and return the newly created flashcard in JSON format to ensure compatibility with existing systems.
- Ensure the integration of the new flashcard with the existing database or storage system.
- Provide an API endpoint to retrieve the newly generated flashcard for immediate use.

Remember the goal is to facilitate effective learning and retention of information.

Return in the following JSON format:
{
  "flashcard": [{
    "front": string,
    "back": string
  }]
}
`

// POST function to handle the creation of a new flashcard
export async function POST(request) {
    // Initialize the OpenAI client
    const openai = new OpenAI();

    // Retrieve the request data as text
    const data = await request.text();

    try {
        // Create a completion using the OpenAI API with the system and user messages
        const completion = await openai.chat.completion.create({
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
            model: "gpt-4o", // Specify the model to use
            response_format: "json" // Corrected response format
        });

        // Parse the JSON response to extract the flashcard data
        const flashcard = JSON.parse(completion.choices[0].message.content);

        // Return the flashcard data as a JSON response
        return NextResponse.json(flashcard.flashcard);
    } catch (error) {
        // Handle errors gracefully
        console.error("Error generating flashcard:", error);
        return NextResponse.json({ error: "Failed to generate flashcard" }, { status: 500 });
    }
}
