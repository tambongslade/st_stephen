const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // First, create all the classes
  const classes = [
    { id: 'cm4z5ni700008uph48oyec2t5', name: 'Form 1', slug: 'form-1', level: 1 },
    { id: 'cm4z5ni4r0000uph4btyol4ju', name: 'Form 2', slug: 'form-2', level: 2 },
    { id: 'cm4z5ni7c000auph4j7r6hj24', name: 'Form 3', slug: 'form-3', level: 3 },
    { id: 'cm4z5ni6p0007uph4c4leecjd', name: 'Form 4 SC', slug: 'form-4-sc', level: 4 },
    { id: 'cm4z5ni730009uph4ubpqo7wc', name: 'Form 4 Art', slug: 'form-4-art', level: 4 },
    { id: 'cm4z5ni5c0001uph4ypyz2bfg', name: 'Form 5 SC', slug: 'form-5-sc', level: 5 },
    { id: 'cm4z5ni5i0006uph4vd7xts2v', name: 'Form 5 Art', slug: 'form-5-art', level: 5 },
    { id: 'cm4z5ni5e0002uph4lcfwy0gy', name: 'LSS', slug: 'lss', level: 6 },
    { id: 'cm4z5ni5f0003uph447fi9ym6', name: 'LSA', slug: 'lsa', level: 6 },
    { id: 'cm4z5ni5g0004uph48t0qqbuz', name: 'USS', slug: 'uss', level: 7 },
    { id: 'cm4z5ni5h0005uph41rb83yzp', name: 'USA', slug: 'usa', level: 7 }
  ]

  // Create or update each class
  for (const classData of classes) {
    await prisma.class.upsert({
      where: { id: classData.id },
      update: classData,
      create: classData
    })
  }

  // Then create all subjects
  const subjects = [
    { id: 'cm4z65n300000upgcg2l1ijqp', name: 'Maths', imageUrl: '/assets/images/maths.png' },
    { id: 'cm4z65n3f0001upgc1d6pi27b', name: 'Physics', imageUrl: '/assets/images/physics.png' },
    { id: 'cm4z65n3i0002upgciok2agwv', name: 'Biology', imageUrl: '/assets/images/biology.png' },
    { id: 'cm4z65n3j0003upgclg8mljum', name: 'Chemistry', imageUrl: '/assets/images/chemistry.png' },
    { id: 'cm4z65n3k0004upgcrfp5yb1a', name: 'Computer Sc.', imageUrl: '/assets/images/csc.png' },
    { id: 'cm4z65n3m0005upgcrh91gwo0', name: 'Geography', imageUrl: '/assets/images/geography.png' },
    { id: 'cm4z65n3o0006upgcqcverj0w', name: 'English', imageUrl: '/assets/images/english.png' },
    { id: 'cm4z65n3p0007upgc0s9pk358', name: 'Literature', imageUrl: '/assets/images/literature.png' },
    { id: 'cm4z65n3r0008upgcyrtm01kb', name: 'History', imageUrl: '/assets/images/history.png' }
  ]

  // Create or update each subject
  for (const subjectData of subjects) {
    await prisma.subject.upsert({
      where: { id: subjectData.id },
      update: subjectData,
      create: subjectData
    })
  }

  // Your existing subjectsByClass mapping
  const subjectsByClass = {
    'cm4z5ni700008uph48oyec2t5': [ // Form 1
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3f0001upgc1d6pi27b', // Physics
      'cm4z65n3i0002upgciok2agwv', // Biology
      'cm4z65n3j0003upgclg8mljum', // Chemistry
      'cm4z65n3r0008upgcyrtm01kb', // History
      'cm4z65n3m0005upgcrh91gwo0', // Geography
      'cm4z65n3p0007upgc0s9pk358'  // Literature
    ],
    'cm4z5ni4r0000uph4btyol4ju': [ // Form 2
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3f0001upgc1d6pi27b', // Physics
      'cm4z65n3i0002upgciok2agwv', // Biology
      'cm4z65n3j0003upgclg8mljum', // Chemistry
      'cm4z65n3r0008upgcyrtm01kb', // History
      'cm4z65n3m0005upgcrh91gwo0', // Geography
      'cm4z65n3p0007upgc0s9pk358'  // Literature
    ],
    'cm4z5ni7c000auph4j7r6hj24': [ // Form 3
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3f0001upgc1d6pi27b', // Physics
      'cm4z65n3i0002upgciok2agwv', // Biology
      'cm4z65n3j0003upgclg8mljum', // Chemistry
      'cm4z65n3r0008upgcyrtm01kb', // History
      'cm4z65n3m0005upgcrh91gwo0', // Geography
      'cm4z65n3p0007upgc0s9pk358', // Literature
      'cm4z65n3k0004upgcrfp5yb1a'  // Computer Sc.
    ],
    'cm4z5ni6p0007uph4c4leecjd': [ // Form 4 SC
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3f0001upgc1d6pi27b', // Physics
      'cm4z65n3i0002upgciok2agwv', // Biology
      'cm4z65n3j0003upgclg8mljum', // Chemistry
      'cm4z65n3k0004upgcrfp5yb1a'  // Computer Sc.
    ],
    'cm4z5ni730009uph4ubpqo7wc': [ // Form 4 Art
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3p0007upgc0s9pk358', // Literature
      'cm4z65n3r0008upgcyrtm01kb', // History
      'cm4z65n3m0005upgcrh91gwo0'  // Geography
    ],
    'cm4z5ni5c0001uph4ypyz2bfg': [ // Form 5 SC
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3f0001upgc1d6pi27b', // Physics
      'cm4z65n3i0002upgciok2agwv', // Biology
      'cm4z65n3j0003upgclg8mljum', // Chemistry
      'cm4z65n3k0004upgcrfp5yb1a'  // Computer Sc.
    ],
    'cm4z5ni5i0006uph4vd7xts2v': [ // Form 5 Art
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3p0007upgc0s9pk358', // Literature
      'cm4z65n3r0008upgcyrtm01kb', // History
      'cm4z65n3m0005upgcrh91gwo0'  // Geography
    ],
    'cm4z5ni5e0002uph4lcfwy0gy': [ // LSS
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3f0001upgc1d6pi27b', // Physics
      'cm4z65n3i0002upgciok2agwv', // Biology
      'cm4z65n3j0003upgclg8mljum', // Chemistry
      'cm4z65n3k0004upgcrfp5yb1a'  // Computer Sc.
    ],
    'cm4z5ni5f0003uph447fi9ym6': [ // LSA
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3p0007upgc0s9pk358', // Literature
      'cm4z65n3r0008upgcyrtm01kb', // History
      'cm4z65n3m0005upgcrh91gwo0'  // Geography
    ],
    'cm4z5ni5g0004uph48t0qqbuz': [ // USS
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3f0001upgc1d6pi27b', // Physics
      'cm4z65n3i0002upgciok2agwv', // Biology
      'cm4z65n3j0003upgclg8mljum', // Chemistry
      'cm4z65n3k0004upgcrfp5yb1a'  // Computer Sc.
    ],
    'cm4z5ni5h0005uph41rb83yzp': [ // USA
      'cm4z65n300000upgcg2l1ijqp', // Maths
      'cm4z65n3o0006upgcqcverj0w', // English
      'cm4z65n3p0007upgc0s9pk358', // Literature
      'cm4z65n3r0008upgcyrtm01kb', // History
      'cm4z65n3m0005upgcrh91gwo0'  // Geography
    ]
  }

  // Create the class-subject associations
  for (const [classId, subjectIds] of Object.entries(subjectsByClass)) {
    for (const subjectId of subjectIds) {
      await prisma.classSubject.upsert({
        where: {
          classId_subjectId: {
            classId: classId,
            subjectId: subjectId
          }
        },
        create: {
          classId: classId,
          subjectId: subjectId
        },
        update: {}
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 