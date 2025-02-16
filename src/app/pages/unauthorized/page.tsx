import React from "react";
import Link from "next/link";

function Page() {
  return (
    <section className="flex w-full h-[80vh] justify-center items-center ">
      <div>
        <p className="font-bold text-[1.5rem]">you are not logged in</p>
        <div className="flex justify-between p-[20px]">
          <button className="styledBtn">
            <Link href={"http://localhost:3000/pages/auth/signup"}>
              sign up
            </Link>
          </button>
          <button className="styledBtn">
            <Link href={"http://localhost:3000/api/auth/signin"}>sign in</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Page;
