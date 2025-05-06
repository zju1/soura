import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidChartProps {
  definition: string;
}

export default function MermaidChart({ definition }: MermaidChartProps) {
  const [svg, setSvg] = useState<string>("");
  const [id] = useState(
    `mermaid-${Math.random().toString(36).substring(2, 11)}`
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
    });

    const renderChart = async () => {
      try {
        setError(null);
        const { svg } = await mermaid.render(id, definition);
        setSvg(svg);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render chart. Check your Mermaid syntax.");
      }
    };

    renderChart();
  }, [definition, id]);

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded">
        <p className="font-semibold">Error rendering chart:</p>
        <p>{error}</p>
        <pre className="mt-2 p-2 bg-white rounded text-sm overflow-auto">
          {definition}
        </pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-chart w-full overflow-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
