import React from 'react';
import { Label, TextInput, Button } from 'flowbite-react';

export default function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded shadow'>
        <h2 className='text-2xl font-semibold text-center'>
          Sign in to your account
        </h2>

        <form className='space-y-4'>
          <div>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              placeholder='you@company.com'
              required
            />
          </div>

          <div>
            <Label htmlFor='password' value='Password' />
            <TextInput
              id='password'
              type='password'
              placeholder='Your password'
              required
            />
          </div>

          <div className='pt-2'>
            <Button type='submit' className='w-full'>
              Sign in
            </Button>
          </div>
        </form>

        <p className='text-sm text-center text-gray-600'>
          Don't have an account?{' '}
          <a href='/signup' className='text-blue-600 hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
