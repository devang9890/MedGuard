import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await loginUser({ email, password });
			const { token, user } = res.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			navigate("/");
		} catch (err) {
			setError(err?.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-white rounded shadow p-6">
				<h1 className="text-2xl font-bold mb-2">MedGuard Login</h1>
				<p className="text-gray-600 mb-6">Use an admin account to manage suppliers.</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Email</label>
						<input
							type="email"
							className="w-full border p-2 rounded"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Password</label>
						<input
							type="password"
							className="w-full border p-2 rounded"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{error && (
						<div className="text-red-600 text-sm">{error}</div>
					)}

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded"
						disabled={loading}
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>
			</div>
		</div>
	);
}
