"use client"
import { Button, Card, CardBody, Checkbox, Input } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import Wrapper from '../Wrapper'
import { container } from '../AnimationContainer'
import { motion } from 'framer-motion'
const Signin = () => {
    return (
     <Wrapper>
          <div className='min-h-screen flex items-center justify-center'>
        <Card className='p-0 max-w-sm sm:max-w-4xl w-full h-full'>
            <CardBody className='p-0'>
            <div className="sm:grid-cols-2 grid overflow-x-hidden">
        <motion.div
        variants={container(0)}
        initial="hidden"
        animate="visible"
        className='max-w-[400px] w-full mx-auto md:mx-0 p-5 md:p-10'>
            <h2 className='font-bold text-2xl mb-2'>Welcome Back!</h2>
            <p className='mb-5'>Please Signin to your account</p>
            <form className='mb-10'>
                <div className="space-y-3 mb-3">
                <Input
                    isRequired
                    variant='bordered'
                    type="email"
                    label="Email"
                    defaultValue="umar@gmail.com"
                    className="max-w-[400px]"
                />
                <Input
                    isRequired
                    variant='bordered'
                    type="password"
                    label="Password"
                    className="max-w-[400px]"
                />
                </div>
                <div className='flex justify-between items-center mb-10'>
                    <Checkbox defaultSelected size="sm">Remember me</Checkbox>
                    <Link className='text-danger text-sm' href="/">Forget Password?</Link>
                </div>
                <div className='flex gap-5'>
                    <Button className='w-1/2' color="primary" variant="solid">
                        Signin
                    </Button>
                    <Button className='w-1/2' color="primary" variant="bordered">
                       Create Account
                    </Button>
                </div>
            </form>
            <p className='text-sm text-default-400'>By sign up you agree to our term and that you have read our data policy.</p>
        </motion.div>
        <motion.div
         initial={{x:100, opacity:0}}
    animate={{x:0, opacity:1}}
    transition={{duration:1, delay:1}}
        className='hidden sm:block bg-[url("/face-detection.webp")] bg-center bg-cover'>
            
        </motion.div>
        </div>
            </CardBody>
        </Card>
       </div>
     </Wrapper>
    )
}

export default Signin