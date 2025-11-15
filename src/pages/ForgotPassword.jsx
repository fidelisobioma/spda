import { useState } from "react";
import { Link } from "react-router";
const ForgotPassword = () => {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("reset link is sent to your email")
      setEmail("");

    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="container mx-auto  p-10 md:py-8">
      <div className="text-4xl font-bold text-blue-600">SPDA</div>
      <div className="flex justify-center items-center mt-10 md:mt-6">
        <div className="w-full">
          <h1 className="text-center text-3xl font-semibold mb-4 ">
            Reset password
          </h1>
          <form onSubmit={handleSubmit} className="md:w-fit m-auto text-center">
                 {error && <p className="text-red-500">{error}</p>}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-3 rounded-lg block w-full md:w-100"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold mt-8 p-3 rounded-lg block w-full md:w-100 cursor-pointer hover:opacity-90"
              disabled={loading}
            >
             
              {loading ? "Verifying email..." : " Send reset link"}
            </button>
            <div className="my-4">
              <Link className="text-blue-500" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
