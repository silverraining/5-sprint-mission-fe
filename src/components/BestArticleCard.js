import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const BestArticleCard = ({ articles }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    console.log("BestArticleCard에 전달된 articles:", articles);
  }, [articles]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // 서버 렌더링 방지

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
      {articles.map((article) => (
        <Link key={article.id} href={`/community/${article.id}`} passHref>
          <div className="relative w-full max-w-[384px] mx-auto max-h-[198px] min-h-[169px] bg-[#F9FAFB] shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition-all duration-300">
            {/* ✅ Best 뱃지 */}
            <div className="relative flex justify-start overflow-hidden rounded-t-xl h-6 pt-2">
              <Button className="absolute left-4 top-[-12px] pt-6 rounded-2xl bg-[#3692FF] text-white text-md font-medium w-[102px] shadow-md z-10">
                <div className="flex gap-1 justify-center items-center">
                  <Image
                    src="/ic_medal.svg"
                    width={16}
                    height={16}
                    alt="메달"
                    priority
                  />
                  <span>Best</span>
                </div>
              </Button>
            </div>

            {/* ✅ 제목 & 이미지 */}
            <div className="flex flex-col flex-1 mt-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-800 text-[20px] font-semibold flex-1 p-4 max-w-[256px] truncate">
                  {article.title}
                </p>
                <div className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] bg-white flex justify-center items-center">
                  <Image
                    src={article.image || "/laptop.svg"}
                    width={48}
                    height={48}
                    alt="게시글 이미지"
                  />
                </div>
              </div>
            </div>

            {/* ✅ 하단 정보 */}
            <div className="text-gray-500 text-sm flex justify-between px-4 mt-7">
              <div className="flex gap-2 ">
                <span>{article.author || "멋쟁이 판다"}</span>
                <Image
                  src="/ic_heart.svg"
                  alt="heart icon"
                  width={24}
                  height={24}
                />
                {article.favoriteCnt}
              </div>
              <div>{new Date(article.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BestArticleCard;
