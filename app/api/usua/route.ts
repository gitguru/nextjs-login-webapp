import { NextResponse } from "next/server";
import { getAll, agregarPersonal } from '@/service/personal';
import Usuarios from "@/types/gerencia_usuarios"
import { agregarUsuario } from "@/service/usuar";


export async function GET() {
    try {
        const usuario = await getAll() as Usuarios[]
        
        return NextResponse.json(usuario)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const usuario = await req.json() as Usuarios;
    const response: any = await agregarUsuario(usuario);

    console.log('agregarUsuario', response)

    if (response && response?.insertId) {
        return NextResponse.json(response, { status: 201 });
    } else {
        return NextResponse.json(response, { status: 400 });
    }
};