import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';

const ManageProperties = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['PropertiesForAdmin'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties?value=admin');
      return res.data;
    }
  });

  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/property/verify/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success', title: 'Success!', text: 'Property Verified successfully', showConfirmButton: false, timer: 1500
      });
      queryClient.invalidateQueries(['PropertiesForAdmin']);
    },
    onError: () => {
      Swal.fire({
        icon: 'error', title: 'Error', text: 'Failed to Verify property', showConfirmButton: false, timer: 1500
      });
    }
  });


  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/property/reject/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success', title: 'Success!', text: 'Property Rejected successfully', showConfirmButton: false, timer: 1500
      });
      queryClient.invalidateQueries(['PropertiesForAdmin']);
    },
    onError: () => {
      Swal.fire({
        icon: 'error', title: 'Error', text: 'Failed to Reject property', showConfirmButton: false, timer: 1500
      });
    }
  });


  const handleVerify = (id) => verifyMutation.mutate(id);
  const handleReject = (id) => rejectMutation.mutate(id);

  if (isLoading) return <Loading />
  if (error) return <Error message={error.message

  } />

  return (
    <div className="p-5">
      <div className="card bg-base-100 shadow-xl rounded-xl">
        <div className="card-body">
          <h2 className="card-title my-2">Manage Properties</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className=" text-gray-800">
                <tr>
                  <th></th> 
                  <th>Title</th>
                  <th>Agent Name</th>
                  <th>Agent Email</th>
                  <th>Price Range</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td>
                    <td>{property.title}</td>
                    <td>{property.agentName}</td>
                    <td>{property.agentEmail}</td>
                    <td>{property.priceRange}</td>
                    <td>
                      {property.verified ? (
                        <span className="badge badge-success">Verified</span>
                      ) : property.status === 'rejected' ? (
                        <span className="badge badge-error">Rejected</span>
                      ) : (
                        <span className="badge badge-warning">Pending</span>
                      )}
                    </td>
                    <td className="flex gap-2 justify-center">
                      {!property.verified && property.status !== 'rejected' && (
                        <>
                          <button
                            onClick={() => handleVerify(property._id)}
                            className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                          >
                            <FaCheckCircle /> Verify
                          </button>
                          <button
                            onClick={() => handleReject(property._id)}
                            className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                          >
                            <FaTimesCircle /> Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!isLoading && properties.length === 0 && (
              <div className="text-center py-4 text-gray-500">No properties found.</div>
            )} 
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManageProperties;
