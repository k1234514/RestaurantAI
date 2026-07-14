import { useState } from "react";
import { suggestMenuPrice } from "../services/gemini";
function MenuPriceSuggestion() {
  const [dish, setDish] = useState("");
  const [city, setCity] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);

async function handleSuggest() {
  if (!dish || !city || !restaurantType) {
    alert("Please fill all fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await suggestMenuPrice(
      dish,
      city,
      restaurantType
    );

    setResult(response);
  } catch (error) {
    console.error(error);
    setResult("Something went wrong.");
  }

  setLoading(false);
}
  return (
    <div className="container">
      <h1>💵 AI Menu Price Suggestion</h1>

      <p>
        Get AI-powered menu pricing based on your city and restaurant type.
      </p>

      <input
        type="text"
        placeholder="Dish Name"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
      />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        type="text"
        placeholder="Restaurant Type"
        value={restaurantType}
        onChange={(e) => setRestaurantType(e.target.value)}
      />

      <button onClick={handleSuggest}>
  Suggest Price
</button>

{loading && (
  <div className="result-box">
    <h2>🤖 AI is thinking...</h2>
  </div>
)}

{result && (
  <div className="result-box">
    <h2>💵 Suggested Menu Price</h2>

    <pre
  style={{
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    textAlign: "left",
    fontFamily: "inherit",
    lineHeight: "1.7",
  }}
>
  {result}
</pre>
  </div>
)}
    </div>
  );
}

export default MenuPriceSuggestion;