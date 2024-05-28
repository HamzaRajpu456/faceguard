"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ChangePassword({ setCreateMessage, onUpdateStudent }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  const submitForm = async (data) => {
    setIsSending(true);
    try {
      await sendPasswordResetEmail(auth, data.email)
      .then(() => { 
        setCreateMessage("Reset Password Email Sent Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      onClose();
      reset();  // Reset form data after successful submission
    } catch (error) {
      console.error("Error Creating User:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button className='text-danger text-sm' variant='light' onPress={onOpen}>Forget Password?</Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-primary/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Reset Your Password</ModalHeader>
          <ModalBody>
            <p>Enter your registered email to reset your password.</p>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="flex gap-4 mb-4">
                <input
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 ${errors.email ? 'border-red-500' : ''}`}
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
                  {isSending ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
