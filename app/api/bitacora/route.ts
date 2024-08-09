import { NextResponse } from "next/server";
import { getAll } from '@/service/bitacora';

export async function GET() {
    try {
        const users = await getAll()
        
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}