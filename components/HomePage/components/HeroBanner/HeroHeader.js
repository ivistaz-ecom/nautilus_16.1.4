"use client"

import dynamic from "next/dynamic"

const Header = dynamic(() => import("@/components/Header/Header"), {
  ssr: false,
})

export default function HeroHeader(props) {
  return <Header {...props} />
}
