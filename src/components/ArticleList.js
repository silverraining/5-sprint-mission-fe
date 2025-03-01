import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Article from "./Article";

const randomUsernames = ["스폰지밥", "뚱이", "다람이", "집게사장", "징징이"];

export default function ArticleList({ results = [] }) {
  const [articles, setArticles] = useState(results);

  useEffect(() => {
    console.log("📌 results:", results);
    const updatedArticles = results.map((article) => ({
      ...article,
      username:
        article.username ||
        randomUsernames[Math.floor(Math.random() * randomUsernames.length)],
    }));
    setArticles(updatedArticles);
  }, [results]);

  return (
    <div className="w-full max-w-[1200px] py-8 px-4">
      <div className="flex justify-between">
        <div className="text-[20px] font-bold mb-6">게시글</div>
        <Link href="/articles/register">
          <Button className="bg-[#3692FF] text-white h-[42px] w-[88px] px-1 font-semibold text-[16px] cursor-pointer">
            글쓰기
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
