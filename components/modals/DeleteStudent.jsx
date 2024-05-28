import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Spinner, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../Icons";
import { getDatabase, ref, child, remove } from "firebase/database";

export default function DeleteStudent({ setDeleteMessage, onUpdateStudent, studentId }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [isSending, setIsSending] = useState(false);
  const dbRef = ref(getDatabase());

  const deleteStudentHandle = async () => {
    setIsSending(true);
    try {
      await remove(child(dbRef, `students/${studentId}`));
      setDeleteMessage("Student deleted successfully");

      onUpdateStudent();
      onClose();
     
    } catch (error) {
      console.error("Error Deleting Student:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Tooltip color="danger" content="Delete student">
        <Button onPress={onOpen} isIconOnly variant="light" className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon />
        </Button>
      </Tooltip>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose} // Changed 'onOpenChange' to 'onClose' to handle modal closure
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
          <ModalHeader className="flex flex-col gap-1">Delete Student</ModalHeader>
          <ModalBody>
            <p>Do you want to delete student? {studentId}</p>
            <div className="space-x-3 text-end">
              <Button onPress={onClose} color="default" variant="bordered" size="sm">No</Button>
              <Button onClick={deleteStudentHandle} color="danger" variant="solid" size="sm">Yes</Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
