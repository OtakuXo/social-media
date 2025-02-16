import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const password = body.password;

  const salt = await bcrypt.genSalt(10);
  const bcryptedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: bcryptedPassword,
      },
    });

    await prisma.like.create({
      data: {
        userId: user.id,
      },
    });

    await prisma.disLike.create({
      data: {
        userId: user.id,
      },
    });

    await prisma.usercomments.create({
      data: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      msg: "successful user created",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      msg: "email address alredy exsists",
    });
  }
};
