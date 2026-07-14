import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { currentUser } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🍽 RestaurantAI
      </Link>

      <div className="nav-links">
        <Link to="/">🏠 Home</Link>

        <Link to="/menu-generator">🍽 Menu</Link>

        <Link to="/menu-translator">🌍 Translate</Link>

        <Link to="/food-cost-calculator">💰 Food Cost</Link>

        <Link to="/recipe-generator">👨‍🍳 Recipes</Link>

        <Link to="/restaurant-name">🏪 Names</Link>

        <Link to="/restaurant-slogan">📝 Slogans</Link>

        <Link to="/social-caption">📱 Captions</Link>

        <Link to="/review-reply">⭐ Reviews</Link>

        <Link to="/inventory-predictor">📦 Inventory</Link>

        <Link to="/history">📜 History</Link>

        <Link to="/favorites">❤️ Favorites</Link>

        {currentUser ? (
          <>
            <span className="user-email">
              👤 {currentUser.email}
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;