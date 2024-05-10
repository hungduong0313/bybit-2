import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout'; // Bố cục của trang

const Dashboard = () => {
  const { user } = useAuth(); // Lấy trạng thái người dùng từ AuthContext
  const router = useRouter(); // Dùng để chuyển hướng

  useEffect(() => {
    if (!user) { // Nếu người dùng chưa đăng nhập
      router.push('/'); // Chuyển hướng đến trang đăng nhập
    }
  }, [user, router]); // Kiểm tra khi trạng thái người dùng thay đổi

  if (!user) {
    return <p>Loading...</p>; // Hoặc hiển thị thông báo nào đó trong khi chuyển hướng
  }

  return (
    <DashboardLayout>
      <h1>Welcome to the Dashboard!</h1> {/* Nội dung của trang dashboard */}
    </DashboardLayout>
  );
};

export default Dashboard;
