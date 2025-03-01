import Image from "next/image";
import ToggleDropdown from "./ToggleDropdown";

const defaultProfile = "/ic_profile.png";

export default function Comment({ comment }) {
  return (
    <div className="bg-[#fcfcfc] p-4 mb-4 border-b gap-6">
      <div className="flex justify-between items-center pb-8">
        {/* 댓글 내용 */}
        <p className="mt-2 text-gray-800">{comment.content}</p>
        <ToggleDropdown />
      </div>

      <div className="flex justify-start items-center gap-4">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={defaultProfile}
            alt="Default User"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col items-start space-x-2 gap-2 text-sm text-gray-500">
          <span>{comment.username || "뚱이"}</span>
          <span>1시간 전</span>
        </div>
      </div>
    </div>
  );
}
