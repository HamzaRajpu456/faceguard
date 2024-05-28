"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function CreateUser({ setCreateMessage, onUpdateStudent }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  const submitForm = async (data) => {
    setIsSending(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      onClose();
      setCreateMessage("User created successfully");
      reset();  // Reset form data after successful submission
    } catch (error) {
      console.error("Error Creating User:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button className="w-1/2" color="primary" variant="bordered" onPress={onOpen}>Create User</Button>
      
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
          <ModalHeader className="flex flex-col gap-1">Create User</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="flex gap-4 mb-4">
                <input
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2 ${errors.email ? 'border-red-500' : ''}`}
                />
                <input
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className={`border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2 ${errors.password ? 'border-red-500' : ''}`}
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
