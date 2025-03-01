import Image from "next/image";

export default function HeartTag({ favoriteCnt }) {
  return (
    <div className="flex items-center h-full bg-[#fcfcfc] border px-3 py-2 rounded-full">
      <Image src="/ic_heart.svg" width={24} height={24} alt="Heart Icon" />
      <span className="text-[#6B7280] text-[16px] ml-1">{favoriteCnt}</span>
    </div>
  );
}
