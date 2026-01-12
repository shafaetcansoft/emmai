import { NextRequest, NextResponse } from 'next/server';
import { createTenant } from '@/lib/tenant';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = String(body.name ?? '').toLowerCase();

  try {
    const tenant = createTenant(name);
    return NextResponse.json(tenant, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 400 }
    );
  }
}
