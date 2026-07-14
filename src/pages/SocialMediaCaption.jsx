import { useState } from "react";
import { generateSocialCaption } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function SocialMediaCaption() {
  const [dish, setDish] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!dish.trim()) {
      alert("Please enter a dish name.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateSocialCaption(dish);

      setCaption(result);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Social Media Caption",
        dish,
        result
      );
    } catch (error) {
      console.error(error);
      setCaption("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setDish("");
    setCaption("");
  }

  return (
    <div className="container">
      <h1>📱 AI Social Media Caption Generator</h1>

      <p>Create engaging captions for your restaurant posts.</p>

      <input
        type="text"
        placeholder="Dish Name"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Caption"}
      </button>

      <button onClick={handleClear}>
        🗑 Clear
      </button>

      {loading && (
        <div className="result-box">
          <h2>🤖 AI is thinking...</h2>
        </div>
      )}

      {caption && (
        <div className="result-box">
          <h2>📢 Caption</h2>

          <pre>{caption}</pre>

          <CopyButton text={caption} />

          <br />
          <br />

          <FavoriteButton
            tool="Social Media Caption"
            input={dish}
            output={caption}
          />
        </div>
      )}
    </div>
  );
}

export default SocialMediaCaption;