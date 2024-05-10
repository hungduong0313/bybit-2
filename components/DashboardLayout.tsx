import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ReactNode } from 'react';

// Phần Header với tên người dùng và nút logout
const Header = () => {
  const { user, logOut } = useAuth(); // Dùng context để lấy thông tin người dùng
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut(); // Xử lý đăng xuất
      router.push('/'); // Chuyển hướng về trang đăng nhập
    } catch (error: any) {
      console.error(error.message); // Xử lý lỗi nếu có
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1>Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>Chào, {user?.email || 'Người dùng'}</span>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-lg">
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

// Phần Footer với các tab điều hướng
const Footer = () => {
  return (
    <footer className="flex justify-around items-center p-4 bg-gray-800 text-white">
      <Link href="/tab1">Tab 1</Link>
      <Link href="/tab2">Tab 2</Link>
      <Link href="/tab3">Tab 3</Link>
    </footer>
  );
};

// Layout cho Dashboard với Header và Footer
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
