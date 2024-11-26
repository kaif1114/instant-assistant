(function () {
  function initChatWidget(assistantId) {
    // Create container for the iframe and widget
    const container = document.createElement("div");
    container.id = "ai-chat-widget";

    // Create chat widget button
    const widgetButton = document.createElement("button");
    widgetButton.id = "ai-chat-widget-button";
    widgetButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    widgetButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: #4051b5;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    `;

    // Add hover effect
    widgetButton.addEventListener("mouseenter", () => {
      widgetButton.style.transform = "scale(1.1)";
    });

    widgetButton.addEventListener("mouseleave", () => {
      widgetButton.style.transform = isOpen ? "rotate(90deg)" : "scale(1)";
    });

    // Create and append iframe
    const iframe = document.createElement("iframe");
    const sessionId = Math.random().toString(36).substring(7);
    iframe.src = `${window.location.protocol}//localhost:3000/chat/${assistantId}?embedded=true&widgetOpen=false`;
    iframe.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 400px;
      height: 650px;
      border: none;
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999998;
      opacity: 0;
      transform: translateY(100px);
      pointer-events: none;
      transition: all 0.3s ease;
      background-color: transparent;
    `;

    // Add loading state
    const loadingDiv = document.createElement("div");
    loadingDiv.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999997;
      display: none;
      background: white;
      justify-content: center;
      align-items: center;
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
    `;
    loadingDiv.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      ">
        <div style="
          background: #E8B4B8;
          padding: 1rem;
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          text-align: center;
        ">
          AR Mahar's Assistant
        </div>
        <div style="
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        ">
          <div style="
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-radius: 50%;
            border-top: 3px solid #E8B4B8;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          "></div>
          <p style="color: #666;">Loading chat assistant...</p>
        </div>
      </div>
    `;

    // Add error state
    const errorDiv = document.createElement("div");
    errorDiv.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999997;
      display: none;
      background: white;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-family: system-ui, -apple-system, sans-serif;
    `;
    errorDiv.innerHTML = `
      <div style="text-align: center;">
        <p style="color: #dc2626; margin-bottom: 10px;">Failed to load chat assistant</p>
        <button onclick="location.reload()" style="background: #4051b5; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Retry</button>
      </div>
    `;

    // Add styles for spinner animation
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    let isOpen = false;

    widgetButton.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        loadingDiv.style.display = "block";
        iframe.style.opacity = "1";
        iframe.style.transform = "translateY(0)";
        iframe.style.pointerEvents = "auto";
        widgetButton.style.transform = "rotate(90deg)";
        // Send message to iframe to show chat
        iframe.contentWindow.postMessage(
          { type: "toggleChat", isOpen: true },
          "*"
        );
      } else {
        loadingDiv.style.display = "none";
        iframe.style.opacity = "0";
        iframe.style.transform = "translateY(100px)";
        iframe.style.pointerEvents = "none";
        widgetButton.style.transform = "rotate(0deg)";
        // Send message to iframe to hide chat
        iframe.contentWindow.postMessage(
          { type: "toggleChat", isOpen: false },
          "*"
        );
      }
    });

    // Handle iframe loading states
    iframe.onload = () => {
      loadingDiv.style.display = "none";
    };

    iframe.onerror = () => {
      loadingDiv.style.display = "none";
      errorDiv.style.display = "flex";
    };

    container.appendChild(loadingDiv);
    container.appendChild(errorDiv);
    container.appendChild(iframe);
    container.appendChild(widgetButton);
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
