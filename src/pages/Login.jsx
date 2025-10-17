import React from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='h-screen flex overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex-col justify-center items-center text-white relative overflow-hidden'
      >
        {/* Animated background elements */}
        <div className='absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl'></div>

        <div className='relative z-10 max-w-lg'>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex items-center gap-2 mb-4'
          >
            <Code2 size={40} className='text-white' />
            <h1 className='text-4xl font-bold'>Coderoom LMS</h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='text-lg mb-6 text-blue-100'
          >
            Complete learning management platform for educators and students
          </motion.p>

          <div className='space-y-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='flex items-start gap-4'
            >
              <Users className='mt-1 flex-shrink-0' size={24} />
              <div>
                <h3 className='font-semibold text-lg'>Student Management</h3>
                <p className='text-blue-100'>
                  Efficiently manage student enrollment, progress, and grades
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className='flex items-start gap-4'
            >
              <FileText className='mt-1 flex-shrink-0' size={24} />
              <div>
                <h3 className='font-semibold text-lg'>Resource Publishing</h3>
                <p className='text-blue-100'>
                  Create and publish learning materials, assignments, and
                  courses
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className='flex items-start gap-4'
            >
              <BookOpen className='mt-1 flex-shrink-0' size={24} />
              <div>
                <h3 className='font-semibold text-lg'>Interactive Learning</h3>
                <p className='text-blue-100'>
                  Engage students with multimedia content and assessments
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className='flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='w-full max-w-md my-auto'
        >
          {/* Mobile Logo */}
          <div className='lg:hidden flex items-center justify-center gap-2 mb-4'>
            <Code2 size={28} className='text-blue-600' />
            <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Coderoom LMS
            </h1>
          </div>

          <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100'>
            <div className='mb-6'>
              <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                Welcome back!
              </h2>
              <p className='text-sm sm:text-base text-gray-600'>
                Access your learning management dashboard
              </p>
            </div>

            <form className='space-y-4'>
              <div>
                <Label
                  htmlFor='email'
                  value='Email Address'
                  className='mb-1 block text-sm'
                />
                <TextInput
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor='password'
                  value='Password'
                  className='mb-1 block text-sm'
                />
                <TextInput
                  id='password'
                  type='password'
                  placeholder='Enter your password'
                  required
                />
              </div>

              <div className='flex items-center justify-between text-xs sm:text-sm'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input type='checkbox' className='rounded text-blue-600' />
                  <span className='text-gray-600'>Remember me</span>
                </label>
                <a
                  href='#'
                  className='text-blue-600 hover:text-blue-700 font-medium'
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type='submit'
                className='w-full'
                gradientDuoTone='purpleToBlue'
              >
                Sign in
              </Button>
            </form>

            <div className='mt-4 text-center'>
              <p className='text-sm text-gray-600'>
                Don't have an account?{' '}
                <Link
                  to='/signup'
                  className='text-blue-600 hover:text-blue-700 font-semibold'
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          <p className='text-center text-xs sm:text-sm text-gray-500 mt-3'>
            © 2025 Coderoom LMS. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
