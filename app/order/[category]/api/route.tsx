import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const category = (await params).category;

  if (!category) {
    return NextResponse.json({ error: "Categoría requerida" }, { status: 400 });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: category,
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error obteniendo productos:", error);
    return NextResponse.json(
      { error: "Error obteniendo productos" },
      { status: 500 }
    );
  }
}
