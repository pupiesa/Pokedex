import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // For now return basic user info (no session/JWT yet)
    return new Response(
      JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", detail: err.message }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
