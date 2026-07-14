import { useEffect, useState } from "react";
import {
  getHistory,
  deleteHistory,
  clearAllHistory,
} from "../services/firestore";
import { auth } from "../firebase";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    try {
      const email = auth.currentUser?.email;

      if (!email) {
        setHistory([]);
        return;
      }

      const data = await getHistory(email);
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function handleDelete(id) {
    await deleteHistory(id);
    loadHistory();
  }

  async function handleClearAll() {
    const email = auth.currentUser?.email;

    if (!email) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all history?"
    );

    if (!confirmDelete) return;

    await clearAllHistory(email);
    loadHistory();
  }

  return (
    <div className="container">
      <h1>📜 AI History</h1>

      <button onClick={handleClearAll}>
        🗑 Delete All History
      </button>

      <br />
      <br />

      {loading ? (
        <h2>Loading...</h2>
      ) : history.length === 0 ? (
        <h2>No history found.</h2>
      ) : (
        history.map((item) => (
          <div className="result-box" key={item.id}>
            <h3>{item.tool}</h3>

            <p>
              <strong>Input:</strong> {item.input}
            </p>

            <pre>{item.output}</pre>

            <button
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default History;