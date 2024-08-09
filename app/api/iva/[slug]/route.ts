import { NextRequest, NextResponse } from "next/server";
import { getIva } from '@/service/iva';
import Iva from "@/types/iva";

export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // id de artículo
    
    try {
        const iva = await getIva(Number(slug)) as Iva
        return NextResponse.json(iva)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
