import Image from "next/image";
import { TAvatar } from "@/type";
import { post } from "@/utilles/post";

async function Avatatr({ userId, width, height }: TAvatar) {
   const image = await post(
      "http://localhost:3000/api/user/avatar/get-avatar",
      userId
   );
return (
   <div style={{ width: width, height: height }}>
      <Image
         width={0}
         height={0}
         src={image.image || "/p.jpeg"}
         alt="post image"
         sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
         style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "50% 0%",
         }}
      />
   </div>
);
}

export default Avatatr;
