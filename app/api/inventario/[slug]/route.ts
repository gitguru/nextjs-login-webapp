import { NextRequest, NextResponse } from "next/server";
import { getArticulo } from '@/service/inventario';
import Articulo from "@/types/articulo";

export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // id de artículo
    
    try {
        const articulo = await getArticulo(Number(slug)) as Articulo
        return NextResponse.json(articulo)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
