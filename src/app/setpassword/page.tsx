"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [password, setpassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passCheck, setPassCheck] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userid, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setNewPassword = async () => {
    try {
      axios.post("/api/users/setpassword", { token }).then((res: any) => {
        console.log(res.data.message);
        if (res.data.success) {
          setStatus(res.data.message);
          setUserId(res.data.userId);
        } else {
          setError(true);
        }
      });
    } catch (error: any) {
      setError(true);
      console.log(error);
      console.log(error.response.data);
    }
  };

  const updatePassword = async () => {
    try {
      if (password !== rePassword) {
        setPassCheck(false);
      } else {
        setLoading(true);
        axios
          .post("/api/users/updatepassword", { password, userid })
          .then((res) => {
            console.log(res.data.message);
            router.push('/login')

          });
        console.log("it worked");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (password.length > 0 && rePassword.length > 0) {
      if (password === rePassword) {
        setPassCheck(true);
        setButtonDisabled(true);
      }
    } else {
      setPassCheck(false);
      setButtonDisabled(true);
    }
  }, [rePassword]);

  useEffect(() => {
    const urltoken = window.location.search.split("=")[1];
    setToken(urltoken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) setNewPassword();
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {error && (
        <div className="bg-red-500 text-4xl">Sorry something went wrong</div>
      )}
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        "login"
      )}
      {status && (
        <div>
          <div>{status}</div>
          <input
            className="input input-bordered w-full max-w-xs mt-2"
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            className="input input-bordered w-full max-w-xs mt-2"
            type="text"
            id="password"
            value={rePassword}
            placeholder="Re Enter Password"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
      )}
      {buttonDisabled &&
        (passCheck ? (
          <button className="btn" onClick={updatePassword}>
            update
          </button>
        ) : (
          <button className="btn">Please check password </button>
        ))}
    </div>
  );
};

export default Page;
