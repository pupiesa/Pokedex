import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, password } = body || {};

    if (!email || !name || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    try {
      // Check for existing email or username
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { name }],
        },
      });

      if (existingUser) {
        const field = existingUser.email === email ? "email" : "username";
        return new Response(
          JSON.stringify({ error: `This ${field} is already in use` }),
          { status: 409 }
        );
      }
    } catch (err) {
      console.error("Validation error:", err);
      return new Response(
        JSON.stringify({ error: "Error checking existing user" }),
        { status: 500 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hash },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    // Optionally, create empty Account and Session records for NextAuth compatibility (not required for credentials login)

    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return new Response(
      JSON.stringify({ error: "Server error", detail: err.message }),
      { status: 500 }
    );
  }
}
