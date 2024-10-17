'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function UserPages() {
  const router = useRouter();
  const { user, logout, isLoading, flashMessage, setFlashMessage } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.isAdmin) {
        router.push('/admin');
      }
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 5000); // 5秒後にメッセージを消す
      return () => clearTimeout(timer);
    }
  }, [flashMessage, setFlashMessage]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      {flashMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {flashMessage}
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4 text-black">User Profile</h1>
      <div className="mb-4 text-black">
        <p>Name: <span className="inline-block w-32">{isLoading ? '\u00A0' : user?.name}</span></p>
        <p>Email: <span className="inline-block w-32">{isLoading ? '\u00A0' : user?.email}</span></p>
      </div>
    </div>
  );
}
