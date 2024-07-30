import { NextResponse } from "next/server";
import { getAll, agregarArticulo } from '@/service/inventario';
import Articulo from "@/types/articulo"


export async function GET() {
    try {
        const articulos = await getAll() as Articulo[]
        
        return NextResponse.json(articulos)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const articulo = await req.json() as Articulo;
    const response: any = await agregarArticulo(articulo);

    console.log('agregarArticulo', response)

    if (response && response?.insertId) {
        return NextResponse.json(response, { status: 201 });
    } else {
        return NextResponse.json(response, { status: 400 });
    }
};
