/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./style.css";
interface MarkdownRendererProps {
  content: string;
}

export default function Markdown({ content }: MarkdownRendererProps) {
  type MarkdownPayload = any; // workaround

  const renderers: Components = {
    code: ({ className, children, ...props }: MarkdownPayload) => {
      const language = className?.replace("language-", "") || "";
      const code = String(children).replace(/\n$/, "");

      const customStyle: React.CSSProperties = {
        padding: "10px",
        borderRadius: "5px",
        fontFamily: "monospace",
        fontSize: "14px",
      };

      if (!language) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <SyntaxHighlighter
          language={language}
          showLineNumbers
          customStyle={customStyle}
          style={dracula}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      );
    },
    ul: ({ children }: MarkdownPayload) => (
      <ul className="list-disc">{children}</ul>
    ),
    ol: ({ children }: MarkdownPayload) => (
      <ol className="list-decimal">{children}</ol>
    ),
  };

  return (
    <div className="markdown">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={renderers}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
