import { FaviconImage } from "./FaviconImage";

export function SourcesList({ results }: any) {
  const data = JSON.parse(results) as {
    title: string;
    icon: string;
    url: string;
  }[];
  return (
    <div>
      <p className="animate-pulse">
        Analyzing search results <span className="dots" />
      </p>
      <ul className="grid gap-1">
        {data.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              className="flex items-center gap-2 text-blue-500 hover:text-blue-800"
            >
              <FaviconImage url={item.icon} />
              <span className="line-clamp-1">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
