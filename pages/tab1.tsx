import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const Tab1 = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout>
      <h2>Đây là nội dung của Tab 1 của <span>{user?.email}</span></h2>
    </DashboardLayout>
  );
};

export default Tab1;
