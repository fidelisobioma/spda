import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //validate token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_URL}/users/verify-token/${token}`);
        const data = await res.json();

        if (res.ok) {
          setValidToken(true);
        } else {
          alert(data.message || "Invalid or expired link.");
          navigate("/login");
        }
      } catch (error) {
        setError(error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, navigate]);
  //reset password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/users/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) navigate("/login");
  };
  // ✅ Step 3: Handle UI conditions
  // if (loading) return <p>Verifying reset link...</p>;

  if (!validToken) return null; // don’t show form if invalid
  return (
    <div className="container mx-auto  p-10 md:my-8">
      <Link to="/" className="text-4xl font-bold text-blue-600">
        SPDA
      </Link>
      <div className="flex justify-center items-center mt-10 md:mt-6">
        <div className="w-full">
          <h1 className="text-center text-3xl font-semibold mb-4">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit} className="md:w-fit m-auto text-center">
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg block w-full md:w-100"
            />
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg block w-full md:w-100"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold mt-8 p-3 rounded-lg block w-full md:w-100 cursor-pointer hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
