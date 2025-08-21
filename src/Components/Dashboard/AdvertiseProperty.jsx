import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';

const AdvertiseProperty = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

 
  const { data: properties , isLoading,error } = useQuery({
    queryKey: ['verifiedProperties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties');
      return res.data;
    }
  });

  const { mutate: advertiseProperty } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/property/advertise/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Property marked for advertisement.', 'success');
      queryClient.invalidateQueries(['verifiedProperties']);
    },
    onError: () => {
      Swal.fire({icon: 'error',title: 'Error',text: 'Failed to Advertise Property',showConfirmButton: false, timer: 1500
      });
    }  
  });

  if (isLoading) return <Loading/>;
  if(error) return <Error message={error.message}/>

  return (
    <div className="card bg-base-100 shadow-xl rounded-xl p-5">
    <div className="card-body">
      <h2 className="card-title my-2">Advertise Property</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className=" text-gray-900 text-base">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties
              .filter((p) => !p.isAdvertised)
              .map((property) => (
                <tr key={property._id}>
                  <td>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-12 w-16 object-cover rounded"
                    />
                  </td>
                  <td>{property.title}</td>
                  <td>{property.priceRange}</td>
                  <td>{property.agentName}</td>
                  <td>
                    <button
                      onClick={() => advertiseProperty(property._id)}
                      className="btn btn-sm bg-[#fceb00] text-gray-900 rounded-xl hover:bg-yellow-500"
                    >
                      Advertise
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

export default AdvertiseProperty;
