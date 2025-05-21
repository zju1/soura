import { useState } from "react";

export function FaviconImage({ url }: { url: string }) {
  const [fav, setFav] = useState(url);
  return (
    <img
      src={fav}
      onError={() => setFav("/fav.png")}
      className="size-6 rounded-full object-cover border bg-gray-200 shrink-0"
    />
  );
}
