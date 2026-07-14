import { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button onClick={handleCopy}>
      {copied ? "✅ Copied" : "📋 Copy"}
    </button>
  );
}

export default CopyButton;