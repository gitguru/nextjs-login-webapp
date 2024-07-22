import { NextRequest, NextResponse } from "next/server";
import { getUser } from '@/service/user';


export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // user id
    
    try {
        const user = await getUser(Number(slug))
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
