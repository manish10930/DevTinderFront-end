// // src/components/Profile.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { API } from '../utils/constants';
// import { jwtDecode } from 'jwt-decode';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // Sample user data based on your schema (replace with actual data from your backend)
// const sampleUser = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@example.com',
//   age: 25,
//   gender: 'male',
//   dateOfBirth: '1998-05-15',
//   photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s',
//   about: 'Full-stack developer with a passion for creating innovative solutions',
//   skills: ['React', 'Node.js', 'MongoDB'],
//   createdAt: '2024-01-15T10:00:00Z'
// };

// const Profile = () => {

//   const [userId, setUserId] = useState("");
//   const navigate = useNavigate()

//   const [userData,setUserData]=useState("")

 
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('Token from localStorage:', token);

//     if (!token) {
//       setError('No token found. Please log in.');
//       setLoading(false);
//       navigate('/login');
//       return;
//     }

//     // Make the API call with credentials to send cookies
//     axios
//       .get(`${API}/profile/view/`, {
//         withCredentials: true, // Enable sending cookies with the request
//       })
//       .then((res) => {
//         console.log('Response data:', res.data);
//         setUserData(res.data.data); // Access the filtered user data
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching profile:', err.response?.data || err.message);
//         setError('Failed to load profile');
//         setLoading(false);
//         navigate('/login');
//       });
//   }, [navigate]);
//   // In a real app, you'd fetch this data from your backend or props
//   const user = sampleUser;


//   console.log("userData-->",userData )

//   // try {
//   //   axios.get(`${API}/profile/view/`).then((res) => {
//   //     console.log(res.data)
//   //     setUser(res.data)
//   //   })
//   // } catch (err) {
//   //   console.log("error--->", err)
//   // }

//   // Format date
  
 
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-base-200 py-12">
//       <div className="container mx-auto px-4">
//         <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
//           <div className="card-body">
//             {/* Profile Header */}
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <div className="avatar">
//                 <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                   <img src={user.photoUrl} alt={`${user.firstName}'s profile`} />
//                 </div>
//               </div>
//               <div className="text-center md:text-left">
//                 <h1 className="text-3xl font-bold">
//                   {user.firstName} {user.lastName}
//                 </h1>
//                 <p className="text-sm text-base-content/70">{user.email}</p>
//                 <div className="badge badge-primary mt-2">
//                   Member since {formatDate(user.createdAt)}
//                 </div>
//               </div>
//             </div>

//             {/* Profile Details */}
//             <div className="divider" />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               {/* Left Column */}
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-lg">About Me</h3>
//                   <p className="text-base-content/70">{user.about}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg">Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {user.skills.map((skill, index) => (
//                       <span key={index} className="badge badge-outline badge-lg">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-lg">Details</h3>
//                   <div className="stats stats-vertical shadow w-full">
//                     <div className="stat p-4">
//                       <div className="stat-title">Age</div>
//                       <div className="stat-value text-lg">{user.age}</div>
//                     </div>
//                     <div className="stat p-4">
//                       <div className="stat-title">Gender</div>
//                       <div className="stat-value text-lg capitalize">{user.gender}</div>
//                     </div>
//                     <div className="stat p-4">
//                       <div className="stat-title">Date of Birth</div>
//                       <div className="stat-value text-lg">
//                         {formatDate(user.dateOfBirth)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="divider" />
//             <div className="card-actions justify-center gap-4">
//               <Link to="/edit-profile" className="btn btn-primary">
//                 Edit Profile
//               </Link>
//               <button className="btn btn-outline btn-secondary">
//                 Connect
//               </button>
//               <Link to="/messages" className="btn btn-outline">
//                 Message
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../utils/constants';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State for fetched user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      navigate('/login');
      return;
    }

    // Fetch user profile from API
    axios
      .get(`${API}/profile/view/`, {
        withCredentials: true, // Enable sending cookies with the request
      })
      .then((res) => {
        console.log('Response data:', res.data);
        setUserData(res.data.data); // Set the fetched user data
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err.response?.data || err.message);
        setError(err.response?.data || 'Failed to load profile');
        setLoading(false);
        navigate('/login');
      });
  }, [navigate]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-12 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-base-200 py-12 flex justify-center items-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // Ensure userData is available before rendering
  if (!userData) {
    return null; // Or a fallback UI
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
          <div className="card-body">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={userData.photoUrl || 'https://via.placeholder.com/150'}
                    alt={`${userData.firstName}'s profile`}
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">
                  {userData.firstName} {userData.lastName || ''} {/* lastName is missing in your data */}
                </h1>
                <p className="text-sm text-base-content/70">{userData.email}</p>
                <div className="badge badge-primary mt-2">
                  Member since {formatDate(userData.createdAt || new Date())}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="divider" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">About Me</h3>
                  <p className="text-base-content/70">{userData.about || 'No description'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills && userData.skills.length > 0 ? (
                      userData.skills.map((skill, index) => (
                        <span key={index} className="badge badge-outline badge-lg">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-base-content/70">No skills listed</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Details</h3>
                  <div className="stats stats-vertical shadow w-full">
                    <div className="stat p-4">
                      <div className="stat-title">Age</div>
                      <div className="stat-value text-lg">{userData.age || 'N/A'}</div>
                    </div>
                    <div className="stat p-4">
                      <div className="stat-title">Gender</div>
                      <div className="stat-value text-lg capitalize">{userData.gender || 'N/A'}</div>
                    </div>
                    <div className="stat p-4">
                      <div className="stat-title">Date of Birth</div>
                      <div className="stat-value text-lg">
                        {userData.dateOfBirth ? formatDate(userData.dateOfBirth) : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="divider" />
            <div className="card-actions justify-center gap-4">
              <Link to="/edit-profile" className="btn btn-primary">
                Edit Profile
              </Link>
              <button className="btn btn-outline btn-secondary">Connect</button>
              <Link to="/messages" className="btn btn-outline">
                Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;