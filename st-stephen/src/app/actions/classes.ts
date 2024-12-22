'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const ClassSchema = z.object({
  name: z.string().min(1),
})

export async function getClasses() {
  try {
    const classes = await prisma.class.findMany()
    return { classes }
  } catch (error) {
    return { error: 'Failed to fetch classes' }
  }
}

export async function createClass(formData: FormData) {
  const validatedFields = ClassSchema.safeParse({
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  try {
    const class_ = await prisma.class.create({
      data: {
        name: validatedFields.data.name,
      },
    })
    revalidatePath('/')
    return { class: class_ }
  } catch (error) {
    return { error: 'Failed to create class' }
  }
} 