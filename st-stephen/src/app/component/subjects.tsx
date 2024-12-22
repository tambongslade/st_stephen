'use client';

import Link from "next/link"
import Image from "next/image"

interface SubjectsProps {
    img: string
    title: string
    route?: string
}

export default function Subjects({ img, title, route }: SubjectsProps) {
    return (
        <Link href={route ?? '#'}>
            <div className="flex-col items-center flex mt-10">
                <div className="bg-violet rounded-full">
                    <Image 
                        src={img} 
                        alt={`${title} icon`}
                        width={112} // w-28 = 7rem = 112px
                        height={112}
                        className="p-6"
                    />
                </div>
                <h3 className="font-medium text-lg">{title}</h3>
            </div>
        </Link>
    )
}