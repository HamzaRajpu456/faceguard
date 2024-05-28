"use client";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ThankYouPage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <Card className="max-w-xl mx-auto p-8 rounded shadow-md">
       <CardBody>
       <h2 className="text-3xl font-semibold  mb-4">
          Thank You!
        </h2>
        <p className="mb-8">
          Your message has been sent successfully.
        </p>
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          href="/"
        >
          Return to Homepage
        </Link>
       </CardBody>
      </Card>
    </div>
  );
};

export default ThankYouPage;