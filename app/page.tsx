import DisplayUrl from "@/components/displayUrl"
import InputUrl from "@/components/inputUrl"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Home - url short",
  description: "Free Url shortner easy to use and friendly UI"
}

export default function Home() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold uppercase mt-5">Url Shortener</h1>
      <InputUrl></InputUrl>
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayUrl></DisplayUrl>
      </Suspense>
    </>
  )
}