import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import useAxios from "../Hooks/useAxios";
import Loading from "../SharedElement/Loading";
import Error from "../SharedElement/Error";
import UpdateProfile from "./UpdateProfile";

const MyProfile = () => {
  const { currentUser } = use(AuthContext);
  const axiosSecure = useAxios();

  const [isOpen, setIsOpen] = useState();
  

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure(`/getUser?email=${currentUser.email}`);
      return res.data;
    },
    enabled : !! currentUser?.email 
  });

  const handleOpenModal = ()=>{
    setIsOpen(true) ;
  }

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
    
      <div className="flex flex-col items-center mb-10">
        <img
          src={
            user?.userPhoto ||
            "https://img.icons8.com/?size=80&id=ckaioC1qqwCu&format=png"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover mb-3"
        />
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.userName || "Set your name"}
        </h2>
        <p className="text-gray-500">{user?.userEmail}</p>
        <button onClick={handleOpenModal} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>

     
      <div className="mb-8 p-6 rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-gray-800 font-medium">
              {user?.userName || "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-800 font-medium">
              {user?.userEmail || "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="text-gray-800 font-medium">
              {user?.contact || "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-gray-800 font-medium">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="text-gray-800 font-medium">
              {user?.age || "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">NID Number</p>
            <p className="text-gray-800 font-medium">
              {user?.nid || "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Division</p>
            <p className="text-gray-800 font-medium">
              {user?.division || "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">District</p>
            <p className="text-gray-800 font-medium">
              {user?.district || "Not set"}
            </p>
          </div>
        </div>
      </div>

      {
        isOpen && <>
          <UpdateProfile userData={user} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      }
    </div>
  );
};

export default MyProfile;
