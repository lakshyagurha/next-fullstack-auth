"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);


  const onSignup = async () => {
    try {
        setLoading(true)
        const response = await axios.post("/api/users/signup", user).then((res)=>{
            console.log(res.data)
        })
        // console.log("Signup success " + response.data);
        router.push('/login')

    } catch (error: any) {
        console.log("Signup falied", error.message, "hello")
        toast.error(error.message)

    }finally {
        setLoading(false)
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-xl">
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "Signup"
          )}
        </h1>
        <hr />
        <input
          className="input input-bordered w-full max-w-xs mt-2 "
          type="text"
          id="username"
          value={user.username}
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          className="input input-bordered w-full max-w-xs mt-2"
          type="text"
          id="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="input input-bordered w-full max-w-xs mt-2"
          type="text"
          id="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {buttonDisabled ? (
          <button className="btn btn-ghost mt-2">Fill the form</button>
        ) : (
          <button
            onClick={onSignup}
            className="btn btn-active text-white  mt-2"
          >
            Signup
          </button>
        )}
        <Link
          href="/login"
          className="mt-4 text-lg underline text-gray-500 hover:text-white"
        >
          Visit login page
        </Link>
      </div>
    </>
  );
};

export default page;
