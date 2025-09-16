import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const body = await req.json();
    const { email, name, password } = body || {};

    // Accept either email or name for login
    if ((!email && !name) || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email || "" }, { name: name || "" }],
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // For now return basic user info (no session/JWT yet)
    return new Response(
      JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ error: "Server error", detail: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Export the handler for GET requests (optional, returns method not allowed)
export async function GET() {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
