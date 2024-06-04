import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("unable to connect database");
  }
}
export const GET = async (req: Request, res: NextResponse) => {
  console.log("GET");
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST");

  try {
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.create({
      data: { title, description },
    });
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
