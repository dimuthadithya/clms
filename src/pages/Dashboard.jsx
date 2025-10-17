import React from 'react';
import { Button } from 'flowbite-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>
                Welcome to Coderoom LMS
              </h1>
              <p className='text-gray-600 mt-2'>
                Hello, {currentUser?.displayName || currentUser?.email}!
              </p>
            </div>
            <Button onClick={handleLogout} color='gray'>
              Logout
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-blue-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-lg text-blue-800 mb-2'>
                Student Management
              </h3>
              <p className='text-blue-600 text-sm'>
                Manage student enrollment, progress, and grades
              </p>
            </div>

            <div className='bg-purple-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-lg text-purple-800 mb-2'>
                Course Creation
              </h3>
              <p className='text-purple-600 text-sm'>
                Create and publish learning materials and courses
              </p>
            </div>

            <div className='bg-green-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-lg text-green-800 mb-2'>
                Resource Library
              </h3>
              <p className='text-green-600 text-sm'>
                Access all learning materials and resources
              </p>
            </div>
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
            <h4 className='font-medium text-gray-800 mb-2'>
              User Information:
            </h4>
            <p className='text-sm text-gray-600'>Email: {currentUser?.email}</p>
            <p className='text-sm text-gray-600'>
              Name: {currentUser?.displayName || 'Not set'}
            </p>
            <p className='text-sm text-gray-600'>User ID: {currentUser?.uid}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
