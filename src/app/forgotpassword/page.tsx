"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const verifyemail = async () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      try {
        setLoading(true);
        await axios.post("/api/users/forgotpassword", { email }).then((res) => {
          console.log(res.data);
          setMessage(res.data.message);
        });
      } catch (error: any) {
        console.log("Something went wrong! please try again later");
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("invalid email");
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [email]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        "Signup"
      )}
      <div className="text text-2xl">
        {message.length > 0
          ? message
          : "Please Enter you Regiestered email address"}
      </div>
      <input
        className="input input-bordered w-full max-w-xs mt-4"
        type="text"
        id="email"
        value={email}
        placeholder="Registered email id"
        onChange={(e) => setEmail(e.target.value)}
      />
      {buttonDisabled ? (
        <button onClick={verifyemail} className="btn mt-4">
          {" "}
          Submit{" "}
        </button>
      ) : (
        <button className="btn mt-4 btn-disabled"> Submit </button>
      )}
    </div>
  );
};

export default page;
