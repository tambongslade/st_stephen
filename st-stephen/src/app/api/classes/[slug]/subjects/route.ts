import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  try {
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Find the class ID based on the slug
    const classData = await prisma.class.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug }
        ]
      },
      select: { id: true },
    });
    

    if (!classData) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    // Query the subjects related to the class ID
    const subjects = await prisma.classSubject.findMany({
      where: { classId: classData.id },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });
    

    // Ensure subjects are always an array
    const result = subjects.map((classSubject) => ({
      id: classSubject.subject.id,
      name: classSubject.subject.name,
      imageUrl: classSubject.subject.imageUrl,
    }));
   
   
    return NextResponse.json(result || [], { status: 200 });
  } catch (error: any) {
    console.error('Error fetching subjects:', error.message);

    // Ensure the error object is correctly formatted
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
