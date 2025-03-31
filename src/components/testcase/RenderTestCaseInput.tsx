"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";

// Define more specific types for our components
type CommonProps = {
  node?: any;
  children?: React.ReactNode;
};

type HeadingProps = CommonProps & React.HTMLAttributes<HTMLHeadingElement>;
type CodeProps = CommonProps &
  React.HTMLAttributes<HTMLElement> & {
    inline?: boolean;
    className?: string;
  };
type PreProps = CommonProps & React.HTMLAttributes<HTMLPreElement>;
type ListProps = CommonProps & React.HTMLAttributes<HTMLUListElement>;
type BreakProps = CommonProps & React.HTMLAttributes<HTMLBRElement>;

const RenderTestCaseInput = ({ testCaseInput }: { testCaseInput: string }) => {
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
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    color: themeStyles.color,
    fontSize: "1em",
    lineHeight: "1.6",
    overflowWrap: "break-word" as const,
    wordWrap: "break-word" as const,
  };

  const components = {
    h1: ({ node, ...props }: HeadingProps) => (
      <h1 style={{ ...markdownStyles, fontSize: "2em" }} {...props} />
    ),
    h2: ({ node, ...props }: HeadingProps) => (
      <h2 style={{ ...markdownStyles, fontSize: "1.5em" }} {...props} />
    ),
    h3: ({ node, ...props }: HeadingProps) => (
      <h3 style={{ ...markdownStyles, fontSize: "1.2em" }} {...props} />
    ),
    h4: ({ node, ...props }: HeadingProps) => (
      <h4 style={{ ...markdownStyles, fontSize: "1em" }} {...props} />
    ),
    pre: ({ node, ...props }: PreProps) => (
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <pre
          style={{
            backgroundColor: themeStyles.codeBackground,
            color: themeStyles.codeColor,
            padding: "10px",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
          {...props}
        />
      </div>
    ),
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <pre
          style={{
            display: "block",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            backgroundColor: themeStyles.codeBackground,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code
          className={className}
          style={{
            padding: "2px 4px",
            borderRadius: "3px",
            backgroundColor: themeStyles.codeBackground,
            color: themeStyles.codeColor,
          }}
          {...props}
        >
          {children}
        </code>
      );
    },
    ul: ({ node, ...props }: ListProps) => (
      <ul style={{ listStyleType: "disc", marginLeft: "20px" }} {...props} />
    ),
    ol: ({
      node,
      ...props
    }: CommonProps & React.HTMLAttributes<HTMLOListElement>) => (
      <ol style={{ listStyleType: "decimal", marginLeft: "20px" }} {...props} />
    ),
    br: ({ node, ...props }: BreakProps) => (
      <br
        style={{ display: "block", margin: "10px 0", content: " " }}
        {...props}
      />
    ),
    a: ({
      node,
      ...props
    }: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        style={{
          color: themeStyles.linkColor,
          textDecoration: "none",
        }}
        {...props}
      />
    ),
    blockquote: ({
      node,
      ...props
    }: CommonProps & React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
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
    table: ({
      node,
      ...props
    }: CommonProps & React.TableHTMLAttributes<HTMLTableElement>) => (
      <table
        style={{
          borderCollapse: "collapse",
          marginBottom: "16px",
          width: "100%",
        }}
        {...props}
      />
    ),
    th: ({
      node,
      ...props
    }: CommonProps & React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th
        style={{
          padding: "6px 13px",
          border: `1px solid ${themeStyles.borderColor}`,
          backgroundColor: themeStyles.codeBackground,
        }}
        {...props}
      />
    ),
    td: ({
      node,
      ...props
    }: CommonProps & React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
      <td
        style={{
          padding: "6px 13px",
          border: `1px solid ${themeStyles.borderColor}`,
        }}
        {...props}
      />
    ),
    img: ({
      node,
      ...props
    }: CommonProps & React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img
        style={{
          maxWidth: "100%",
          margin: "1em 0",
        }}
        {...props}
        alt={props.alt || "Image"}
      />
    ),
  };

  return (
    <div style={markdownStyles}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="custom-markdown"
        components={components}
      >
        {testCaseInput}
      </ReactMarkdown>
    </div>
  );
};

export default RenderTestCaseInput;
// "use client";
// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
//
// // Define more specific types for our components
// type CommonProps = {
//   node?: any;
//   children?: React.ReactNode;
// };
//
// type HeadingProps = CommonProps & React.HTMLAttributes<HTMLHeadingElement>;
// type CodeProps = CommonProps &
//   React.HTMLAttributes<HTMLElement> & {
//     inline?: boolean;
//     className?: string;
//   };
// type PreProps = CommonProps & React.HTMLAttributes<HTMLPreElement>;
// type ListProps = CommonProps & React.HTMLAttributes<HTMLUListElement>;
// type BreakProps = CommonProps & React.HTMLAttributes<HTMLBRElement>;
//
// const RenderTestCaseInput = ({ testCaseInput }: { testCaseInput: string }) => {
//   const markdownStyles = {
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "rgba(13, 17, 23)",
//     width: "100%",
//     padding: "10px",
//     borderRadius: "10px",
//     color: "white",
//     fontSize: "1em",
//     lineHeight: "1.6",
//     overflowWrap: "break-word" as const,
//     wordWrap: "break-word" as const,
//   };
//   const components = {
//     h1: ({ node, ...props }: HeadingProps) => (
//       <h1 style={{ ...markdownStyles, fontSize: "2em" }} {...props} />
//     ),
//     h2: ({ node, ...props }: HeadingProps) => (
//       <h2 style={{ ...markdownStyles, fontSize: "1.5em" }} {...props} />
//     ),
//     h3: ({ node, ...props }: HeadingProps) => (
//       <h3 style={{ ...markdownStyles, fontSize: "1.2em" }} {...props} />
//     ),
//     h4: ({ node, ...props }: HeadingProps) => (
//       <h4 style={{ ...markdownStyles, fontSize: "1em" }} {...props} />
//     ),
//     pre: ({ node, ...props }: PreProps) => (
//       <div style={{ overflowX: "auto", maxWidth: "100%" }}>
//         <pre
//           style={{
//             backgroundColor: "rgba(22, 27, 34)",
//             color: "#f9f9f9",
//             padding: "10px",
//             borderRadius: "5px",
//             whiteSpace: "pre-wrap",
//             wordBreak: "break-word",
//           }}
//           {...props}
//         />
//       </div>
//     ),
//     code: ({ inline, className, children, ...props }: CodeProps) => {
//       const match = /language-(\w+)/.exec(className || "");
//       return !inline ? (
//         <pre
//           style={{
//             display: "block",
//             overflowX: "auto",
//             whiteSpace: "pre-wrap",
//             wordBreak: "break-word",
//             backgroundColor: "rgba(22, 27, 34)",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           <code className={className} {...props}>
//             {children}
//           </code>
//         </pre>
//       ) : (
//         <code
//           className={className}
//           style={{ padding: "2px 4px", borderRadius: "3px" }}
//           {...props}
//         >
//           {children}
//         </code>
//       );
//     },
//     ul: ({ node, ...props }: ListProps) => (
//       <ul style={{ listStyleType: "disc", marginLeft: "20px" }} {...props} />
//     ),
//     br: ({ node, ...props }: BreakProps) => (
//       <br
//         style={{ display: "block", margin: "10px 0", content: " " }}
//         {...props}
//       />
//     ),
//   };
//
//   return (
//     <div style={markdownStyles}>
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         className="custom-markdown"
//         components={components}
//       >
//         {testCaseInput}
//       </ReactMarkdown>
//     </div>
//   );
// };
//
// export default RenderTestCaseInput;
// // "use client";
// // import React from "react";
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";
// //
// // const RenderTestCaseInput = ({ testCaseInput }: { testCaseInput: string }) => {
// //   const markdownStyles = {
// //     fontFamily: "Arial, sans-serif",
// //     backgroundColor: "rgba(13, 17, 23)",
// //     width: "100%",
// //     padding: "10px",
// //     borderRadius: "10px",
// //     color: "white",
// //     fontSize: "1em",
// //     lineHeight: "1.6",
// //     overflowWrap: "break-word" as const,
// //     wordWrap: "break-word" as const,
// //   };
// //
// //   return (
// //     <div style={markdownStyles}>
// //       <ReactMarkdown
// //         remarkPlugins={[remarkGfm]}
// //         className="custom-markdown"
// //         components={{
// //           h1: ({ node, ...props }) => (
// //             <h1 style={{ ...markdownStyles, fontSize: "2em" }} {...props} />
// //           ),
// //           h2: ({ node, ...props }) => (
// //             <h2 style={{ ...markdownStyles, fontSize: "1.5em" }} {...props} />
// //           ),
// //           h3: ({ node, ...props }) => (
// //             <h3 style={{ ...markdownStyles, fontSize: "1.2em" }} {...props} />
// //           ),
// //           h4: ({ node, ...props }) => (
// //             <h4 style={{ ...markdownStyles, fontSize: "1em" }} {...props} />
// //           ),
// //           pre: ({ node, ...props }) => (
// //             <div style={{ overflowX: "auto", maxWidth: "100%" }}>
// //               <pre
// //                 style={{
// //                   backgroundColor: "rgba(22, 27, 34)",
// //                   color: "#f9f9f9",
// //                   padding: "10px",
// //                   borderRadius: "5px",
// //                   whiteSpace: "pre-wrap",
// //                   wordBreak: "break-word",
// //                 }}
// //                 {...props}
// //               />
// //             </div>
// //           ),
// //           code: ({ node, inline, ...props }) =>
// //             inline ? (
// //               <code
// //                 style={{ padding: "2px 4px", borderRadius: "3px" }}
// //                 {...props}
// //               />
// //             ) : (
// //               <code
// //                 style={{
// //                   display: "block",
// //                   overflowX: "auto",
// //                   whiteSpace: "pre-wrap",
// //                   wordBreak: "break-word",
// //                 }}
// //                 {...props}
// //               />
// //             ),
// //           ul: ({ node, ...props }) => (
// //             <ul
// //               style={{ listStyleType: "disc", marginLeft: "20px" }}
// //             {...props}
// //           />
// //         ),
// //         br: ({ node, ...props }) => (
// //           <br
// //             style={{ display: "block", margin: "10px 0", content: " " }}
// //             {...props}
// //           />
// //         ),
// //       }}
// //     >
// //       {testCaseInput}
// //     </ReactMarkdown>
// //   </div>
// // );
// // };
// //
// // export default RenderTestCaseInput;
// // "use client";
// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import React from "react";
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";
// //
// // const RenderTestCaseInput = ({ testCaseInput }: { testCaseInput: string }) => {
// //   const markdownStyles = {
// //     fontFamily: "Arial, sans-serif",
// //     backgroundColor: "rgba(13, 17, 23)",
// //     // padding: "20px",
// //     width: "100%",
// //     paddingLeft: "10px",
// //     paddingRight: "10px",
// //     borderRadius: "10px",
// //     color: "white",
// //     fontSize: "1em", // Adjust as per your headings
// //     lineHeight: "1.6", // Adjust line height
// //   };
// //
// //   return (
// //     <div style={markdownStyles}>
// //       <ReactMarkdown
// //         remarkPlugins={[remarkGfm]}
// //         className="custom-markdown"
// //         components={{
// //           h1: ({ node, ...props }) => (
// //             <h1 style={{ ...markdownStyles, fontSize: "2em" }} {...props} />
// //           ),
// //           h2: ({ node, ...props }) => (
// //             <h2 style={{ ...markdownStyles, fontSize: "1.5em" }} {...props} />
// //           ),
// //           h3: ({ node, ...props }) => (
// //             <h3 style={{ ...markdownStyles, fontSize: "1.2em" }} {...props} />
// //           ),
// //           h4: ({ node, ...props }) => (
// //             <h4 style={{ ...markdownStyles, fontSize: "1em" }} {...props} />
// //           ),
// //           pre: ({ node, ...props }) => (
// //             <pre
// //               style={{
// //                 backgroundColor: "rgba(22, 27, 34)",
// //                 color: "#f9f9f9",
// //                 padding: "10px",
// //                 borderRadius: "5px",
// //               }}
// //               {...props}
// //             />
// //           ),
// //           code: ({ node, ...props }) => (
// //             <code
// //               style={{ padding: "2px 4px", borderRadius: "3px" }}
// //               {...props}
// //             />
// //           ),
// //           ul: ({ node, ...props }) => (
// //             <ul
// //               style={{ listStyleType: "disc", marginLeft: "20px" }}
// //               {...props}
// //             />
// //           ),
// //           br: ({ node, ...props }) => (
// //             <br
// //               style={{ display: "block", margin: "10px 0", content: " " }}
// //               {...props}
// //             />
// //           ),
// //         }}
// //       >
// //         {testCaseInput}
// //       </ReactMarkdown>
// //     </div>
// //   );
// // };
// //
// // export default RenderTestCaseInput;
