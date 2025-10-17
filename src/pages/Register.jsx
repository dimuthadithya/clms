import React, { useState } from 'react';
import { Label, TextInput, Button, Alert } from 'flowbite-react';
import { motion } from 'framer-motion';
import {
  Code2,
  GraduationCap,
  Users,
  BookOpen,
  FileText,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  createUserAccount,
  signInWithGoogle,
} from '../utils/firebaseFunctions';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  // Helper function to get user-friendly error messages
  const getErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
        return 'Email registration is not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use a stronger password.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'Failed to create account. Please try again.';
    }
  };

  // Form validation
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('Please enter your first name.');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('Please enter your last name.');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!formData.password) {
      setError('Please enter a password.');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setError('');
      setLoading(true);

      await createUserAccount(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError(getErrorMessage(error));
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    }

    setLoading(false);
  }
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

            {error && (
              <Alert color='failure' className='mb-4'>
                {error}
              </Alert>
            )}

            <form
              className='grid grid-cols-1 gap-4 sm:grid-cols-2'
              onSubmit={handleSubmit}
            >
              <div className='sm:col-span-1'>
                <Label
                  htmlFor='firstName'
                  value='First name'
                  className='mb-1 block text-sm'
                />
                <TextInput
                  id='firstName'
                  placeholder='John'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='sm:col-span-1'>
                <Label
                  htmlFor='lastName'
                  value='Last name'
                  className='mb-1 block text-sm'
                />
                <TextInput
                  id='lastName'
                  placeholder='Doe'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='sm:col-span-1'>
                <Label
                  htmlFor='password'
                  value='Password'
                  className='mb-1 block text-sm'
                />
                <div className='relative'>
                  <TextInput
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={formData.password}
                    onChange={handleChange}
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

              <div className='sm:col-span-1'>
                <Label
                  htmlFor='confirmPassword'
                  value='Confirm password'
                  className='mb-1 block text-sm'
                />
                <div className='relative'>
                  <TextInput
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className='pr-10'
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4 text-gray-400 hover:text-gray-600' />
                    ) : (
                      <Eye className='h-4 w-4 text-gray-400 hover:text-gray-600' />
                    )}
                  </button>
                </div>
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
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>

              <div className='sm:col-span-2 mt-4'>
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
                  {loading ? 'Signing in...' : 'Sign up with Google'}
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
