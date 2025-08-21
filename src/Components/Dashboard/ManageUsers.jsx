import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrash, FaUserShield, FaUserTie, FaExclamationTriangle } from 'react-icons/fa';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const ManageUsers = () => {

  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { currentUser } = use(AuthContext);

  // Fetch all users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUsers?email=${currentUser.email}`);
      return res.data;
    },
  });

  const updateUserRole = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/updateUserRole`, { id: id, role: role })
      return res.data
    },
    onSuccess: (res, roles) => {
      const { role } = roles;

      if (role == 'admin') {
        Swal.fire({
          icon: 'success', title: 'Success!', text: 'User promoted to Admin', showConfirmButton: false, timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'success', title: 'Success!', text: 'User promoted to Agent', showConfirmButton: false, timer: 1500
        });
      }
      queryClient.invalidateQueries(['allUsers']);
    },
    onError: () => {
      Swal.fire({
        icon: 'error', title: 'Error', text: 'Failed to Update User', showConfirmButton: false, timer: 1500
      });
    }
  });


  const markFraudMutation = useMutation({
    mutationFn: (email) => axiosSecure.patch(`/user/mark-fraud/?email=${email}`),

    onSuccess: () => {
      Swal.fire({
        icon: 'success', title: 'Success!', text: 'Agent marked as Fraud', showConfirmButton: false, timer: 1500
      });
      queryClient.invalidateQueries(['allUsers']);
    },
    onError: () => {
      Swal.fire({
        icon: 'error', title: 'Error', text: 'Failed to Mark Fraud', showConfirmButton: false, timer: 1500
      });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: ({ id, email }) => axiosSecure.delete(`/deleteUser/${id}?email=${email}`),

    onSuccess: () => {
      Swal.fire({
        icon: 'success', title: 'Success!', text: 'User Deleted From Db and firebase', showConfirmButton: false, timer: 1500
      });
      queryClient.invalidateQueries(['allUsers']);
    },

    onError: () => {
      Swal.fire({
        icon: 'error', title: 'Error', text: 'Failed to delete user from DB and Firebase', showConfirmButton: false, timer: 1500
      });
    }
  });

  if (isLoading) return <Loading />
  if (error) return <Error message={error.message} />

  return (

    <div className="card bg-base-100 shadow-xl rounded-xl p-5">
      <div className="card-body">
        <h2 className="card-title my-2">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="text-black font-semibold">
              <tr>
                <th></th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Make Admin</th>
                <th>Make Agent</th>
                <th>Fraud</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src={user.userPhoto}
                        className="w-7 h-7 rounded-full object-cover"
                        alt={user.userName}
                      />
                      <span>{user.userName}</span>
                    </div>
                  </td>
                  <td className='max-w-50 line-clamp-1'>{user.userEmail}</td>
                  <td className="capitalize">{user.isfraud ? 'Fraud' : user.role}</td>
                  <td>
                    {!user.isfraud && user.role !== 'admin' && (
                      <button
                        onClick={() => updateUserRole.mutate({ id: user._id, role: 'admin' })}
                        className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                      >
                        <FaUserShield /> Admin
                      </button>
                    )}
                  </td>
                  <td>
                    {!user.isfraud && user.role !== 'agent' && (
                      <button
                        onClick={() => updateUserRole.mutate({ id: user._id, role: 'agent' })}
                        className="btn btn-xs bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <FaUserTie /> Agent
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === 'agent' && !user.isfraud && (
                      <button
                        onClick={() => markFraudMutation.mutate(user.userEmail)}
                        className="btn btn-xs bg-red-600 text-white hover:bg-red-700"
                      >
                        <FaExclamationTriangle /> Fraud
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        deleteUserMutation.mutate({
                          id: user._id,
                          email: user.userEmail,
                        })
                      }
                      className="btn btn-xs btn-error text-white"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default ManageUsers;
