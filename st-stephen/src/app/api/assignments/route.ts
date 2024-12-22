import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subjectId, questions } = body;

    // Create the assignment
    const assignment = await prisma.assignment.create({
      data: {
        title,
        subjectId,
        questions: {
          create: questions.map((q: any) => ({
            content: q.content,
            answer: q.options.find((opt: any) => opt.isCorrect).text
          }))
        }
      },
      include: {
        questions: true
      }
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');

    const assignments = await prisma.assignment.findMany({
      where: {
        subjectId: subjectId || undefined
      },
      include: {
        questions: true
      }
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
} 