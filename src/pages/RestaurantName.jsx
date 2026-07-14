import { useState } from "react";
import { generateRestaurantNames } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function RestaurantName() {
  const [restaurantType, setRestaurantType] = useState("");
  const [names, setNames] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!restaurantType.trim()) {
      alert("Please enter restaurant type.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateRestaurantNames(restaurantType);

      setNames(result);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Restaurant Name Generator",
        restaurantType,
        result
      );
    } catch (error) {
      console.error(error);
      setNames("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setRestaurantType("");
    setNames("");
  }

  return (
    <div className="container">
      <h1>🏪 AI Restaurant Name Generator</h1>

      <p>Generate unique restaurant names using AI.</p>

      <input
        type="text"
        placeholder="Restaurant Type (Cafe, Fast Food, Chinese...)"
        value={restaurantType}
        onChange={(e) => setRestaurantType(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Names"}
      </button>

      <button onClick={handleClear}>
        🗑 Clear
      </button>

      {loading && (
        <div className="result-box">
          <h2>🤖 AI is thinking...</h2>
        </div>
      )}

      {names && (
        <div className="result-box">
          <h3>Suggested Restaurant Names</h3>

          <pre>{names}</pre>

          <CopyButton text={names} />

          <br />
          <br />

          <FavoriteButton
            tool="Restaurant Name Generator"
            input={restaurantType}
            output={names}
          />
        </div>
      )}
    </div>
  );
}

export default RestaurantName;