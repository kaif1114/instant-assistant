(function () {
  function initChatWidget(assistantId) {
    // Create container for the iframe
    const container = document.createElement("div");
    container.id = "ai-chat-widget";

    // Create and append iframe
    const iframe = document.createElement("iframe");
    const sessionId = Math.random().toString(36).substring(7);
    iframe.src = `${window.location.protocol}//localhost:3000/chat/${assistantId}?embedded=true`;
    iframe.style.cssText =
      "position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 999999;";

    container.appendChild(iframe);
    document.body.appendChild(container);
  }

  // Expose the init function globally
  window.initAIChat = function (config) {
    if (!config.assistantId) {
      console.error("Assistant ID is required");
      return;
    }
    initChatWidget(config.assistantId);
  };
})();
