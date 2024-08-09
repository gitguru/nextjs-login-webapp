import { NextRequest, NextResponse } from "next/server";
import { getBita } from '@/service/bitacora';


export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // user id
    
    try {
        const bita = await getBita(Number(slug))
        return NextResponse.json(bita)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}