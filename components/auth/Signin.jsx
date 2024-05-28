"use client"
import { Button, Card, CardBody, Checkbox, Input } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { container, containerY } from '../AnimationContainer'
import { motion } from 'framer-motion'
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/Icons'; 
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Wrapper from '../Wrapper'
import Image from 'next/image'
import faceguard from "../../public/faceguard.png"
import CreateUser from '../modals/CreateUser'
import ChangePassword from '../modals/ChangePassword'
const Signin = () => {
    const [isVisible, setIsVisible] = useState(false); 
    const router = useRouter();
    const [createMessage,setCreateMessage] = useState();

const { register, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });
    const toggleVisibility = () => {
        setIsVisible((prev) => !prev); 
      };

      useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = onAuthStateChanged(auth,(user) => {
          if (user) {
            // If user is logged in, redirect to dashboard
            router.push('/dashboard');
          }
        });
    
        // Cleanup function
        return () => {
          unsubscribe();
        };
      }, []);
    
      const submitForm = async (data) => {
        const { email, password } = data;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("Login successful!");
          // Redirect to dashboard
          router.push('/dashboard');
          // ...
        })
        .catch((error) => {
          console.log(error.message)
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      };
    return (
     <Wrapper>
          <div className='min-h-screen flex flex-col items-center justify-center'>
            <motion.div
            variants={containerY(0,-100,.5)}
            initial="hidden"
            animate="visible"
            className='border px-5 py-1 -mb-5 z-50 text-center w-fit rounded-full bg-zinc-950 shadow-2xl shadow-primary'>
          <Link href="/">
          <Image
          loading="eager"
          priority
          src={faceguard}
          width={100}
          height={80}
          alt="Face Guard"
            />
          </Link>
          </motion.div>
        <Card className='p-0 max-w-sm sm:max-w-4xl w-full h-full overflow-auto'>
        
            <CardBody className='p-0'>
            <div className="sm:grid-cols-2 grid overflow-x-hidden">
        <motion.div
        variants={container(0)}
        initial="hidden"
        animate="visible"
        className='max-w-[400px] w-full mx-auto md:mx-0 p-10 md:p-10'>
            <h2 className='font-bold text-2xl mb-2'>Welcome Back!</h2>
            <p className='mb-5'>Please Signin to your account</p>
            <form onSubmit={handleSubmit(submitForm)} className='mb-10'>
                <div className="space-y-3 mb-3">
                <Input
                    isRequired
                    variant='bordered'
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    {...register('email',{
                        required:true
                      })}
                    className="max-w-[400px]"
                />
                <Input
                    isRequired
                    variant='bordered'
                    endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? 'text' : 'password'}
                    label="Password"
                    {...register('password',{
                        required:true
                      })}
                      placeholder="Enter your password"
                    className="max-w-[400px]"
                />
                </div>
                <div className='flex justify-between items-center mb-10'>
                    <Checkbox defaultSelected size="sm">Remember me</Checkbox>
                    <ChangePassword/>
                </div>
                <div className='flex gap-5'>
                    <Button type='submit' className='w-1/2' color="primary" variant="solid">
                        Signin
                    </Button>
                   <CreateUser setCreateMessage={setCreateMessage}/>
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