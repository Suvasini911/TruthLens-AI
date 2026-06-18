import axios from "axios";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);

  const analyzeContent = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/analyze-text",
      {
        text,
      }
    );

    setResult(res.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
      }}
    >
      <h1 style={{ fontSize: "4rem" }}>TruthLens AI</h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        Verify Before You Trust
      </p>
      <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
      />

      {image && (
  <img
    src={URL.createObjectURL(image)}
    alt="Preview"
    width="300"
    style={{
      marginTop: "20px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "2px solid white",
    }}
  />
)}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste news article or text here..."
        rows="10"
        cols="70"
        style={{
          padding: "15px",
          borderRadius: "10px",
        }}
      />

      <button
  onClick={analyzeContent}
  style={{
    marginTop: "20px",
    padding: "12px 30px",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  Analyze Content
</button>
{result && (
  <div
    style={{
      marginTop: "40px",
      width: "700px",
      background: "#111827",
      borderRadius: "15px",
      padding: "25px",
      color: "white",
      boxShadow: "0 0 20px rgba(0,0,0,0.3)",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Content Credibility Report
    </h2>

    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "25px",
      }}
    >
      <div>
  <h3>Trust Score</h3>

  <h1
  style={{
    fontSize: "4rem",
    margin: 0,
  }}
>
  {result.trustScore}/100
</h1>

  <div
    style={{
      width: "200px",
      height: "12px",
      background: "#374151",
      borderRadius: "20px",
      overflow: "hidden",
      marginTop: "10px",
    }}
  >
    <div
      style={{
        width: `${result.trustScore}%`,
        height: "100%",
        background: "#22c55e",
      }}
    />
  </div>
</div>

      <div>
        <h3>Risk Level</h3>
        <h1
          style={{
            color:
              result.riskLevel === "Low"
                ? "#22c55e"
                : "#ef4444",
          }}
        >
          {result.riskLevel}
        </h1>
      </div>
    </div>

    <div
      style={{
        marginTop: "20px",
      }}
    >
      <h3>AI Verdict</h3>

      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {result.prediction}
      </p>
    </div>

    <div
      style={{
        marginTop: "25px",
      }}
    >
      <h3>AI Explanation</h3>

      <ul
  style={{
    listStyle: "none",
    padding: 0,
  }}
>
        <li>✓ Content analyzed successfully</li>
        <li>✓ Writing pattern evaluated</li>
        <li>✓ Language consistency checked</li>
        <li>✓ Risk assessment generated</li>
      </ul>
    </div>
  </div>
)}
    </div>
  );
}

export default App;