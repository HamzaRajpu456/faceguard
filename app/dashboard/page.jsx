"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  getKeyValue,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { PlusIcon, SearchIcon, ChevronDownIcon, EyeFilledIcon, EditIcon, DeleteIcon } from "@/components/Icons";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "@/utils/utils";
import Wrapper from "@/components/Wrapper";
import { auth, db } from "@/firebase/config";
import { ref, onValue, off } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useAsyncList } from "@react-stately/data";
import axios from "axios";
import {motion} from "framer-motion"
import { useRouter } from 'next/navigation';
import CreateStudent from "@/components/modals/CreateStudent";
import { containerY } from "@/components/AnimationContainer";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createMessage,setCreateMessage] = useState();
  const router = useRouter();


//   useEffect(() => {
//     // Check if user is already logged in
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         // If user is not logged in, redirect to signin
//         router.push('/signin');
//       }
//     });

//     // Cleanup function
//     return () => {
//       unsubscribe();
//     };
//   }, []);
const fetchStudents = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:5002/students`);
    const studentsData = res.data;
    if (studentsData) {
      const allStudents = Object.values(studentsData);
      console.log(allStudents)
      setStudents(allStudents);
    }
  } catch (error) {
    console.error("Error fetching students:", error);
  } finally {
    setIsLoading(false);
  }
};
  useEffect(() => {
      fetchStudents();
  }, []);

  const onUpdateStudent = useCallback(()=>{
    fetchStudents()
  },[])
useEffect(()=>{
  if(createMessage){
    const timer = setTimeout(()=>{
      setCreateMessage("")
    },3000)
    return ()=>clearTimeout(timer)
  }
},[createMessage])
  const headerColumns = [
    { name: "STUDENT ID", uid: "student_id", sortable: true },
    { name: "STUDENT NAME", uid: "student_name", sortable: true },
    { name: "DEPARTMENT", uid: "department", sortable: true },
    { name: "SEMESTER", uid: "semester" },
    { name: "SESSION", uid: "session" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const renderCell = useCallback((student,columnKey)=>{
    const cellValue = student[columnKey];
    switch (columnKey) {
      case "student_name":
        return (
          <User
            avatarProps={{radius: "lg", src: student.image_url} || ""}
            description={student.father_name}
            name={cellValue}
          >
            {student.student_name}
          </User>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeFilledIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
        <div className="flex flex-col gap-4 p-5">
            <div className="flex justify-between items-center gap-3">
            <h2 className="text-xl font-bold text-pretty">Registered Students Nominal Roll</h2>
                <CreateStudent setCreateMessage={setCreateMessage} onUpdateStudent={onUpdateStudent}/>
            </div>

{createMessage && <p className="text-success text-large">{createMessage}</p>}
        </div>
    );
}, [createMessage]);


  return (
    <Wrapper>

     <motion.div
     initial="hidden"
     animate="visible"
     variants={containerY(0)}
     
     >
     <Table
      topContent={
        topContent
      }
        aria-label="Example table with client side sorting"
        isStriped
        classNames={{
           wrapper:"p-0 border",
           thead:"[&>tr]:first:shadow-none",
           th:"first:rounded-none border-none last:rounded-none",
           tr:"last:border-none border-b",
           topContent:"mb-0",
           content:"text-normal"
        }}
      >

        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={students}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent="No Student Found"
         >
          {(item) => (
            <TableRow key={item.student_id}>
              {(columnKey) => <TableCell className="text-nowrap">{renderCell(item, columnKey) || []}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
     </motion.div>
    </Wrapper>
  );
}
