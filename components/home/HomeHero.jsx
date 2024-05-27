import React from 'react'
import Wrapper from '../Wrapper'
import { Button, Image } from '@nextui-org/react'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
const HomeHero = () => {
  return (
   <Wrapper>
   <div className="flex items-center justify-center min-h-screen">
   <div className="md:grid md:grid-cols-2 md:gap-10 space-y-10 md:space-y-0">
   <section className='flex flex-col text-center max-w-md mx-auto md:max-w-full md:text-start justify-center'>
        <h1 className='tracking-tight mb-5 font-semibold text-3xl sm:text-4xl md:text-5xl text-pretty leading-10'>Streamline Identity <span className='tracking-tight  from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b'>Verification</span> with Facial Recognition</h1>
        <p className='text-large mb-5'>Embrace safer communities with <span className='underline underline-offset-4'>FaceGuard</span> global face recognition technology, enhancing identity verification for businesses.</p>
        <div className='space-x-3'>
            <Button endContent={<TfiHeadphoneAlt />} color="primary" variant="shadow">
                Talk to an Expert
            </Button>
            <Button endContent={<FaArrowRightFromBracket />} color="default" variant="bordered">
                Let's Start
            </Button>
        </div>
    </section>
    <div className='flex items-center justify-center'>
        <Image
        src="/face-detection.webp"
        width={500}
        loading='eager'
        height={500}
        alt="face detection app"
        />
    </div>
   </div>
   </div>
   </Wrapper>
  )
}

export default HomeHero