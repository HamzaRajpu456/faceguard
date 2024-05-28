"use client";
import React from 'react'
import SiteNavbar from './SiteNavbar'
import { usePathname } from 'next/navigation'

const ConditionalHeader = () => {
    const pathname = usePathname();
  return (
    <>
    {
        pathname ==="/signin" ? "" :(<SiteNavbar/>)
    }
    </>
  )
}

export default ConditionalHeader