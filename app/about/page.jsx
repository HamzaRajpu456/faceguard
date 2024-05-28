import About from '@/components/About'
import Wrapper from '@/components/Wrapper'
import React from 'react'

const AboutPage = () => {
  return (
   <Wrapper>
    <div className='flex justify-around items-center min-h-screen'>
    <div><About img="/umar.png" name="Umar uz Zaman" description="Frontend Developer"/></div>
    <div><About img="/hamza.png" name="Ameer Hamza" description="Backend Developer"/></div>
   </div>
   </Wrapper>
  )
}

export default AboutPage