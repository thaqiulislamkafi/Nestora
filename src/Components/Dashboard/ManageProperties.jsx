import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from '../SharedElement/Loading';
import Error from '../Error/Error';

const ManageProperties = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: properties , isLoading , error } = useQuery({
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
      Swal.fire('Verified!', 'Property marked as verified.', 'success');
      queryClient.invalidateQueries(['PropertiesForAdmin']);
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });

  
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/property/reject/${id}`);
    },
    onSuccess: () => {
      Swal.fire('Rejected!', 'Property has been rejected.', 'info');
      queryClient.invalidateQueries(['PropertiesForAdmin']);
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });


  const handleVerify = (id) => verifyMutation.mutate(id);
  const handleReject = (id) => rejectMutation.mutate(id);

  if(isLoading) return <Loading/>
  if(error) return <Error/>

  return (
    <div className="p-6">
      

      <div className="overflow-x-auto rounded-xl shadow  min-w-6xl">
      <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6">Manage Properties</h1>
        <table className="table table-zebra">
          <thead className="bg-[#fceb00] text-gray-800">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Agent Name</th>
              <th>Agent Email</th>
              <th>Price Range</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr  key={property._id}>
                <td >{index + 1}</td>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>{property.agentName}</td>
                <td>{property.agentEmail}</td>
                <td>{property.priceRange}</td>
                <td>
                  {property.verified  ? (
                    <span className="badge badge-success">Verified</span>
                  ) : property.status == 'rejected' ? (
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
                        className="btn btn-success btn-xs"
                      >
                        <FaCheckCircle /> Verify
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        className="btn btn-error btn-xs"
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
        {isLoading && <div className="text-center py-4 text-gray-500">Loading...</div>}
        {!isLoading && properties.length === 0 && (
          <div className="text-center py-4 text-gray-500">No properties found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;
