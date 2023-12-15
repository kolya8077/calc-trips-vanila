// DownloadButton.js
import React from "react";

const DownloadButton = ({ description }) => {
  const handleDownload = () => {
    const blob = new Blob([description], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownload}>Завантажити файл</button>;
};

export default DownloadButton;
