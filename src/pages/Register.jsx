import React from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import { motion } from 'framer-motion';
import { Code2, GraduationCap, Users, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className='h-screen flex overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50'>
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-700 p-8 flex-col justify-center items-center text-white relative overflow-hidden'
      >
        {/* Animated background elements */}
        <div className='absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl'></div>

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
            className='text-lg mb-6 text-purple-100'
          >
            Join educators and students in our comprehensive learning platform
          </motion.p>

          <div className='space-y-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='flex items-start gap-4'
            >
              <GraduationCap className='mt-1 flex-shrink-0' size={24} />
              <div>
                <h3 className='font-semibold text-base'>For Educators</h3>
                <p className='text-sm text-purple-100'>
                  Create courses, manage students, and track academic progress
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className='flex items-start gap-4'
            >
              <Users className='mt-1 flex-shrink-0' size={24} />
              <div>
                <h3 className='font-semibold text-base'>For Students</h3>
                <p className='text-sm text-purple-100'>
                  Access courses, submit assignments, and monitor your learning
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className='flex items-start gap-4'
            >
              <FileText className='mt-1 flex-shrink-0' size={24} />
              <div>
                <h3 className='font-semibold text-base'>Resource Library</h3>
                <p className='text-sm text-purple-100'>
                  Centralized hub for all learning materials and resources
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className='mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'
          >
            <p className='text-xs text-purple-100 italic'>
              "Coderoom LMS revolutionized how I manage my classes. Creating and
              sharing learning resources has never been easier, and my students
              love the interactive platform!"
            </p>
            <p className='mt-2 font-semibold text-sm'>
              — Dr. Maria L., Computer Science Professor
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Register Form */}
      <div className='flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='w-full max-w-lg my-auto'
        >
          {/* Mobile Logo */}
          <div className='lg:hidden flex items-center justify-center gap-2 mb-4'>
            <Code2 size={28} className='text-purple-600' />
            <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
              Coderoom LMS
            </h1>
          </div>

          <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100'>
            <div className='mb-6'>
              <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                Create your account
              </h2>
              <p className='text-sm sm:text-base text-gray-600'>
                Join as an educator or student to get started
              </p>
            </div>

            <form className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='sm:col-span-1'>
                <Label
                  htmlFor='firstName'
                  value='First name'
                  className='mb-1 block text-sm'
                />
                <TextInput id='firstName' placeholder='John' required />
              </div>

              <div className='sm:col-span-1'>
                <Label
                  htmlFor='lastName'
                  value='Last name'
                  className='mb-1 block text-sm'
                />
                <TextInput id='lastName' placeholder='Doe' required />
              </div>

              <div className='sm:col-span-2'>
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

              <div className='sm:col-span-2'>
                <Label
                  htmlFor='phone'
                  value='Phone number'
                  className='mb-1 block text-sm'
                />
                <TextInput
                  id='phone'
                  type='tel'
                  placeholder='+1 (555) 000-0000'
                  required
                />
              </div>

              <div className='sm:col-span-1'>
                <Label
                  htmlFor='password'
                  value='Password'
                  className='mb-1 block text-sm'
                />
                <TextInput
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  required
                />
              </div>

              <div className='sm:col-span-1'>
                <Label
                  htmlFor='confirmPassword'
                  value='Confirm password'
                  className='mb-1 block text-sm'
                />
                <TextInput
                  id='confirmPassword'
                  type='password'
                  placeholder='••••••••'
                  required
                />
              </div>

              <div className='sm:col-span-2'>
                <label className='flex items-start gap-2 cursor-pointer text-xs sm:text-sm text-gray-600'>
                  <input
                    type='checkbox'
                    className='mt-1 rounded text-purple-600'
                    required
                  />
                  <span>
                    I agree to the{' '}
                    <a
                      href='#'
                      className='text-purple-600 hover:text-purple-700 font-medium'
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href='#'
                      className='text-purple-600 hover:text-purple-700 font-medium'
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              <div className='sm:col-span-2'>
                <Button
                  type='submit'
                  className='w-full'
                  gradientDuoTone='purpleToPink'
                >
                  Create account
                </Button>
              </div>
            </form>

            <div className='mt-4 text-center'>
              <p className='text-sm text-gray-600'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='text-purple-600 hover:text-purple-700 font-semibold'
                >
                  Sign in
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
