import Image from "next/image";

export default function Home() {
  return (
    <div>
      판다마켓 HOME
      <Image src="/Img_home_top.svg" width={300} height={300} layout="fil" />
    </div>
  );
}
