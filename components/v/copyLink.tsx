"use client"
import { LinkOutlined } from '@ant-design/icons'
import { toast, ToastContainer } from 'react-toastify'

export default function CopyLink({ shortLink }: any) {

    const copyLink = () => {
        navigator.clipboard.writeText(`https://usrt.vercel.app/${shortLink}`)
        toast.success("Copied")
    }

    return (
        <>
            <ToastContainer
                position='bottom-right'
                theme='dark'
            />
            <LinkOutlined className='ml-2' onClick={() => copyLink()} />
        </>
    )
}