import React from 'react';
import { Label, TextInput, Button } from 'flowbite-react';

export default function Register() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-lg p-8 space-y-6 bg-white rounded shadow'>
        <h2 className='text-2xl font-semibold text-center'>
          Create your account
        </h2>

        <form className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='sm:col-span-1'>
            <Label htmlFor='firstName' value='First name' />
            <TextInput id='firstName' placeholder='First name' required />
          </div>

          <div className='sm:col-span-1'>
            <Label htmlFor='lastName' value='Last name' />
            <TextInput id='lastName' placeholder='Last name' required />
          </div>

          <div className='sm:col-span-2'>
            <Label htmlFor='email' value='Email' />
            <TextInput
              id='email'
              type='email'
              placeholder='you@company.com'
              required
            />
          </div>

          <div>
            <Label htmlFor='phone' value='Phone number' />
            <TextInput
              id='phone'
              type='tel'
              placeholder='(555) 555-5555'
              required
            />
          </div>

          <div>
            <Label htmlFor='password' value='Password' />
            <TextInput
              id='password'
              type='password'
              placeholder='Password'
              required
            />
          </div>

          <div>
            <Label htmlFor='confirmPassword' value='Confirm password' />
            <TextInput
              id='confirmPassword'
              type='password'
              placeholder='Confirm password'
              required
            />
          </div>

          <div className='sm:col-span-2 pt-2'>
            <Button type='submit' className='w-full'>
              Create account
            </Button>
          </div>
        </form>

        <p className='text-sm text-center text-gray-600 sm:col-span-2'>
          Already have an account?{' '}
          <a href='/login' className='text-blue-600 hover:underline'>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
