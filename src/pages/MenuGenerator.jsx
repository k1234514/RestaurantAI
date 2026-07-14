import { useState } from "react";
import { generateMenuDescription } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";

import "../App.css";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function MenuGenerator() {
  const [dishName, setDishName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!dishName.trim() || !cuisine.trim()) {
      alert("Please enter both Dish Name and Cuisine.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateMenuDescription(
        dishName,
        cuisine
      );

      setDescription(result);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Menu Generator",
        `${dishName} (${cuisine})`,
        result
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setDishName("");
    setCuisine("");
    setDescription("");
  }

  return (
    <div className="container">
      <h1>🍽 RestaurantAI</h1>

      <h2>AI Menu Generator</h2>

      <p>Generate professional menu descriptions in seconds.</p>

      <input
        type="text"
        placeholder="Enter Dish Name"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleGenerate();
        }}
      />

      <p>Characters: {dishName.length}</p>

      <input
        type="text"
        placeholder="Cuisine (Indian, Chinese...)"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleGenerate();
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Description"}
      </button>

      <button onClick={handleClear}>
        🗑 Clear
      </button>

      {loading && (
        <div className="result-box">
          <h2>🤖 AI is thinking...</h2>
        </div>
      )}

      {description && (
        <div className="result-box">
          <h2>Generated Description</h2>

          <pre>{description}</pre>

          <CopyButton text={description} />

          <br />
          <br />

          <FavoriteButton
            tool="Menu Generator"
            input={`${dishName} (${cuisine})`}
            output={description}
          />
        </div>
      )}
    </div>
  );
}

export default MenuGenerator;