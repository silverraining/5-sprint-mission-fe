import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ToggleDropdown from "@/components/ToggleDropdown.js";
import Image from "next/image";
import dayjs from "dayjs";
import HeartTag from "@/components/HeartTag";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CommentList from "@/components/CommentList";
import { Textarea } from "@/components/ui/textarea";

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // id가 없으면 실행 안 함

    async function fetchData() {
      try {
        const [articleRes, commentsRes] = await Promise.all([
          fetch(`https://sprint-mission08-be.onrender.com/articles/${id}`),
          fetch(
            `https://sprint-mission08-be.onrender.com/articles/${id}/comments`
          ),
        ]);

        if (!articleRes.ok || !commentsRes.ok)
          throw new Error("데이터 로드 실패");

        const [articleData, commentsData] = await Promise.all([
          articleRes.json(),
          commentsRes.json(),
        ]);

        setArticle(articleData);
        setComments(commentsData.list);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div>⏳ 로딩 중...</div>;
  if (!article) return <div>❌ 게시글을 불러올 수 없습니다.</div>;

  const username = article.username || "스폰지밥";

  return (
    <>
      <section className="pb-2">
        <div className="flex justify-between pb-2">
          <h2 className="font-bold text-xl">{article.title}</h2>
          <ToggleDropdown />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/ic_profile.png"
            width={40}
            height={40}
            alt="defaultProfile"
          />
          <span>{username}</span>
          <span className="text-[#4B5563] font-medium">
            {article.username} &nbsp;
            <span className="text-[#9CA3AF] font-normal">
              {dayjs(article.createdAt).format("YYYY.MM.DD")}
            </span>
          </span>
          <div className="border-l border-gray-300 mx-2 h-8"></div>
          <HeartTag favoriteCnt={article.favoriteCnt} />
        </div>
      </section>
      <div className="border-t border-gray-300 my-2 mb-4"></div>
      <div className="mb-6">
        <p>{article.content}</p>
      </div>
      <div>
        <Form className="space-y-4 gap-4">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-start items-center">
              <Label htmlFor="title" className="font-bold text-lg">
                댓글달기
              </Label>
            </div>
            <Textarea
              id="comment"
              className="bg-[#F3F4F6] font-medium text-[16px] max-w-[1200px] min-w-[343px] h-[104px] px-6 pt-3"
              placeholder="댓글을 입력해주세요."
            />
          </div>
        </Form>
        <div className="flex justify-end py-1">
          <Button className="bg-[#9CA3AF] h-[42px] w-[74px] px-1 font-semibold text-[16px]">
            등록
          </Button>
        </div>
      </div>
      <div>
        <CommentList comments={comments} />
      </div>
    </>
  );
}
