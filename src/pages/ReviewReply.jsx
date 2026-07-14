import { useState } from "react";
import { generateReviewReply } from "../services/gemini";
import { saveHistory } from "../services/firestore";
import { auth } from "../firebase";
import CopyButton from "../components/CopyButton";
import FavoriteButton from "../components/FavoriteButton";

function ReviewReply() {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!review.trim()) {
      alert("Please enter a customer review.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateReviewReply(review);

      setReply(result);

      await saveHistory(
        auth.currentUser?.email || "guest",
        "Review Reply",
        review,
        result
      );
    } catch (error) {
      console.error(error);
      setReply("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setReview("");
    setReply("");
  }

  return (
    <div className="container">
      <h1>⭐ AI Review Reply Generator</h1>

      <p>Generate professional replies to customer reviews.</p>

      <textarea
        rows="6"
        placeholder="Paste customer review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      <button onClick={handleClear}>
        🗑 Clear
      </button>

      {loading && (
        <div className="result-box">
          <h2>🤖 AI is thinking...</h2>
        </div>
      )}

      {reply && (
        <div className="result-box">
          <h2>💬 Suggested Reply</h2>

          <pre>{reply}</pre>

          <CopyButton text={reply} />

          <br />
          <br />

          <FavoriteButton
            tool="Review Reply"
            input={review}
            output={reply}
          />
        </div>
      )}
    </div>
  );
}

export default ReviewReply;