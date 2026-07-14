import { saveFavorite } from "../utils/favorites";
import { auth } from "../firebase";

function FavoriteButton({ tool, input, output }) {
  async function handleFavorite() {
    if (!output) return;

    try {
      await saveFavorite(
        auth.currentUser?.email || "guest",
        tool,
        input,
        output
      );

      alert("⭐ Added to Favorites");
    } catch (error) {
      console.error(error);
      alert("Failed to save favorite.");
    }
  }

  return (
    <button onClick={handleFavorite}>
      ⭐ Save Favorite
    </button>
  );
}

export default FavoriteButton;