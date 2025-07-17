import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {FaTrash,FaUserShield,FaUserTie,FaExclamationTriangle} from 'react-icons/fa';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';

const ManageUsers = () => {

  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users , isLoading, error } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/getUsers');
      return res.data;
    },
  });

  const updateUserRole = useMutation({
    mutationFn: ({id,role}) => axiosSecure.patch(`/updateUserRole`,{
        id:id, role : role
    }),
    onSuccess: () => {
      Swal.fire('Success', 'User promoted to Admin!', 'success');
      queryClient.invalidateQueries(['allUsers']);
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });


  const markFraudMutation = useMutation({
    mutationFn: (email) => axiosSecure.patch(`/user/mark-fraud/?email=${email}`),
    onSuccess: () => {
      Swal.fire('Marked!', 'Agent marked as fraud.', 'warning');
      queryClient.invalidateQueries(['allUsers']);
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: ({ id, email }) => axiosSecure.delete(`/deleteUser/${id}?email=${email}`),

    onSuccess: (res) => {
      if (res.data.success) {
        Swal.fire('Deleted', 'User removed from DB & Firebase.', 'success');
        queryClient.invalidateQueries(['allUsers']);
      }
    },
    onError: () => {
        Swal.fire('Error', 'Something went wrong.', 'error');
      }
  });

  if(isLoading) return <Loading/>
  if(error) return <Error message={error.message}/>

  return (
    <div className="w-[90%] mx-auto my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-[#fceb00] text-black font-semibold">
            <tr>
              <th>#</th>
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
                      className="w-10 h-10 rounded-full object-cover"
                      alt={user.userName}
                    />
                    <span>{user.userName}</span>
                  </div>
                </td>
                <td>{user.userEmail}</td>
                <td className="capitalize">{user.isfraud ? 'Fraud' : user.role}</td>

                {/* Make Admin */}
                <td>
                  {!user.isfraud && user.role !== 'admin' && (
                    <button
                      onClick={() => updateUserRole.mutate({id:user._id,role:'admin'})}
                      className="btn btn-xs bg-green-600 text-white hover:bg-green-700"
                    >
                      <FaUserShield /> Admin
                    </button>
                  )}
                </td>

                {/* Make Agent */}
                <td>
                  {!user.isfraud && user.role !== 'agent' && (
                    <button
                      onClick={() => updateUserRole.mutate({id:user._id,role:'agent'})}
                      className="btn btn-xs bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <FaUserTie /> Agent
                    </button>
                  )}
                </td>

                {/* Mark Fraud */}
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

                {/* Delete */}
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
  );
};

export default ManageUsers;
