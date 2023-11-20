import React from "react";

const UserProfile = ({params}: any) => {
  return (
    <>
      <div className="min-h-screen">
        <div className="p-4 text-center text-2xl ">Profile</div>
        <p className="text-4xl">Profile page <span className="text-2xl p-2 rounded bg-orange-500 text-black">{params.id}</span></p>
      </div>
    </>
  );
};

export default UserProfile;
