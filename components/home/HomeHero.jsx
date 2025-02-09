"use client";
import React from 'react'
import Wrapper from '../Wrapper'
import { Button, Image } from '@nextui-org/react'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import {motion} from "framer-motion"
import NextLink from "next/link"
import { container } from '../AnimationContainer';
const HomeHero = () => {
   
  return (
   <Wrapper>
   <div className="flex items-center justify-center min-h-screen py-20 md:py-0">
   <div className="md:grid md:grid-cols-2 md:gap-10 space-y-10 md:space-y-0">
   <section className='flex flex-col text-center max-w-md mx-auto md:max-w-full md:text-start justify-center'>
        <motion.h1
     variants={container(0)}
     initial="hidden"
     animate="visible"
        className='tracking-tight mb-7 font-semibold text-3xl sm:text-4xl md:text-6xl text-pretty leading-10'>Streamline Identity <span className='tracking-tight  from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b'>Verification</span> with Facial Recognition</motion.h1>
        <motion.p
         variants={container(0.5)}
         initial="hidden"
         animate="visible"
        className='text-large mb-10'>Embrace safer communities with <span className='underline underline-offset-4'>FaceGuard</span> global face recognition technology, enhancing identity verification for businesses.</motion.p>
        <motion.div
         variants={container(1)}
         initial="hidden"
         animate="visible"
        className='space-x-3'>
            <Button as={NextLink} href="/contact" size='lg' endContent={<TfiHeadphoneAlt />} color="primary" variant="shadow">
                Talk to an Expert
            </Button>
            <Button size='lg' as={NextLink} href="/signin" endContent={<FaArrowRightFromBracket />} color="default" variant="bordered">
                Let&apos;s Start
            </Button>
        </motion.div>
    </section>
    <motion.div 
    initial={{x:100, opacity:0}}
    animate={{x:0, opacity:1}}
    transition={{duration:1, delay:1.2}}
    className='flex items-center justify-center'>
        <Image
        src="/facial-recognition.webp"
        width={400}
        loading='eager'
        height={400}
        alt="face detection app"
        />
    </motion.div>
   </div>
   </div>
   </Wrapper>
  )
}

export default HomeHero