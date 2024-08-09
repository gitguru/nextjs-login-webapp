import { NextResponse } from "next/server";
import { getAll, actualizarIva } from '@/service/iva';
import Iva from "@/types/iva"


export async function GET() {
    try {
        const iva = await getAll() as Iva[]
        
        return NextResponse.json(iva)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const iva = await req.json() as Iva;
    const response: any = await actualizarIva(iva);

    console.log('actualizarIva', response)

    if (response && response?.insertId) {
        return NextResponse.json(response, { status: 201 });
    } else {
        return NextResponse.json(response, { status: 400 });
    }
};