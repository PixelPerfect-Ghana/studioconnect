import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { apiLogin } from "../../services/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await apiLogin({ email, password });

      localStorage.setItem("token", response.data?.accessToken);
      localStorage.setItem("role", response.data?.role);
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="log-in flex flex-col justify-center items-center h-screen text-xs bg-cover bg-center"
      style={{ backgroundImage: "url('./src/assets/images/studio2.jpg')" }}
    >
      <div className="max-w-sm w-full bg-transparent shadow-lg rounded-lg p-6 border border-black">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <h1 className="flex justify-center font-extrabold">User Login</h1>
            <p className="flex justify-center font-bold">
              Hey! Enter your details to sign in to your account
            </p>

            <input
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Email"
              required
              name="email"
            />
            <div>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
                required
                name="password"
              />
            </div>

            <span className="font-bold">
              <input type="checkbox" /> Remember me
            </span>
            <button
              type="submit"
              className="flex justify-center bg-green-500 p-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div>
              <span className="flex justify-center mb-4">or sign in with</span>
              <div className="flex font-bold gap-3">
                <button type="button" className="border rounded-md p-2 w-32">
                  <span className="mr-1">
                    <i className="fa-brands fa-google"></i>
                  </span>
                  Google
                </button>
                <button type="button" className="border rounded-md p-2 w-32">
                  <span className="mr-1">
                    <i className="fa-brands fa-apple"></i>
                  </span>
                  AppleID
                </button>
                <button type="button" className="border p-2 rounded-md w-32">
                  <span className="mr-1">
                    <i className="fa-brands fa-facebook"></i>
                  </span>
                  Facebook
                </button>
              </div>
              <div className="flex justify-center mt-8">
                <span>Don't have an account?</span>
                <Link to="/SignupForm">
                  <span className="ml-2 text-green-600 font-extrabold hover:underline">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
