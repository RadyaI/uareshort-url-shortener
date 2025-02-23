"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
export default function DisplayUrl() {

    const router = useRouter()
    const linkId = useSearchParams()
    const shortCode = linkId.get("id")

    const copyLink = () => {
        navigator.clipboard.writeText(`localhost:3000/${shortCode}`)
        toast.success("Copied!")
    }

    return (
        <>
        <ToastContainer
            theme="dark"
            position="bottom-right"
        />
            <div className="w-[90%] sm:w-1/2 mx-auto p-10 shadow rounded-lg bg-[#background] flex justify-center gap-5">
                {shortCode && (
                    <>
                        <button onClick={copyLink} className="py-[15px] px-[25px] cursor-pointer text-lg font-bold text-[--background] rounded-lg sm:rounded-full bg-blue-400">Copy Url</button>
                        <button onClick={() => router.push(`/v/${shortCode}`)} className="py-[15px] px-[25px] cursor-pointer text-lg font-bold text-[--background] rounded-lg sm:rounded-full bg-blue-800">View</button>
                    </>
                )}
            </div>
        </>
    )
}