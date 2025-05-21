import { SourcesList } from "./SourcesList";

export function Process(process: any) {
  switch (process.content) {
    case "analyzing_user_query":
      return (
        <p className="animate-pulse">
          Analyzing user query <span className="dots" />
        </p>
      );
    case "performing_web_search":
      return (
        <p className="animate-pulse">
          Performing web search <span className="dots" />
        </p>
      );
    case "analyzing_search_results":
      return <SourcesList {...process} />;
  }
}
