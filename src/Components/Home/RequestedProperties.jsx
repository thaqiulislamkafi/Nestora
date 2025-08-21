import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';
import Swal from 'sweetalert2';
import Loading from '../SharedElement/Loading';

const RequestedProperties = () => {
  const axiosSecure = useAxios();
  const { currentUser } = use(AuthContext);
  const queryClient = useQueryClient();

  const { data: requestedOffers, isLoading } = useQuery({
    queryKey: ['requestedProperties'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/agent/requestedOffers?email=${currentUser?.email}`);
      return data;
    }
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ buyerEmail, propertyId, status }) => {
      const { data } = await axiosSecure.patch('/agent/update-offer-status', {
        agentEmail: currentUser?.email,
        buyerEmail,
        propertyId,
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requestedProperties']);
      Swal.fire({ icon: 'success', title: 'Success!', text: 'Offer status updated.' });
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-5 py-10">


      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title my-2">Requested Properties</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className=" text-gray-900 text-base">
                <tr>
                  <th></th>
                  <th>Property Title</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Offered Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requestedOffers.map((offer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{offer.propertyTitle}</td>
                    <td>{offer.buyerName}</td>
                    <td>{offer.buyerEmail}</td>
                    <td>৳ {offer.offerAmount?.toLocaleString()}</td>
                    <td className="font-medium capitalize">
                      {offer.status === 'pending' && (
                        <span className="text-yellow-600">Pending</span>
                      )}
                      {offer.status === 'accepted' && (
                        <span className="text-green-600">Accepted</span>
                      )}
                      {offer.status === 'bought' && (
                        <span className="text-green-600">Bought</span>
                      )}
                      {offer.status === 'rejected' && (
                        <span className="text-red-600">Rejected</span>
                      )}
                    </td>
                    <td>
                      {offer.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                            onClick={() =>
                              updateStatus({
                                buyerEmail: offer.buyerEmail,
                                propertyId: offer.propertyId,
                                status: 'accepted',
                              })
                            }
                          >
                            <FaCheckCircle /> Accept
                          </button>
                          <button
                            className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                            onClick={() =>
                              updateStatus({
                                buyerEmail: offer.buyerEmail,
                                propertyId: offer.propertyId,
                                status: 'rejected',
                              })
                            }
                          >
                            <FaTimesCircle /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="italic text-sm text-gray-400">Action Taken</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RequestedProperties;
