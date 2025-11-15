import { useState } from "react";
import { Link, useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //handle submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto  p-10 md:py-8">
      <Link to="/" className="text-4xl font-bold text-blue-600">
        SPDA
      </Link>
      <div className="flex justify-center items-center mt-10 md:mt-6">
        <div className="w-full">
          <h1 className="text-center text-3xl font-semibold mb-6 ">
            Sign in to SPDA
          </h1>
          <form onSubmit={handleSubmit} className="md:w-fit m-auto text-center">
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-3 rounded-lg block w-full md:w-100"
            />
            <br />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-3 rounded-lg block w-full md:w-100"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold mt-8 p-3 rounded-lg block w-full md:w-100 cursor-pointer hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="my-4">
              <Link className="text-blue-500 " to="/forgotpassword">
                Reset password
              </Link>
            </div>
            <div>
              No account?{" "}
              <Link className="text-blue-500" to="/register">
                Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
