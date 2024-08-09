import { NextResponse } from "next/server";
import { getAll, agregarPersonal } from '@/service/personal';
import Personal from "@/types/personal"


export async function GET() {
    try {
        const persona = await getAll() as Personal[]
        
        return NextResponse.json(persona)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const personal = await req.json() as Personal;
    const response: any = await agregarPersonal(personal);

    console.log('agregarPersona', response)

    if (response && response?.insertId) {
        return NextResponse.json(response, { status: 201 });
    } else {
        return NextResponse.json(response, { status: 400 });
    }
};