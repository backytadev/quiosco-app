import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const category = (await params).category;

  if (!category) {
    return Response.json({ error: "Categoría requerida" }, { status: 400 });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: category,
        },
      },
    });

    return Response.json(products);
  } catch (error) {
    console.error("❌ Error obteniendo productos:", error);
    return Response.json(
      { error: "Error obteniendo productos" },
      { status: 500 }
    );
  }
}
