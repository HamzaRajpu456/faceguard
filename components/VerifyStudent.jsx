"use client"
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam'; // Importing react-webcam
import io from 'socket.io-client';
import Wrapper from './Wrapper';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

const VerifyStudent = () => {
  const webcamRef = useRef(null); // Using react-webcam's ref
  const socketRef = useRef();
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [isSending, setIsSending] = useState(true); // State to control video streaming

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_SERVER}`);
    // Initialize Socket.IO client
    socketRef.current.on("connect", (socket) => {
      console.log('connected', socket);
    });
    socketRef.current.on("student_data", (data) => {
      setStudentData(data);
      setIsSending(false); // Stop sending video when student data is received
    });
  }, []);
  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If user is not logged in, redirect to signin
        router.push('/signin');
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(isSending);
  console.log(studentData);
  useEffect(()=>{
    if(studentData && !isSending){
      const timer = setTimeout(()=>{
        setIsSending(true)
        setStudentData(null)
      },5000)
      return ()=>clearTimeout(timer)
    }
  },[isSending,studentData])
  useEffect(() => {
    if (webcamRef.current && isSending) {
      // Sending video stream to server
      const sendVideoStream = () => {
        const imageSrc = webcamRef.current.getScreenshot({ quality: 0.9 });
        if (imageSrc) {
          // Convert base64 to ArrayBuffer
          const byteString = atob(imageSrc.split(',')[1]);
          const buffer = new ArrayBuffer(byteString.length);
          const uintArray = new Uint8Array(buffer);

          for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
          }

          console.log(buffer);
          // Send the buffer
          socketRef.current.emit('video_frame', buffer);
        }
      };

      const interval = setInterval(sendVideoStream, 1000); // Send every 1 second
      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [webcamRef, isSending]); // Ensure dependency is updated if ref changes

  return (
    <Wrapper>
      <div className='min-h-[100dvh] flex items-center justify-center'>
        <div className='flex relative mx-auto max-w-[320px] w-full items-center justify-center'>
          {
            studentData ? (
              <div className='w-full flex py-10 flex-col max-w-sm mx-auto justify-center border border-warning-200 rounded-md'>
                {
                  studentData && (typeof studentData !== 'string') ? 
                  studentData.map((student, index) => (
                    <div key={index} className='text-xl space-y-3'>
                      <Image
                      src={student.image_url}
                      width={96}
                      height={96}
                      className='mx-auto rounded-full border-2 border-warning-200  bg-secondary-400'
                      alt={student.student_name}
                      />  
                    <div className="text-center">
                    <p>{student.student_name}</p>
                      <p>{student.father_name}</p>
                      <p>{student.department}</p>
                    </div>
                    </div>
                  )) : 
                  <div>
                    <p className='text-xl font-bold p-5 text-danger text-center'>
                      Student is not Register
                    </p>
                  </div>
                }
              </div>
            ) : (
              <Webcam
                ref={webcamRef}
                videoConstraints={{
                  width: 320,
                  height: 520,
                  facingMode: 'user', // Front-facing camera
                }}
                className='mx-auto border-2 rounded-lg border-primary-400'
                screenshotFormat='image/jpeg' // Format for screenshots
                audio={false} // No audio required
                muted
                autoPlay
                mirrored={true}
              />
            )
          }
          {
            studentData ? "" : (
              <p className='absolute bottom-20 left-10 right-10 text-center py-5 rounded-lg text-xl bg-primary'>
                Verifying Student...<br />
                <span className="text-base">Please, Wait!</span>
              </p>
            )
          }
        </div>
      </div>
    </Wrapper>
  );
};

export default VerifyStudent;
