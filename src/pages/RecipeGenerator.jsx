import { useState } from "react";
import { generateRecipe } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function RecipeGenerator() {
  const [dish, setDish] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [servings, setServings] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!dish.trim() || !cuisine.trim() || !servings) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateRecipe(
        dish,
        cuisine,
        servings
      );

      setRecipe(result);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Recipe Generator",
        `${dish} | ${cuisine} | ${servings} servings`,
        result
      );
    } catch (error) {
      console.error(error);
      setRecipe("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setDish("");
    setCuisine("");
    setServings("");
    setRecipe("");
  }

  return (
    <div className="container">
      <h1>👨‍🍳 AI Recipe Generator</h1>

      <p>Generate complete restaurant recipes using AI.</p>

      <input
        type="text"
        placeholder="Dish Name"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
      />

      <input
        type="text"
        placeholder="Cuisine"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />

      <input
        type="number"
        placeholder="Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      <button onClick={handleClear}>
        🗑 Clear
      </button>

      {loading && (
        <div className="result-box">
          <h2>🤖 AI is thinking...</h2>
        </div>
      )}

      {recipe && (
        <div className="result-box">
          <h2>🍳 Generated Recipe</h2>

          <pre>{recipe}</pre>

          <CopyButton text={recipe} />

          <br />
          <br />

          <FavoriteButton
            tool="Recipe Generator"
            input={`${dish} | ${cuisine} | ${servings} servings`}
            output={recipe}
          />
        </div>
      )}
    </div>
  );
}

export default RecipeGenerator;