import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ⚡ For now, simulate a logged-in user (replace with real auth later)
async function getCurrentUserId() {
  // Use NextAuth session to get user id
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(favorites);
}

// POST /api/favorites
export async function POST(req) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { pokemonName } = await req.json();
  if (!pokemonName) {
    return Response.json({ error: "pokemonName is required" }, { status: 400 });
  }

  try {
    const fav = await prisma.favorite.create({
      data: { userId, pokemonName: pokemonName.toLowerCase() },
    });
    return Response.json(fav, { status: 201 });
  } catch (err) {
    if (err.code === "P2002") {
      // Unique constraint: already in favorites
      return Response.json({ error: "Already in favorites" }, { status: 409 });
    }
    console.error("Add favorite error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/favorites
export async function DELETE(req) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { pokemonName } = await req.json();
  if (!pokemonName) {
    return Response.json({ error: "pokemonName is required" }, { status: 400 });
  }

  await prisma.favorite.deleteMany({
    where: { userId, pokemonName: pokemonName.toLowerCase() },
  });

  return Response.json({ success: true });
}
