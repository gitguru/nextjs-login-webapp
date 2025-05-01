import { NextRequest, NextResponse } from "next/server";
import { getInforme } from '@/service/informe';


export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // user id
    
    try {
        const informe = await getInforme(Number(slug))
        return NextResponse.json(informe)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}