import { NextResponse } from "next/server";
import { getAll } from '@/service/informe';

export async function GET() {
    try {
        const informe = await getAll()
        
        return NextResponse.json(informe)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}