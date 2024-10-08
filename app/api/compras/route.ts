import { NextResponse } from "next/server";
import { getAll, agregarCompra } from '@/service/compra';
import Compra from "@/types/compra"


export async function GET() {
    try {
        const articulos = await getAll() as Compra[]
        
        return NextResponse.json(articulos)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const articulo = await req.json() as Compra;
    const response: any = await agregarCompra(articulo);

    console.log('agregarCompra', response)

    if (response && response?.insertId) {
        return NextResponse.json(response, { status: 201 });
    } else {
        return NextResponse.json(response, { status: 400 });
    }
};