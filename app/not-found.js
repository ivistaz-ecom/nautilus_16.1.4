"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header/Header"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import Link from "next/link"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Header
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />

      <div className="flex flex-col justify-center items-center h-screen mt-10">
        <div className="text-secondary text-center space-y-5">
          <h2 className="text-4xl tracking-wider">
            Looks like you've drifted off course!
          </h2>
          <p>The URL you requested was not found.</p>
         
        </div>

        <DotLottieReact
          src="https://lottie.host/6ae4a961-a389-4efe-8fae-6007a2403483/UBEQWT4cnQ.lottie"
          loop
          autoplay
          style={{ width: "450px", height: "450px" }}
        />
        <Link
          href="/"
          className="py-1.5 px-4 rounded-lg border border-secondary text-secondary hover:bg-secondary hover:border-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
        >
          Return Home
        </Link>
      </div>
    </>
  )
}
