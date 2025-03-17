export default function Tag({ tags }) {
  return (
    <div className="flex items-center h-full bg-[#fcfcfc] px-3 py-2 rounded-full">
      <span className="text-[#6B7280] text-[16px] whitespace-nowrap ml-1">
        #{tags}
      </span>
    </div>
  );
}
