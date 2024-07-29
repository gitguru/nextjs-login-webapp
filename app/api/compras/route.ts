import { NextResponse } from "next/server";
import { getAll } from '@/service/compra';


export async function GET() {
    try {
        const compra = await getAll()
        
        return NextResponse.json(compra)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}