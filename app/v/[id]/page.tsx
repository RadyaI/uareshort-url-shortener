import CopyLink from "@/components/v/copyLink"
import { DisplayTrack } from "@/components/v/displayTrack"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "View - url short"
}

type LinkData = {
    linkId: string
}

async function getLink(linkId: string): Promise<any> {
    try {
        const getData = await getDocs(query(
            collection(db, "url"),
            where("shortCode", "==", linkId)
        ))

        const temp: LinkData[] = []
        getData.forEach((data) => {
            temp.push({ ...data.data(), linkId: data.id })
        })
        return temp[0]
    } catch (error: any) {
        console.log(error.message)
    }
}

export default async function ViewLink({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const linkData: any = await getLink(id);

    return (
        <>
            <div className="w-10/12 sm:w-1/2 mt-5 mx-auto p-5 shadow flex flex-col">
                <p className="text-2xl">{linkData.originalLink}</p>
                <small className="cursor-pointer flex" >usrt.vercel.app/{linkData.shortCode} <CopyLink shortLink={linkData.shortCode} /></small>
                <small className="mt-2">Created at {new Date(linkData.createdAt).toLocaleString("id-ID", {
                    hour12: false,
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })}</small>
            </div>

            <DisplayTrack shortCode={linkData.shortCode} />
        </>
    )
}