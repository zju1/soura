import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components = {
    ul: ({ node, children, ...props }: any) => {
      return (
        <ul className="pb-4" {...props}>
          {children}
        </ul>
      );
    },
    ol: ({ node, children, ...props }: any) => {
      return <ol {...props}>{children}</ol>;
    },
    p: ({ node, children, ...props }: any) => {
      return <p {...props}>{children}</p>;
    },
    li: ({ node, children, ...props }: any) => {
      return <li {...props}>{children}</li>;
    },

    strong: ({ node, children, ...props }: any) => {
      return (
        <span className="font-semibold" {...props}>
          {children}
        </span>
      );
    },
    h3: ({ node, children, ...props }: any) => {
      return (
        <h3 className="font-semibold text-xl leading-5 mb-4" {...props}>
          {children}
        </h3>
      );
    },
    a: ({ node, children, ...props }: any) => {
      return (
        <a
          className="font-medium text-blue-700 leading-5 underline"
          target="_blank"
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = React.memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
