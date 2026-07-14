import { useState } from "react";
import { predictInventory } from "../services/gemini";
import CopyButton from "../components/CopyButton";

function InventoryPredictor() {
  const [item, setItem] = useState("");
  const [stock, setStock] = useState("");
  const [dailyUsage, setDailyUsage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePredict() {
    if (!item || !stock || !dailyUsage) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await predictInventory(
        item,
        dailyUsage,
        stock
      );

      setResult(response);
    } catch (error) {
      console.error(error);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setItem("");
    setStock("");
    setDailyUsage("");
    setResult("");
  }

  return (
    <div className="container">
      <h1>📦 AI Inventory Predictor</h1>

      <p>Predict inventory status using AI.</p>

      <input
        type="text"
        placeholder="Ingredient Name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      <input
        type="number"
        placeholder="Current Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <input
        type="number"
        placeholder="Daily Usage"
        value={dailyUsage}
        onChange={(e) => setDailyUsage(e.target.value)}
      />

      <button onClick={handlePredict}>
        Predict Inventory
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
          <h2>📊 Inventory Report</h2>

          <pre>{result}</pre>

          <CopyButton text={result} />
        </div>
      )}
    </div>
  );
}

export default InventoryPredictor;