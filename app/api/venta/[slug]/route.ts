import { NextRequest, NextResponse } from "next/server";
import { getVenta } from '@/service/ventas';
import Ventas from "@/types/ventas";

export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // id de artículo
    
    try {
        const articulo = await getVenta(Number(slug)) as Ventas
        return NextResponse.json(articulo)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}