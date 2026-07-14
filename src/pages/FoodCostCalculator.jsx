import { useState } from "react";
import { getFoodPricingAdvice } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function FoodCostCalculator() {
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [servings, setServings] = useState("");

  const [result, setResult] = useState(null);
  const [aiAdvice, setAiAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalculate() {
    if (!ingredient || !quantity || !price || !servings) {
      alert("Please fill all fields.");
      return;
    }

    const totalCost = Number(quantity) * Number(price);
    const costPerServing = totalCost / Number(servings);
    const sellingPrice = costPerServing * 2.5;
    const profit = sellingPrice - costPerServing;

    setResult({
      totalCost,
      costPerServing,
      sellingPrice,
      profit,
    });

    setLoading(true);

    try {
      const advice = await getFoodPricingAdvice(
        ingredient,
        totalCost,
        costPerServing.toFixed(2)
      );

      setAiAdvice(advice);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Food Cost Calculator",
        `${ingredient} | Qty: ${quantity} | Price: ₹${price} | Servings: ${servings}`,
        `Total Cost: ₹${totalCost}
Cost Per Serving: ₹${costPerServing.toFixed(2)}
Selling Price: ₹${sellingPrice.toFixed(2)}
Profit: ₹${profit.toFixed(2)}

AI Advice:
${advice}`
      );
    } catch (error) {
      console.error(error);
      setAiAdvice("Something went wrong while getting AI advice.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setIngredient("");
    setQuantity("");
    setPrice("");
    setServings("");
    setResult(null);
    setAiAdvice("");
  }

  return (
    <div className="container">
      <h1>💰 Food Cost Calculator</h1>

      <p>
        Calculate ingredient costs and estimate your selling price.
      </p>

      <input
        type="text"
        placeholder="Ingredient Name"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price (₹)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Number of Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
      />

      <button onClick={handleCalculate} disabled={loading}>
        {loading ? "Calculating..." : "Calculate"}
      </button>

      <button onClick={handleClear}>
        🗑 Clear
      </button>

      {result && (
        <div className="result-box">
          <h2>Calculation Result</h2>

          <p>
            <strong>Total Cost:</strong> ₹{result.totalCost}
          </p>

          <p>
            <strong>Cost Per Serving:</strong> ₹
            {result.costPerServing.toFixed(2)}
          </p>

          <p>
            <strong>Suggested Selling Price:</strong> ₹
            {result.sellingPrice.toFixed(2)}
          </p>

          <p>
            <strong>Estimated Profit:</strong> ₹
            {result.profit.toFixed(2)}
          </p>
        </div>
      )}

      {loading && (
        <div className="result-box">
          <h2>🤖 AI is thinking...</h2>
        </div>
      )}

      {aiAdvice && (
        <div className="result-box">
          <h2>🤖 AI Business Advice</h2>

          <div className="ai-advice">
            {aiAdvice.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <CopyButton text={aiAdvice} />

          <br />
          <br />

          <FavoriteButton
            tool="Food Cost Calculator"
            input={`${ingredient} | Qty: ${quantity} | Price: ₹${price} | Servings: ${servings}`}
            output={aiAdvice}
          />
        </div>
      )}
    </div>
  );
}

export default FoodCostCalculator;