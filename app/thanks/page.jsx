"use client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";

const ThankYouPage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Thank You!
        </h2>
        <p className="text-gray-600 mb-8">
          Your message has been sent successfully.
        </p>
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          href="/"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;