import { useState } from 'react';
import { useRouter } from 'next/router';
import { PageWrapper } from './PageWrapper';
import { useAuth } from '@/context/AuthContext';
import { FiChevronRight } from 'react-icons/fi';
import { LoginType } from '@/types/AuthTypes';

const LoginForm = () => {
	const [data, setData] = useState<LoginType>({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { logIn } = useAuth();
	const router = useRouter();

	const handleLogin = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			await logIn(data.email, data.password);
			router.push('/dashboard');
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const canSubmit = Object.values(data).every(Boolean);

	return (
		<PageWrapper>
			<div className="flex justify-center items-center">
				<div className="w-full max-w-sm p-4 py-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 sm:py-10 md:p-8 md:py-14 dark:bg-gray-800 dark:border-gray-700">
					<form action="" onSubmit={handleLogin} className="group">
						<h5 className="text-2xl sm:text-3xl font-medium sm:font-semibold text-gray-900 dark:text-white text-center mb-2">
							Đăng Nhập
						</h5>
						<p className="text-center text-gray-500 dark:text-gray-200 text-md mb-8">
							Xin hãy đăng nhập để vào dự án Bybit-Pro
						</p>
						
						{/* Hiển thị thông báo lỗi */}
						{error && (
							<p className="text-center text-red-500">{error}</p>
						)}
						
						{/* Trường email */}
						<div className="mb-5">
							<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Tên đăng nhập
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white placeholder-gray-300"
								autoComplete="off"
								required
								pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								placeholder="name@company.com"
								onChange={(e) => {
									setData({
										...data,
										email: e.target.value,
									});
								}}
							/>
						</div>
						
						{/* Trường mật khẩu */}
						<div className="mb-5">
							<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Mật khẩu
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
								required
								onChange={(e) => {
									setData({
										...data,
										password: e.target.value,
									});
								}}
							/>
						</div>

						{/* Nút Đăng nhập */}
						<button
							type="submit"
							disabled={!canSubmit || loading}
							className={`w-full text-white ${
								loading
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-green-600 hover:bg-green-700'
							} font-medium rounded-lg text-sm px-5 py-3 text-center mb-8 mt-2`}
						>
							{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
						</button>

						
					</form>
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginForm;
