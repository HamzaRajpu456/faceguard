"use client";
import { containerY } from "@/components/AnimationContainer";
import Wrapper from "@/components/Wrapper";
import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {motion} from "framer-motion"

const Contact = () => {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
  });
  const submitForm = async (data) => {
    const formDataToSend = data;
    setIsSending(true);
    try {
      await axios.post("/api/send-mail/", formDataToSend);
      toast.success("Email sent successfully.")
      reset();

      router.push("/thanks");
    } catch (error) {
      console.error("Error occurred while submitting form:", error);

      toast.error("Failed to submit form. Please try again later.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Wrapper>
   
    <div className="max-w-md mx-auto w-full min-h-screen flex-col flex items-center justify-center">
      <Card>
    <CardBody className="overflow-hidden p-10">
      <motion.div
      initial="hidden"
      animate="visible"
      variants = {containerY(0)}
      className="text-center mb-5">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-[18px]">Feel free to contact with us</p>
      </motion.div>
    <motion.form
    initial="hidden"
    animate="visible"
    variants = {containerY(0.5)}
    
    onSubmit={handleSubmit(submitForm)}>
          <div className="space-y-3 sm:space-y-0 sm:flex gap-4 mb-4">
            <input
            required
              placeholder="Full Name"
              name="fullName"
              className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
              {...register("fullName")}
            />
            <input
            required
              placeholder="Email"
              name="Email"
              {...register("email")}

              className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
            />
          </div>
          <div className="space-y-3 sm:space-y-0 sm:flex gap-4 mb-4">
            <input
            required
              placeholder="Phone Number"
              name="phone number"
              {...register("phoneNumber")}

              className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
            />
            <input
            required
              placeholder="Enter your message"
              name="message"
              {...register("message")}
              className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
            />
          </div>

          <div className="text-center mt-5">
            <Button
              startContent={isSending && <Spinner size="md" color="default" />}
              color="primary"
              size="lg"
              type="submit"
              className="w-[200px]"
              disabled={isSending}
            >
              {isSending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </motion.form>

    </CardBody>
   </Card>
   </div>

      </Wrapper>
    </>
  )
}
export default Contact;