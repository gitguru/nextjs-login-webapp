import { NextRequest, NextResponse } from "next/server";
import { getPersonal } from '@/service/personal';
import Personal from "@/types/personal";

export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // id de artículo
    
    try {
        const persona = await getPersonal(Number(slug)) as Personal
        return NextResponse.json(persona)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}