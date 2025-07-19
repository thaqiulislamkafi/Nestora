// Full Featured MyProfile.jsx
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import Swal from 'sweetalert2';

const MyProfile = () => {


  const { currentUser } = use(AuthContext);
  const axiosSecure = useAxios();

  const [editingField, setEditingField] = useState(null);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure(`/getUser?email=${currentUser.email}`);
      return res.data
    }
  });

  console.log(currentUser.email)

  const { mutate: updateUser } = useMutation({
    mutationFn: async (data) => (await axiosSecure.patch('/api/users/update', data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      setEditingField(null);
      Swal.fire({
        icon: 'success', title: 'Success!', text: 'Property Rejected successfully', showConfirmButton: false, timer: 1500
      });
    }
  });

  const startEdit = (field) => {
    setEditingField(field);
    reset({ [field]: user?.[field] || '' });
  };

  const save = (data) => {
    console.log(data)
    updateUser(data)
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const fields = [
    { label: 'Full Name', name: 'userName' },
    { label: 'Email', name: 'userEmail', disabled: true },
    { label: 'User role', name: 'role', type: 'text' },
    { label: 'Blood Group', name: 'bloodGroup' },
    { label: 'Gender', name: 'gender' },
    { label: 'Nationality', name: 'nationality' },
    { label: 'Permanent Address - Thana', name: 'permanentAddress.thana' },
    { label: 'Permanent Address - Post Office', name: 'permanentAddress.postOffice' },
    { label: 'Permanent Address - City', name: 'permanentAddress.city' },
    { label: 'Permanent Address - Division', name: 'permanentAddress.division' },
    { label: 'Present Address - Thana', name: 'presentAddress.thana' },
    { label: 'Present Address - Post Office', name: 'presentAddress.postOffice' },
    { label: 'Present Address - City', name: 'presentAddress.city' },
    { label: 'Present Address - Division', name: 'presentAddress.division' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">My Profile</h2>

      <div className="flex flex-col items-center mb-10">
        <img
          src={user?.userPhoto || 'https://i.ibb.co/2N1hYS0/default-avatar.png'}
          alt="Avatar"
          className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover mb-2"
        />
        <p className="text-lg font-medium text-gray-700">{user?.userName || 'Set your name'}</p>
        <p className="text-gray-500">{user?.userEmail}</p>
      </div>

      <form onSubmit={handleSubmit(save)} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        {fields.map(({ label, name, type = 'text', disabled = false }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {editingField === name ? (
              <div className="flex gap-2">
                <input
                  {...register(name)}
                  defaultValue={name.split('.').reduce((o, i) => o?.[i], user) || ''}
                  type={type}
                  disabled={disabled}
                  className="flex-1 border border-gray-300 px-3 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="bg-[#e6d70c] text-white px-3 py-2 rounded-md hover:bg-[#e6d70c]"><FaSave /></button>
                <button type="button" onClick={() => setEditingField(null)} className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-400"><FaTimes /></button>
              </div>
            ) : (
              <div className="flex justify-between items-center border border-gray-200 rounded-3xl px-4 py-2 bg-gray-50">
                <span className={user?.[name] ? 'text-gray-800' : 'text-gray-500'}>
                  {name.split('.').reduce((o, i) => o?.[i], user) || `Set your ${label.toLowerCase()}`}
                </span>
                {!disabled && (
                  <button type="button" onClick={() => startEdit(name)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                )}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default MyProfile;
