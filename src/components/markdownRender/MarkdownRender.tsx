"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";

const MarkdownRender = ({ markdownContent }: { markdownContent: string }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Theme-specific styles
  const themeStyles = {
    backgroundColor: isDarkTheme ? "rgba(13, 17, 23)" : "rgba(250, 250, 250)",
    color: isDarkTheme ? "white" : "rgba(10, 10, 10)",
    codeBackground: isDarkTheme ? "rgba(22, 27, 34)" : "rgba(240, 240, 240)",
    codeColor: isDarkTheme ? "#f9f9f9" : "#333333",
    borderColor: isDarkTheme ? "#30363d" : "#dfe2e5",
    linkColor: isDarkTheme ? "#58a6ff" : "#0366d6",
    quoteColor: isDarkTheme ? "#8b949e" : "#6a737d",
  };

  const markdownStyles = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: themeStyles.backgroundColor,
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "10px",
    height: "100%",
    color: themeStyles.color,
    fontSize: "1em",
    lineHeight: "1.6",
  };

  return (
    <div style={markdownStyles} className="p-4 h-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="custom-markdown"
        components={{
          h1: ({ node, ...props }) => (
            <h1 style={{ ...markdownStyles, fontSize: "2em" }} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{ ...markdownStyles, fontSize: "1.5em" }} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 style={{ ...markdownStyles, fontSize: "1.2em" }} {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 style={{ ...markdownStyles, fontSize: "1em" }} {...props} />
          ),
          pre: ({ node, ...props }) => (
            <pre
              style={{
                backgroundColor: themeStyles.codeBackground,
                color: themeStyles.codeColor,
                padding: "10px",
                borderRadius: "5px",
              }}
              {...props}
            />
          ),
          code: ({ node, ...props }) => (
            <code
              style={{
                padding: "2px 4px",
                borderRadius: "3px",
                backgroundColor: themeStyles.codeBackground,
                color: themeStyles.codeColor,
              }}
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              style={{ listStyleType: "disc", marginLeft: "20px" }}
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              style={{ listStyleType: "decimal", marginLeft: "20px" }}
              {...props}
            />
          ),
          br: ({ node, ...props }) => (
            <br
              style={{ display: "block", margin: "10px 0", content: " " }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p style={{ margin: "0.5em 0" }} {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              style={{
                color: themeStyles.linkColor,
                textDecoration: "none",
              }}
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              style={{
                borderLeft: `4px solid ${themeStyles.borderColor}`,
                paddingLeft: "1em",
                color: themeStyles.quoteColor,
                margin: "1em 0",
              }}
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <table
              style={{
                borderCollapse: "collapse",
                marginBottom: "16px",
                width: "100%",
              }}
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              style={{
                padding: "6px 13px",
                border: `1px solid ${themeStyles.borderColor}`,
                backgroundColor: themeStyles.codeBackground,
              }}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              style={{
                padding: "6px 13px",
                border: `1px solid ${themeStyles.borderColor}`,
              }}
              {...props}
            />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
// "use client";
// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
//
// const MarkdownRender = ({ markdownContent }: { markdownContent: string }) => {
//   const markdownStyles = {
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "rgba(13, 17, 23)",
//     // padding: "20px",
//     paddingLeft: "10px",
//     paddingRight: "10px",
//     borderRadius: "10px",
//     height: "100%",
//     color: "white",
//     fontSize: "1em", // Adjust as per your headings
//     lineHeight: "1.6", // Adjust line height
//   };
//
//   return (
//     <div style={markdownStyles} className=" p-4 h-full">
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         className="custom-markdown"
//         components={{
//           h1: ({ node, ...props }) => (
//             <h1 style={{ ...markdownStyles, fontSize: "2em" }} {...props} />
//           ),
//           h2: ({ node, ...props }) => (
//             <h2 style={{ ...markdownStyles, fontSize: "1.5em" }} {...props} />
//           ),
//           h3: ({ node, ...props }) => (
//             <h3 style={{ ...markdownStyles, fontSize: "1.2em" }} {...props} />
//           ),
//           h4: ({ node, ...props }) => (
//             <h4 style={{ ...markdownStyles, fontSize: "1em" }} {...props} />
//           ),
//           pre: ({ node, ...props }) => (
//             <pre
//               style={{
//                 backgroundColor: "rgba(22, 27, 34)",
//                 color: "#f9f9f9",
//                 padding: "10px",
//                 borderRadius: "5px",
//               }}
//               {...props}
//             />
//           ),
//           code: ({ node, ...props }) => (
//             <code
//               style={{ padding: "2px 4px", borderRadius: "3px" }}
//               {...props}
//             />
//           ),
//           ul: ({ node, ...props }) => (
//             <ul
//               style={{ listStyleType: "disc", marginLeft: "20px" }}
//               {...props}
//             />
//           ),
//           br: ({ node, ...props }) => (
//             <br
//               style={{ display: "block", margin: "10px 0", content: " " }}
//               {...props}
//             />
//           ),
//         }}
//       >
//         {markdownContent}
//       </ReactMarkdown>
//     </div>
//   );
// };
//
// export default MarkdownRender;
