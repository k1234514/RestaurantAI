import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// AI Menu Generator
export async function generateMenuDescription(dishName, cuisine) {
  const prompt = `
Write a professional restaurant menu description.

Dish Name: ${dishName}
Cuisine: ${cuisine}

Keep it under 60 words.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

// AI Menu Translator
export async function translateMenu(dishName, language) {
  const prompt = `
You are a professional restaurant menu translator.

Dish Name: ${dishName}

Target Language: ${language}

Rules:
1. Translate the dish name.
2. Write a professional menu description in the target language.
3. Do NOT explain the translation.
4. Do NOT write English unless the target language is English.
5. Keep the description under 50 words.

Return ONLY in this format:

Translated Dish:
<translated dish name>

Description:
<translated menu description>
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
export async function generateRestaurantNames(type) {
  const prompt = `
Suggest 10 unique and creative restaurant names.

Restaurant Type:
${type}

Rules:
- Return only the names.
- One name per line.
- Do not add numbering.
- Do not add explanations.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function generateSlogan(name) {
  const prompt = `
Generate 10 short and catchy restaurant slogans.

Restaurant Name:
${name}

Return only the slogans.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function getFoodPricingAdvice(
  ingredient,
  totalCost,
  costPerServing
) {
  const prompt = `
You are a restaurant business consultant.

Ingredient: ${ingredient}
Total Cost: ₹${totalCost}
Cost Per Serving: ₹${costPerServing}

Suggest:
- Recommended selling price
- Profit tips
- Cost saving ideas
- Business advice

Rules:
- Maximum 5 bullet points
- Under 80 words
- Plain English
- No markdown
- No headings
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function suggestMenuPrice(
  dish,
  city,
  restaurantType
) {
  const prompt = `
You are a restaurant pricing expert.

Dish:
${dish}

City:
${city}

Restaurant Type:
${restaurantType}

Suggest:

1. Budget Price
2. Recommended Price
3. Premium Price
4. Short reason

Rules:
- Keep under 80 words.
- Use Indian Rupees (₹).
- No markdown.
- Simple English.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function generateRecipe(dish, cuisine, servings) {
  const prompt = `
You are a professional restaurant chef.

Dish Name:
${dish}

Cuisine:
${cuisine}

Servings:
${servings}

Generate:

Dish Name

Cuisine

Cooking Time

Ingredients with quantities

Step-by-step cooking instructions

Chef Tips

Rules:
- Maximum 300 words.
- Simple English.
- No markdown.
- Keep formatting neat.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function generateSocialCaption(dish) {
  const prompt = `
You are a restaurant marketing expert.

Dish:
${dish}

Write an Instagram caption.

Rules:
- Maximum 60 words
- Add 5 relevant hashtags
- Friendly and attractive
- No markdown
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function generateReviewReply(review) {
  const prompt = `
You are a restaurant customer service expert.

Customer Review:
${review}

Write a professional reply.

Rules:
- Maximum 80 words
- Friendly and polite
- If the review is negative, apologize and offer to improve.
- If positive, thank the customer.
- No markdown.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}


export async function predictInventory(item, dailyUsage, stock) {
  const prompt = `
You are a restaurant inventory manager.

Ingredient:
${item}

Current Stock:
${stock}

Daily Usage:
${dailyUsage}

Generate:

Current Stock Status

Estimated Days Remaining

Reorder Recommendation

Inventory Tips

Rules:
- Under 120 words.
- Simple English.
- No markdown.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}