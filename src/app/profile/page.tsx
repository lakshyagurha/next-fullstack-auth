"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async()=>{

        try{
            await axios.get("/api/users/logout").then((res)=>{
                toast.success("Logout successfull");
                router.push("/login")


            })
             
        } catch (error: any){
            console.log(error.message)

            toast.error(error.message)
        }

    }

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/me').then((res)=>{
            setData(res.data.data._id)
        })
    }
  return (
    <>
      <div className="min-h-screen ">
        <div className="p-4 text-center text-2xl ">Profile</div>
        <h2 className="text-center ">{data==="nothing" ? "nothing": <Link href={`/profile/${data}`}>{data}</Link> }</h2>
        <div className="text-center mt-4">
        <button className="btn m-2 " onClick={getUserDetails}>get User Details</button>


        <button className="btn m-2 " onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
