import { useState } from "react";
import "../App.css";
import { translateMenu } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function MenuTranslator() {
  const [dishName, setDishName] = useState("");
  const [language, setLanguage] = useState("Gujarati");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTranslate() {
    if (!dishName.trim()) {
      alert("Please enter a dish name.");
      return;
    }

    setLoading(true);

    try {
      const response = await translateMenu(dishName, language);

      setResult(response);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Menu Translator",
        `${dishName} (${language})`,
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
    setDishName("");
    setLanguage("Gujarati");
    setResult("");
  }

  return (
    <div className="container">
      <h1>🌍 AI Menu Translator</h1>

      <p>Translate restaurant dishes into different languages.</p>

      <input
        type="text"
        placeholder="Enter Dish Name"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option>Gujarati</option>
        <option>Hindi</option>
        <option>Marathi</option>
        <option>English</option>
      </select>

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "Translating..." : "Translate"}
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
          <h3>Translation</h3>

          <pre>{result}</pre>

          <CopyButton text={result} />

          <br />
          <br />

          <FavoriteButton
            tool="Menu Translator"
            input={`${dishName} (${language})`}
            output={result}
          />
        </div>
      )}
    </div>
  );
}

export default MenuTranslator;