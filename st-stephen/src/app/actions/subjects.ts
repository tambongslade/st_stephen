'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const SubjectSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().url(),
  classId: z.string().min(1),
})

export async function getSubjectsByClass(classId: string) {
  try {
    const subjects = await prisma.subject.findMany({
      where: { classId }
    })
    return { subjects }
  } catch (error) {
    return { error: 'Failed to fetch subjects' }
  }
}

export async function createSubject(formData: FormData) {
  const validatedFields = SubjectSchema.safeParse({
    name: formData.get('name'),
    imageUrl: formData.get('imageUrl'),
    classId: formData.get('classId'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  try {
    const subject = await prisma.subject.create({
      data: validatedFields.data,
    })
    revalidatePath(`/${subject.classId}`)
    return { subject }
  } catch (error) {
    return { error: 'Failed to create subject' }
  }
} 