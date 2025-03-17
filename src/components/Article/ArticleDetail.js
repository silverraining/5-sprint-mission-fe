import ToggleDropdown from "@/components/ToggleDropdown";
import Image from "next/image";
import dayjs from "dayjs";
import HeartTag from "@/components/HeartTag";
import { useRouter } from "next/router";

export default function ArticleDetail({ article, onDelete }) {
  const router = useRouter();
  const username = article.username || "귀여운 판다";
  // 수정 페이지로 이동하는 함수
  const handleEdit = (articleId) => {
    if (articleId) {
      router.push(`/community/article/edit?id=${articleId}`);
    }
  };

  if (!article) return <div>❌ 게시글 데이터를 불러오지 못했습니다.</div>;
  return (
    <section className="pb-2 max-w-[1200px] mx-auto px-4">
      <div className="flex justify-between pb-2">
        <h2 className="font-bold text-xl">{article.title}</h2>
        <ToggleDropdown
          onEdit={handleEdit}
          id={article.id}
          onDelete={onDelete}
        />
      </div>
      <div className="flex items-center gap-4">
        <Image
          src="/ic_profile.png"
          width={40}
          height={40}
          alt="defaultProfile"
        />
        <span>{article.username || "귀여운 판다"}</span>
        <span className="text-[#4B5563] font-medium">
          {dayjs(article.createdAt).format("YYYY.MM.DD")}
        </span>
        <div className="border-l border-gray-300 mx-2 h-8"></div>
        <HeartTag favoriteCnt={article.favoriteCnt} />
      </div>
      <div className="border-t border-gray-300 my-2 mb-4"></div>
      <div className="mb-6">
        <p>{article.content}</p>
      </div>
    </section>
  );
}
