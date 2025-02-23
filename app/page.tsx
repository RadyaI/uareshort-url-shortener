import DisplayUrl from "@/components/displayUrl"
import InputUrl from "@/components/inputUrl"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - url short",
  description: "Free Url shortner easy to use and friendly UI"
}

export default function Home() {
  return (
    <>
      <InputUrl></InputUrl>
      <DisplayUrl></DisplayUrl>
    </>
  )
}