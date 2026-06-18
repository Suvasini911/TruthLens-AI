function UploadPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Upload Content</h1>

      <input type="file" />

      <br />
      <br />

      <textarea
        placeholder="Paste article text here..."
        rows="8"
        cols="50"
      />

      <br />

      <button>Analyze</button>
    </div>
  );
}

export default UploadPage;