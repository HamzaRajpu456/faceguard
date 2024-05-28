import About from '@/components/About'
import Wrapper from '@/components/Wrapper'
import React from 'react'

const AboutPage = () => {
  return (
   <Wrapper>
    <div className='space-y-5 sm:space-y-0 py-10 sm:flex justify-around  max-w-3xl mx-auto w-full items-center min-h-screen'>
    <div><About img="/umar.png" name="Umar uz Zaman" description="Frontend Developer"/></div>
    <div><About img="/hamza.png" name="Ameer Hamza" description="Backend Developer"/></div>
   </div>
   </Wrapper>
  )
}

export default AboutPage