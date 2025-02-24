"use client"

import { db } from "@/lib/firebase"
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore"
import { useParams } from "next/navigation"
import { useEffect } from "react"

async function getIp(): Promise<any> {
    try {
        const ip = await fetch("https://send-email-liard.vercel.app/ip", {
            cache: "no-store"
        })

        return ip.json()
    } catch (error) {
        console.log(error)
    }
}

export default function Redirect() {
    const params = useParams()
    const linkId = params.id

    async function trackAndRedirect(link: string) {
        try {
            await addDoc(collection(db, "tracking"), {
                ip: await getIp(),
                shortCode: linkId,
                clickedAt: Timestamp.now().toMillis()
            })

            location.href = link
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getLink() {
            try {
                const get = await getDocs(query(
                    collection(db, "url"),
                    where("shortCode", "==", linkId)
                ))

                const link: any[] = [];
                get.forEach((data) => {
                    link.push(data.data().originalLink)
                })

                if (link[0]) {
                    trackAndRedirect(link[0])
                }
            } catch (error: any) {
                console.log(error.message)
            }
        }

        getLink()
    }, [])

    return <p>Redirect...</p>
}