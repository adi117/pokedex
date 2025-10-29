"use client"

import { ProtectedRoute } from "@/components/ProtectedPage";
import { useAuth } from "@/context/useAuth";

export default function PokemonDetailsPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 w-fit p-5 border border-gray-300 rounded-2xl">
          Welcome back!
          <input
            type="text"
            placeholder="Username"
            value={user ?? "user"}
            disabled
            className="px-3 py-1 rounded-lg border border-gray-300 text-gray-400 w-full bg-gray-100"
          />
          <button className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full' onClick={logout} type="submit">Logout</button>
        </div>
      </div>
    </ProtectedRoute>
  );
}