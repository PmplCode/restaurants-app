'use client'

import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email: string): boolean => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, email, password } = registerData;

    if (!fullName || !email || !password) {
      setErrorMessage("All fields are necessary.");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    try {
      const { data: resUserExists } = await axios.post("https://restaurants-app-nine.vercel.app/api/userExists", {
        email,
      });
      if (resUserExists.user) {
        setErrorMessage("User already exists.");
        return;
      }

      const resp = await axios.post("https://restaurants-app-nine.vercel.app/api/register", registerData);
      if (resp.status === 201) {
        const form = e.target as HTMLFormElement;
        form.reset();
        setRegisterData({
          fullName: "",
          email: "",
          password: "",
        });
        router.push("/");
      } else {
        throw new Error("Failed to register user. Please try again.");
      }
    } catch (error) {
      console.log("User registration failed: ", error);
      setErrorMessage("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={handleUserInputs}
            name="fullName"
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={handleUserInputs}
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={handleUserInputs}
            name="password"
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 hover:bg-green-700">
            Register
          </button>

          {errorMessage && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errorMessage}
            </div>
          )}

          <Link className="text-sm mt-3 text-right block" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
