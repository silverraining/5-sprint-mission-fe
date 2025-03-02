import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

const defaultImg = "/laptop.svg";
const defaultProfile = "/ic_profile.png";
const Ic_heart = "/ic_heart.svg";

export default function Article({ article }) {
  return (
    <div key={article.id} className="bg-[#fcfcfc] mb-4 border-b">
      <div className="flex justify-between mb-2">
        <Link href={`/community/${article.id}`}>
          <div className="text-lg font-semibold mt-1">{article.title}</div>
        </Link>
        {article.image ? (
          <div className="flex justify-center items-center w-[72px] h-[72px] border rounded-[8px] bg-white">
            <Image
              src={article.image}
              className="w-[48px] h-[48px] object-cover"
              alt="Article Thumbnail"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center w-[72px] h-[72px] border border-gray-300 rounded-[8px] bg-white">
            <Image
              src={defaultImg}
              width={48}
              height={48}
              alt="Default Thumbnail"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between mb-3">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={defaultProfile}
              alt="Default User"
              width={32}
              height={32}
            />
          </div>

          <span>
            &nbsp;&nbsp; {article.username} &nbsp;&nbsp;
            {dayjs(article.createdAt).format("YYYY. MM. DD")}
          </span>
        </div>
        <div className="flex justify-between w-[82px] items-center">
          <Image src={Ic_heart} alt="heart icon" width={24} height={24} />
          <span>{article.favoriteCnt}+</span>
        </div>
      </div>
    </div>
  );
}
