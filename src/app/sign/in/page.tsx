'use client';
import React, { useState } from 'react';
import Form from '@/layouts/Form';
import Input from '@/components/Input';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // useSignIn({ email, password });
  };

  return (
    <Form title="Sign In to your account" onSubmit={onSubmit}>
      <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />

      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required link="forgot" linkLabel='Forgot password?'/>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</button>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        You&aposre new? {" "}
        <a href="up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</a>
      </p>
    </Form>
  );
}