import { useEffect, useState } from "react";
import {
  getFavorites,
  deleteFavorite,
} from "../utils/favorites";
import { auth } from "../firebase";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites() {
    try {
      const email = auth.currentUser?.email;

      if (!email) {
        setFavorites([]);
        return;
      }

      const data = await getFavorites(email);
      setFavorites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function handleDelete(id) {
    await deleteFavorite(id);
    loadFavorites();
  }

  return (
    <div className="container">
      <h1>⭐ Favorites</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : favorites.length === 0 ? (
        <h2>No favorites found.</h2>
      ) : (
        favorites.map((item) => (
          <div className="result-box" key={item.id}>
            <h3>{item.tool}</h3>

            <p>
              <strong>Input:</strong> {item.input}
            </p>

            <pre>{item.output}</pre>

            <button
              onClick={() => handleDelete(item.id)}
            >
              Remove Favorite
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;