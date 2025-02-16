import { get } from "@/utilles/get";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Usercard from "@/components/usercard/usercard";

type TGetFriendRequestList = {
  senderId: string;
  senderName: string;
};

async function Page() {
  const session = await getServerSession(options);
  const res: { friendrequest: TGetFriendRequestList[] } = await get(
    "http://localhost:3000/api/user/friend-request/get-friend-request/" +
      session?.user.id,
  );
  console.log(res);
  return (
    <section>
      <div className="p-[12px]">
        {res.friendrequest.map((i: TGetFriendRequestList) => {
          return (
            <Usercard
              key={i.senderId}
              id={i.senderId}
              name={i.senderName}
              btns={[
                {
                  text: "Accept",
                  url: "http://localhost:3000/api/user/friend-request/accept-friend-request/",
                },
                {
                  text: "Reject",
                  url: "http://localhost:3000/api/user/friend-request/reject-friend-request/",
                },
              ]}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Page;
