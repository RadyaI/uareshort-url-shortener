"use client"

import { db } from "@/lib/firebase"
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

export default function InputUrl() {

    const [link, setLink] = useState("")
    const router = useRouter()

    async function createLink() {
        try {
            if (!link) {
                return toast.error("Link required!")
            } else if (link.slice(0, 8) != "https://" && link.slice(0, 7) != "http://") {
                return toast.error("Link invalid!")
            }

            toast.info("Wait a second..")

            const shortCode = Math.random().toString(36).slice(2, 7);
            await addDoc(collection(db, "url"), {
                shortCode,
                originalLink: link,
                createdAt: Timestamp.now().toMillis()
            })
            setLink("")
            toast.success("Link created!")
            router.push(`/?id=${shortCode}`)

        } catch (error: any) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    async function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            await createLink()
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                theme="dark"
            />
            <div className="w-full h-fit p-2 py-10 flex justify-center items-center">
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} onKeyUp={handleSubmit} placeholder="Place link here..." className="outline-none size-12 w-9/12 sm:w-1/2 py-3 px-4 text-lg rounded-s-full bg-transparent border border-black" />
                <div onClick={() => createLink()} className="size-12 w-[50px] py-2 px-12 rounded-e-full border border-black flex justify-center items-center cursor-pointer text-lg hover:bg-black hover:text-white transition-all"><p>Submit</p></div>
            </div>
        </>
    )
}