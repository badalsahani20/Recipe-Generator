
    import { HfInference } from "@huggingface/inference";

    // const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

    const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make
with some or all of those ingredients. You don't need to use every ingredient they mention. The recipe can include additional ingredients they didn't mention, but try not to 
include too many extra ones. Format your response in markdown for better readability.`;

    const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);



    export async function getRecipeFromMistral(ingredientsArr) {
        const ingredientsString = ingredientsArr.join(", ");


        try {
            const response = await hf.chatCompletion({
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // ✅ Make sure this model is supported!
                messages: [
                    {role: "system", content: SYSTEM_PROMPT },
                    {role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
                ],
                max_tokens: 1024,
                // ✅ safest to REMOVE "inference_provider" entirely and rely on default HuggingFace Inference API
                options: {
                    wait_for_model: true
                }
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error("Hugging Face Error:", error.message);
            return "Failed to generate recipe. Please try again.";
        }
    }


