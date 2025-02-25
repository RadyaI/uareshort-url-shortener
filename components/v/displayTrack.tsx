"use client"
import { Key, useEffect } from "react"
import { useState } from "react"
import { db } from "@/lib/firebase"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore"

export function DisplayTrack({ shortCode }: any) {

    const [trackData, setTrackData] = useState<any>([])


    function getTrack() {
        try {
            const queryD = query(
                collection(db, "tracking"),
                where("shortCode", "==", shortCode),
                orderBy("clickedAt", "desc")
            )

            onSnapshot(queryD, (snap) => {
                const temp: any[] = []
                snap.forEach((data) => {
                    temp.push({ ...data.data(), trackId: data.id })
                })
                setTrackData(temp)
            })


        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getTrack()
    }, [shortCode])

    return (
        <div className="w-10/12 sm:w-1/2 mx-auto mt-5 p-5 shadow">
            <table className="table w-full">
                <thead className="bg-black text-white [&_th]:p-2">
                    <tr>
                        <th>Code</th>
                        <th>Ip</th>
                        <th>Clicked at</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trackData.map((i: any, index: Key) =>
                            <tr className="[&_td]:text-center [&_td]:p-2" key={index}>
                                <td>{i.shortCode}</td>
                                <td>{i.ip}</td>
                                <td>
                                    {new Date(i.clickedAt).toLocaleString("id-ID", {
                                        hour12: false,
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}