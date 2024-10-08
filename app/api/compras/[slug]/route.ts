import { NextRequest, NextResponse } from "next/server";
import { getCompra } from '@/service/compra';
import Compra from "@/types/compra";

export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // id de artículo
    
    try {
        const articulo = await getCompra(Number(slug)) as Compra
        return NextResponse.json(articulo)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}