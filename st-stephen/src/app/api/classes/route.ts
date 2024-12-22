import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      orderBy: {
        level: 'asc'
      },
      select: {
        id: true,
        name: true,
        slug: true,
        level: true
      }
    });

    if (!classes.length) {
      return NextResponse.json({ classes: [] }, { status: 200 });
    }

    return NextResponse.json({ classes }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching classes:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}