import { useState } from "react";
import { Link, useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed.");

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-10 py-8">
      <Link to="/" className="text-4xl font-bold text-blue-600">
        SPDA
      </Link>
      <div className="flex justify-center items-center mt-10 md:mt-6">
        <div className="w-full">
          <h1 className="text-center text-3xl font-semibold mb-4">
            Welcome to SPDA
          </h1>
          <form onSubmit={handleSubmit} className="md:w-fit m-auto text-center">
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border p-3  rounded-lg block w-full md:w-100"
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg block w-full md:w-100"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg block w-full md:w-100"
            />
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-3 rounded-lg block w-full md:w-100"
              required
            />

            <button
              type="submit"
              className="bg-black text-white font-semibold mt-8 p-3 rounded-lg block w-full md:w-100 cursor-pointer hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
            <div className="my-4">
              Already have an account{" "}
              <Link className="text-blue-500" to="/login">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
