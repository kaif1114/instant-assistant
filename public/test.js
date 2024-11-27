function executeScript() {
  console.log("Attempting to initialize chat...");
  const script = document.createElement("script");
  script.src = "http://localhost:3000/embed.js";

  script.onload = function () {
    console.log("embed.js loaded");
    if (typeof window.initAIChat === "function") {
      console.log("initAIChat is available");
      window.initAIChat({
        assistantId: "5533213a-74b6-4713-be51-4f59e65d9b17",
      });
    } else {
      console.error("initAIChat is not available");
    }
  };

  script.onerror = function () {
    console.error("Failed to load embed.js");
  };

  document.body.appendChild(script);
}
executeScript();
