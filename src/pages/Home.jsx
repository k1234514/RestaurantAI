import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="container">

      {/* Hero Section */}
      <h1>🍽 RestaurantAI</h1>

      <h2>AI-Powered Restaurant Toolkit</h2>

      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        Everything a modern restaurant needs in one place.
        Generate menus, recipes, captions, slogans, pricing,
        review replies and much more using Artificial Intelligence.
      </p>

      <div className="hero-buttons">
        <Link to="/menu-generator">
          <button>🚀 Get Started</button>
        </Link>

        <Link to="/history">
          <button>📜 View History</button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="features">

        <div className="feature-card">
          <h2>🤖</h2>
          <h3>10 AI Tools</h3>
          <p>Powerful AI tools for restaurants.</p>
        </div>

        <div className="feature-card">
          <h2>⭐</h2>
          <h3>Favorites</h3>
          <p>Save your best AI results.</p>
        </div>

        <div className="feature-card">
          <h2>📜</h2>
          <h3>History</h3>
          <p>Access all previously generated content.</p>
        </div>

      </div>

      <h2 style={{ marginTop: "60px" }}>
        🚀 AI Tools
      </h2>

      <div className="features">

        <div className="feature-card">
          <h3>🍽 AI Menu Generator</h3>
          <p>Create professional restaurant menu descriptions.</p>

          <Link to="/menu-generator">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>🌍 AI Menu Translator</h3>
          <p>Translate dishes into multiple languages.</p>

          <Link to="/menu-translator">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>💰 Food Cost Calculator</h3>
          <p>Estimate food cost, selling price and profit.</p>

          <Link to="/food-cost-calculator">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>👨‍🍳 AI Recipe Generator</h3>
          <p>Create complete restaurant recipes.</p>

          <Link to="/recipe-generator">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>💵 AI Menu Price Suggestion</h3>
          <p>AI-powered pricing recommendations.</p>

          <Link to="/menu-price">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>📱 AI Social Caption</h3>
          <p>Create Instagram and Facebook captions.</p>

          <Link to="/social-caption">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>⭐ AI Review Reply</h3>
          <p>Generate professional customer replies.</p>

          <Link to="/review-reply">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>🏪 AI Restaurant Name</h3>
          <p>Create unique restaurant names.</p>

          <Link to="/restaurant-name">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>💬 AI Restaurant Slogan</h3>
          <p>Create memorable slogans for your brand.</p>

          <Link to="/restaurant-slogan">
            <button>Open Tool</button>
          </Link>
        </div>

        <div className="feature-card">
          <h3>📦 AI Inventory Predictor</h3>
          <p>Predict inventory usage with AI.</p>

          <Link to="/inventory-predictor">
            <button>Open Tool</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;