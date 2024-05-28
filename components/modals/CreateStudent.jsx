"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { PlusIcon } from "../Icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

export default function CreateStudent({ setCreateMessage, onUpdateStudent }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    father_name: "",
    session: "",
    department: "",
    semester: "",
    student_id: "",
    image_url: "",
    student_img: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, student_img: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    let imageUrl = "";
    if (formData.student_img) {
      try {
        const imageRef = storageRef(storage, `students/${formData.student_img.name}`);
        await uploadBytes(imageRef, formData.student_img);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error saving image", error);
      }
    }
    const formDataToSend = new FormData();
    formDataToSend.append("student_name", formData.student_name);
    formDataToSend.append("father_name", formData.father_name);
    formDataToSend.append("session", formData.session);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("semester", formData.semester);
    formDataToSend.append("student_id", formData.student_id);
if(imageUrl){
  formDataToSend.append("image_url", imageUrl);

}
    if (formData.student_img) {
      formDataToSend.append("student_img", formData.student_img);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:5002/students/create`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
      setCreateMessage("Student created successfully");
      onUpdateStudent();
      setFormData({
        student_name: "",
        father_name: "",
        session: "",
        department: "",
        semester: "",
        student_id: "",
        student_img: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button endContent={<PlusIcon />} onPress={onOpen} color="primary">Create Student</Button>
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
          <ModalHeader className="flex flex-col gap-1">Create Student</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mb-4">
                <input
                  placeholder="Student Name"
                  name="student_name"
                  value={formData.student_name}
                  className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
                  onChange={handleChange}
                />
                <input
                  placeholder="Father Name"
                  name="father_name"
                  value={formData.father_name}
                  className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  placeholder="Department"
                  name="department"
                  value={formData.department}
                  className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
                  onChange={handleChange}
                />
                <input
                  placeholder="Session"
                  name="session"
                  value={formData.session}
                  className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  placeholder="Student ID"
                  name="student_id"
                  value={formData.student_id}
                  className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
                  onChange={handleChange}
                />
                <input
                  placeholder="Semester"
                  name="semester"
                  value={formData.semester}
                  className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 md:w-1/2"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  name="student_img"
                  className="border w-full bg-transparent rounded-md border-gray-500 py-1.5 px-2 file:-mx-3 file:-my-[0.32rem] placeholder:text-gray-400 file:text-gray-400 file:bg-transparent file:border-0 file:border-e file:me-3 file:cursor-pointer file:overflow-hidden"
                  type="file"
                  onChange={handleFileChange}
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
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
