import { NextRequest, NextResponse } from "next/server";
import { getUsu } from '@/service/usuar';
import Usuarios from "@/types/gerencia_usuarios";

export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // id de artículo
    
    try {
        const persona = await getUsu(Number(slug)) as Usuarios
        return NextResponse.json(persona)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}