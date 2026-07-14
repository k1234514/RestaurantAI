import { useState } from "react";
import { generateSlogan } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function RestaurantSlogan() {
  const [restaurantName, setRestaurantName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!restaurantName.trim()) {
      alert("Please enter a restaurant name.");
      return;
    }

    setLoading(true);

    try {
      const response = await generateSlogan(restaurantName);

      setResult(response);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Restaurant Slogan",
        restaurantName,
        response
      );
    } catch (error) {
      console.error(error);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setRestaurantName("");
    setResult("");
  }

  return (
    <div className="container">
      <h1>📝 AI Restaurant Slogan Generator</h1>

      <p>Generate catchy slogans for your restaurant.</p>

      <input
        type="text"
        placeholder="Restaurant Name"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Slogans"}
      </button>

      <button onClick={handleClear}>
        🗑 Clear
      </button>

      {loading && (
        <div className="result-box">
          <h2>🤖 AI is thinking...</h2>
        </div>
      )}

      {result && (
        <div className="result-box">
          <h2>Generated Slogans</h2>

          <pre>{result}</pre>

          <CopyButton text={result} />

          <br />
          <br />

          <FavoriteButton
            tool="Restaurant Slogan"
            input={restaurantName}
            output={result}
          />
        </div>
      )}
    </div>
  );
}

export default RestaurantSlogan;