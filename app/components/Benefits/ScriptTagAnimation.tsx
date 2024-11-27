"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const scriptContent = `<script>
  (function(d,t) {  
      window.chatwithSettings={
        baseUrl:BASE_URL,
        chatbotId: "YOUR_CHATBOT_ID"
      };
      window.chatwithSDK.run(window.chatwithSettings);
    }
  })(document,"script");
</script>`;

export function ScriptTagAnimation() {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < scriptContent.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(
          (prevContent) => prevContent + scriptContent[currentIndex]
        );
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden"
    >
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          background: "#1E1E1E",
        }}
      >
        {displayedContent}
      </SyntaxHighlighter>
    </motion.div>
  );
}
