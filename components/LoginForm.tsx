"use client";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const rounter = useRouter();

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        ...loginData,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Invalid Credentials");
        return;
      }

      const { user } = await getSession();

      toast.success(`Welcome ${user?.name}!`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      rounter.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 max-w-[90vw]">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              onChange={handleUserInputs}
              type="text"
              name="email"
              placeholder="Email"
            />
            <input
              onChange={handleUserInputs}
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 hover:bg-green-700">
              Login
            </button>
          </div>

          {errorMessage && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errorMessage}
            </div>
          )}

          <Link className="text-sm mt-3 text-right block" href={"/register"}>
            Do not have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
