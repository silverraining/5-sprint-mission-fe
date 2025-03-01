import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Article from "./Article";

export default function ArticleList({ results = [] }) {
  const [articles, setArticles] = useState(results);

  useEffect(() => {
    const updatedArticles = results.map((article) => ({
      ...article,
      username: article.username || "귀여운 판다", // 예시로 정적인 값 사용
    }));
    setArticles(updatedArticles);
  }, [results]);

  return (
    <div className="w-full max-w-[1200px] py-8 px-4">
      <div className="space-y-4">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
