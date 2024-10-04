import { useEffect, useState } from "react";
import "./App.css";
import cashAppLogo from '/cash_app.svg';

function App() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const URL = "/api/hello/Cash App";

    fetch(URL)
    .then((res) => res.json())
    .then((data) => setContent(data.message));
  }, []);

  return (
      <>
      <div>
        <a href="https://cash.app/" target="_blank">
          <img src={cashAppLogo} className="logo" alt="Cash App logo" />
        </a>
      </div>
      <h1>{content}</h1>
    </>
  );
}

export default App;
