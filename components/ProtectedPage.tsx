"use client"

import { useAuth } from "@/context/useAuth";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth();


  const handleClick = () => {
    window.location.href = "/"
  }

  if (isLoggedIn && user !== null) {
    return <>{children}</>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <h2>Loading or Redirecting...</h2>
        <p>You must be logged in to view this page.</p>
        <button className='px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full' onClick={handleClick} type="submit">Home</button>
      </div>
    </div>
  );
}