import { Home, Login, Register, Dashboard } from './pages';

import { Layout } from './components';

import { Routes, Route } from 'react-router-dom';

export default function Router() {
	return (
		<Layout>	
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Layout>
	)
};