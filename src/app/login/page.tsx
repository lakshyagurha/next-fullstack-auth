"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user).then((res) => {
        console.log(res.data);
        toast.success("login success");
        router.push("/profile");
      });
    } catch (error: any) {
      console.log("login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-xl">
          {" "}
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "login"
          )}
        </h1>
        <hr />
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
          <button onClick={onLogin} className="btn mt-2">
            Logindf
          </button>
        ) : (
          <button
            className="btn btn-disabled"
            role="button"
            aria-disabled="true"
          >
            Login
          </button>
        )}
        <Link
          href="/signup"
          className="mt-4 text-lg underline text-gray-500 hover:text-white"
        >
          Visit Signup Page
        </Link>
      </div>
    </>
  );
};

export default Page;
