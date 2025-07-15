import { useState, useEffect, use } from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import useAxios from '../Hooks/useAxios';
import Error from '../SharedElement/Error';
import Loading from '../SharedElement/Loading';
import { Link } from 'react-router';

const AddedProperties = () => {
  const queryClient = useQueryClient();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const {currentUser} = use(AuthContext) ;
    const  axiosSecure = useAxios() ;


  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['agentProperties'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/uploadedProperties/agent?email=${currentUser.email}`);
      return data;
    }
  });

  
  const { mutate: deleteProperty } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/propertyDelete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['agentProperties']);
      Swal.fire({icon: 'success',title: 'Success!',text: 'Property deleted successfully', showConfirmButton: false,timer: 1500
      });
    },
    onError: () => {
      Swal.fire({icon: 'error',title: 'Error',text: 'Failed to delete property',showConfirmButton: false, timer: 1500
      });
    }
  });


  const { mutate: updateProperty } = useMutation({
    mutationFn: async (updatedProperty) => {
      const { data } = await axiosSecure.put(
        `/api/properties/${updatedProperty._id}`,
        updatedProperty
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['agentProperties']);
      Swal.fire({ icon: 'success',title: 'Success!', text: 'Property updated successfully',showConfirmButton: false,timer: 1500
      });
    },
    onError: () => {
      Swal.fire({icon: 'error',title: 'Error',text: 'Failed to update property',showConfirmButton: false, timer: 1500
      });
    }
  });


  useEffect(() => {
    if (properties) {
      properties.forEach(property => {
        const prices = property.priceRange.replace(/[^\d–]/g, '').split('–');
        setMinPrice(prices[0]);
        setMaxPrice(prices[1]);
      });
    }
  }, [properties]);

  const handleDelete = (id) => {
    Swal.fire({title: 'Are you sure?',text: "You won't be able to revert this!",icon: 'warning',showCancelButton: true,confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
      }
    });
  };

  const handleUpdate = (property) => {
    Swal.fire({
      title: 'Update Property',
      html: `
        <div class="text-left">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Title</label>
            <input id="swal-title" class="swal2-input" value="${property.title}">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Location</label>
            <input id="swal-location" class="swal2-input" value="${property.location}">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Price Range</label>
            <input id="swal-priceRange" class="swal2-input" value="${property.priceRange}">
          </div>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('swal-title').value,
          location: document.getElementById('swal-location').value,
          priceRange: document.getElementById('swal-priceRange').value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        updateProperty({
          ...property,
          title: result.value.title,
          location: result.value.location,
          priceRange: result.value.priceRange
        });
      }
    });
  };

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <Error message={error.message}/>;
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-xl mb-2">🏠</div>
        <p className="text-gray-500">You haven't added any properties yet.</p>
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">My Added Properties</h1>

      <div className="grid grid-cols-1  gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className=" dark:bg-gray-800 rounded-xl shadow-xs overflow-hidden transition-all hover:shadow-lg shadow-amber-300"
          >
            <div className="flex flex-col border-b border-[#e6d70c] lg:flex-row h-full  ">
              {/* Property Image */}
              <div className="  bg-transparent lg:p-4 rounded-xl lg:w-[29.13vw] h-auto">
                <img
                  className="rounded-xl h-60 w-full object-cover"
                  src={property.image}
                  alt={property.title}
                />
              </div>

              {/* Property Details */}
              <div className="p-4 text-gray-700 dark:text-gray-200 flex-1 flex flex-col">
                <div>
                  <p className="poppins my-2 text-xl lg:text-2xl font-bold">
                    {property.title}
                  </p>

                  <div className="flex flex-col gap-2 my-2 text-sm lg:text-base">
                    <span>Location: {property.location}</span>
                    <span className="flex items-center">
                      Verification:{' '}
                      {property.verified === 'verified' ? (
                        <span className="flex items-center text-green-500 ml-1">
                          <FaCheckCircle className="ml-1 mr-1" /> Verified
                        </span>
                      ) : property.verified === 'rejected' ? (
                        <span className="flex items-center text-red-500 ml-1">
                          <FaTimesCircle className="ml-1 mr-1" /> Rejected
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-500 ml-1">
                          Pending
                        </span>
                      )}
                    </span>
                  </div>

                  <p className="font-medium my-2 text-sm lg:text-base">
                    Agent Name:{' '}
                    <span className="text-[#23BE0A] font-bold">
                      {property.agentName}
                    </span>
                  </p>

                  <p className="font-medium my-2 text-sm lg:text-base">
                    Price Range:{' '}
                    <span className="text-[#23BE0A] font-bold">
                      {property.priceRange}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {property.verified !== 'rejected' && (
                    <Link
                      to={`/dashboard/update-property/${property._id}`}
                      className="btn btn-sm  rounded-lg flex"
                    >
                      <FaEdit className="mr-1" /> Update
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="btn btn-sm  rounded-lg flex "
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddedProperties;