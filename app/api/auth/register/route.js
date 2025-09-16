import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    const { email, name, password } = body || {};

    if (!email || !name || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409,
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hash },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", detail: err.message }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
