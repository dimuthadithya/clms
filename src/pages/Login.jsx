import React, { useState } from 'react';
import { Label, TextInput, Button, Alert } from 'flowbite-react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Users, FileText, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard'); // You'll need to create this route
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in. Please check your credentials.');
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Failed to sign in with Google. Please try again.');
    }

    setLoading(false);
  }
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

            {error && (
              <Alert color='failure' className='mb-4'>
                {error}
              </Alert>
            )}

            <form className='space-y-4' onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor='password'
                  value='Password'
                  className='mb-1 block text-sm'
                />
                <div className='relative'>
                  <TextInput
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='pr-10'
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-gray-400 hover:text-gray-600' />
                    ) : (
                      <Eye className='h-4 w-4 text-gray-400 hover:text-gray-600' />
                    )}
                  </button>
                </div>
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
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className='mt-4'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type='button'
                className='w-full mt-4'
                color='light'
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </Button>
            </div>

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
