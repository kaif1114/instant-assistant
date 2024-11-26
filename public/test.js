function executeScript() {
  console.log("Attempting to initialize chat...");
  const script = document.createElement("script");
  script.src = "http://localhost:3000/embed.js";

  script.onload = function () {
    console.log("embed.js loaded");
    if (typeof window.initAIChat === "function") {
      console.log("initAIChat is available");
      window.initAIChat({
        assistantId: "ae04643b-f123-4359-abed-2e1a27d7344b",
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
