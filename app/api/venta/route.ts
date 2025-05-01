import { NextResponse } from "next/server";
import { getAll, agregarVenta } from '@/service/ventas';
import Ventas from "@/types/ventas"


export async function GET() {
    try {
        const articulos = await getAll() as Ventas[]
        
        return NextResponse.json(articulos)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const articulo = await req.json() as Ventas;
    const response: any = await agregarVenta(articulo);

    console.log('agregarVenta', response)

    if (response && response?.insertId) {
        return NextResponse.json(response, { status: 201 });
    } else {
        return NextResponse.json(response, { status: 400 });
    }
};