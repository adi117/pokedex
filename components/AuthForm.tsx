"use client"

import { useAuth } from '@/context/useAuth';
import React, { useState } from 'react';

const AuthForm = () => {
  const { login, register } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    if (isRegistering) {
      register(username, password);
    } else {
      login(username, password);
    }
    setPassword('');
  };

  return (
    <div className=' flex flex-col gap-5 items-center justify-center border border-gray-300 rounded-2xl p-5'>
      <h3>{isRegistering ? 'Register' : 'Log In'}</h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 text-black w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-300 text-black w-full"
        />
        <button className='px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full' type="submit">{isRegistering ? 'Register' : 'Log In'}</button>
      </form>
      <p>
        <span className='cursor-pointer, mt-4'>
          {isRegistering ? 'Already have an account? ' : 'Need an account? '}
        </span>
        <span onClick={() => setIsRegistering(!isRegistering)} className='cursor-pointer, mt-4 text-blue-500'>
          {isRegistering ? 'Login' : 'Register'}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;