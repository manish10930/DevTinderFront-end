// // src/components/Feed.js
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API } from '../utils/constants';

// // Mock data (replace with API call later)
// const mockUsers = [
//   {
//     _id: '1',
//     firstName: 'Manish',
//     email: 'manish@gmail.com',
//     skills: ['Java', 'AI', 'ML'],
//     about: 'This is default about',
//     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s',
//     age: 25,
//     createdAt: '2025-02-18T08:57:31.559Z',
//   },
//   {
//     _id: '2',
//     firstName: 'Priya',
//     email: 'priya@gmail.com',
//     skills: ['React', 'Node.js', 'MongoDB'],
//     about: 'Loves coding and coffee',
//     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8e8Xz8Xz8Xz8Xz8Xz8Xz8Xz8Xz8Xz8Xz8Xz8',
//     age: 28,
//     createdAt: '2025-01-10T10:00:00Z',
//   },
//   {
//     _id: '3',
//     firstName: 'Amit',
//     email: 'amit@gmail.com',
//     skills: ['Python', 'Django', 'AWS'],
//     about: 'Backend wizard',
//     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9e9Xz9Xz9Xz9Xz9Xz9Xz9Xz9Xz9Xz9Xz9Xz9',
//     age: 30,
//     createdAt: '2025-03-01T12:00:00Z',
//   },
// ];

// const Feed = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentCard, setCurrentCard] = useState(null);
//   const cardRef = useRef(null);

//   // Swipe state
//   const [swipePosition, setSwipePosition] = useState({ x: 0, rotate: 0 });
//   const [isDragging, setIsDragging] = useState(false);

//   // Fetch random users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Replace with your API call
//         // const response = await axios.get(`${API}/users/random`, { withCredentials: true });
//         // setUsers(response.data);
//         setUsers(mockUsers); // Using mock data
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching users:', err.response?.data || err.message);
//         setError('Failed to load feed');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Handle swipe gestures
//   const handleDragStart = (e) => {
//     setIsDragging(true);
//     setCurrentCard(e.currentTarget);
//   };

//   const handleDragMove = (e) => {
//     if (!isDragging || !currentCard) return;

//     const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
//     const startX = currentCard.getBoundingClientRect().left;
//     const deltaX = clientX - startX - currentCard.offsetWidth / 2;
//     const rotate = deltaX * 0.1; // Rotate based on swipe distance

//     setSwipePosition({ x: deltaX, rotate });
//   };

//   const handleDragEnd = () => {
//     if (!isDragging || !currentCard) return;

//     const { x } = swipePosition;
//     const threshold = 100; // Minimum distance to trigger swipe

//     if (Math.abs(x) > threshold) {
//       const direction = x > 0 ? 'right' : 'left';
//       console.log(`Swiped ${direction} on user ${users[0]._id}`);
      
//       if (direction === 'right') {
//         console.log(`Liked user ${users[0]._id}`);
//       } else {
//         console.log(`Disliked user ${users[0]._id}`);
//       }

//       // Animate card off-screen
//       setSwipePosition({ x: direction === 'right' ? 1000 : -1000, rotate: direction === 'right' ? 30 : -30 });
//       setTimeout(() => {
//         setUsers((prev) => prev.slice(1)); // Remove swiped user
//         setSwipePosition({ x: 0, rotate: 0 }); // Reset position
//       }, 300); // Match animation duration
//     } else {
//       // Reset position if swipe wasn't far enough
//       setSwipePosition({ x: 0, rotate: 0 });
//     }

//     setIsDragging(false);
//     setCurrentCard(null);
//   };

//   // Manual swipe buttons
//   const swipeLeft = () => {
//     if (users.length > 0) {
//       setSwipePosition({ x: -1000, rotate: -30 });
//       setTimeout(() => {
//         setUsers((prev) => prev.slice(1));
//         setSwipePosition({ x: 0, rotate: 0 });
//       }, 300);
//     }
//   };

//   const swipeRight = () => {
//     if (users.length > 0) {
//       setSwipePosition({ x: 1000, rotate: 30 });
//       setTimeout(() => {
//         setUsers((prev) => prev.slice(1));
//         setSwipePosition({ x: 0, rotate: 0 });
//       }, 300);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-base-200 flex justify-center items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-base-200 flex justify-center items-center">
//         <div className="alert alert-error">
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-200 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8 text-primary">DevTinder Feed</h1>

//         {users.length === 0 ? (
//           <div className="text-center text-lg text-base-content/70">
//             No more developers to swipe. Check back later!
//           </div>
//         ) : (
//           <div className="relative h-[600px] flex justify-center items-center">
//             {/* Top Card */}
//             {users.length > 0 && (
//               <div
//                 ref={cardRef}
//                 className="card bg-base-100 shadow-xl w-full max-w-md absolute transition-all duration-300"
//                 style={{
//                   transform: `translateX(${swipePosition.x}px) rotate(${swipePosition.rotate}deg)`,
//                   zIndex: 10,
//                 }}
//                 onMouseDown={handleDragStart}
//                 onMouseMove={handleDragMove}
//                 onMouseUp={handleDragEnd}
//                 onMouseLeave={handleDragEnd}
//                 onTouchStart={handleDragStart}
//                 onTouchMove={handleDragMove}
//                 onTouchEnd={handleDragEnd}
//               >
//                 <figure>
//                   <img
//                     src={users[0].photoUrl || 'https://via.placeholder.com/150'}
//                     alt={`${users[0].firstName}'s profile`}
//                     className="w-full h-64 object-cover rounded-t-xl"
//                   />
//                 </figure>
//                 <div className="card-body p-6">
//                   <h2 className="card-title text-2xl font-bold text-primary">
//                     {users[0].firstName} {users[0].lastName || ''}, {users[0].age || 'N/A'}
//                   </h2>
//                   <p className="text-base-content/70">{users[0].email}</p>
//                   <p className="mt-2">{users[0].about || 'No description'}</p>
//                   <div className="mt-4">
//                     <h3 className="font-semibold text-lg">Skills</h3>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {users[0].skills && users[0].skills.length > 0 ? (
//                         users[0].skills.map((skill, index) => (
//                           <span key={index} className="badge badge-primary badge-lg">
//                             {skill}
//                           </span>
//                         ))
//                       ) : (
//                         <p className="text-base-content/70">No skills listed</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="badge badge-outline mt-4">
//                     Member since {formatDate(users[0].createdAt || new Date())}
//                   </div>
//                 </div>
//                 {/* Swipe Indicators */}
//                 <div className="absolute top-4 left-4 right-4 flex justify-between opacity-50">
//                   <span
//                     className={`text-3xl font-bold ${
//                       swipePosition.x < 0 ? 'text-error opacity-100' : 'text-error'
//                     }`}
//                   >
//                     Nope
//                   </span>
//                   <span
//                     className={`text-3xl font-bold ${
//                       swipePosition.x > 0 ? 'text-success opacity-100' : 'text-success'
//                     }`}
//                   >
//                     Like
//                   </span>
//                 </div>
//               </div>
//             )}
//             {/* Background Cards (for stacking effect) */}
//             {users.length > 1 && (
//               <div className="card bg-base-100 shadow-md w-full max-w-md absolute scale-95 opacity-75">
//                 <figure>
//                   <img
//                     src={users[1].photoUrl || 'https://via.placeholder.com/150'}
//                     alt="Next user"
//                     className="w-full h-64 object-cover rounded-t-xl"
//                   />
//                 </figure>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex justify-center gap-6 mt-8">
//           <button className="btn btn-circle btn-error btn-lg" onClick={swipeLeft}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <button className="btn btn-circle btn-success btn-lg" onClick={swipeRight}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feed;

// src/components/Feed.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../utils/constants';

const Feed = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const cardRef = useRef(null);

  // Swipe state
  const [swipePosition, setSwipePosition] = useState({ x: 0, rotate: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Fetch random users from API
  useEffect(() => {
   const token = localStorage.getItem("token")
   if(!token){
    navigate("/login")
   }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/user/feed`, {
          withCredentials: true, // Assuming your API requires authentication
        });
        console.log('API Response:', response.data);
        setUsers(response.data.data); // Set the 'data' array from the response
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err.message);
        setError('Failed to load feed');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle swipe gestures
  const handleDragStart = (e) => {
    setIsDragging(true);
    setCurrentCard(e.currentTarget);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !currentCard) return;

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const startX = currentCard.getBoundingClientRect().left;
    const deltaX = clientX - startX - currentCard.offsetWidth / 2;
    const rotate = deltaX * 0.1; // Rotate based on swipe distance

    setSwipePosition({ x: deltaX, rotate });
  };

  const handleDragEnd = () => {
    if (!isDragging || !currentCard) return;

    const { x } = swipePosition;
    const threshold = 100; // Minimum distance to trigger swipe

    if (Math.abs(x) > threshold) {
      const direction = x > 0 ? 'right' : 'left';
      console.log(`Swiped ${direction} on user ${users[0]._id}`);

      if (direction === 'right') {
        console.log(`Liked user ${users[0]._id}`);
      } else {
        console.log(`Disliked user ${users[0]._id}`);
      }

      // Animate card off-screen
      setSwipePosition({ x: direction === 'right' ? 1000 : -1000, rotate: direction === 'right' ? 30 : -30 });
      setTimeout(() => {
        setUsers((prev) => prev.slice(1)); // Remove swiped user
        setSwipePosition({ x: 0, rotate: 0 }); // Reset position
      }, 300); // Match animation duration
    } else {
      // Reset position if swipe wasn't far enough
      setSwipePosition({ x: 0, rotate: 0 });
    }

    setIsDragging(false);
    setCurrentCard(null);
  };

  // Manual swipe buttons
  const swipeLeft = () => {
    if (users.length > 0) {
      setSwipePosition({ x: -1000, rotate: -30 });
      setTimeout(() => {
        setUsers((prev) => prev.slice(1));
        setSwipePosition({ x: 0, rotate: 0 });
      }, 300);
    }
  };

  const swipeRight = () => {
    if (users.length > 0) {
      setSwipePosition({ x: 1000, rotate: 30 });
      setTimeout(() => {
        setUsers((prev) => prev.slice(1));
        setSwipePosition({ x: 0, rotate: 0 });
      }, 300);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">DevTinder Feed</h1>

        {users.length === 0 ? (
          <div className="text-center text-lg text-base-content/70">
            No more developers to swipe. Check back later!
          </div>
        ) : (
          <div className="relative h-[600px] flex justify-center items-center">
            {/* Top Card */}
            {users.length > 0 && (
              <div
                ref={cardRef}
                className="card bg-base-100 shadow-xl w-full max-w-md absolute transition-all duration-300"
                style={{
                  transform: `translateX(${swipePosition.x}px) rotate(${swipePosition.rotate}deg)`,
                  zIndex: 10,
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <figure>
                  <img
                    src={users[0].photoUrl || 'https://via.placeholder.com/150'}
                    alt={`${users[0].firstName}'s profile`}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-2xl font-bold text-primary">
                    {users[0].firstName} {users[0].lastName}, {users[0].age}
                  </h2>
                  <p className="text-base-content/70">{users[0].email || 'No email'}</p>
                  {/* <p className="mt-2">{users[0].about || 'No description'}</p> */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {users[0].skills && users[0].skills.length > 0 ? (
                        users[0].skills.map((skill, index) => (
                          <span key={index} className="badge badge-primary badge-lg">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-base-content/70">No skills listed</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">Details</h3>
                    <div className="stats stats-vertical shadow w-full">
                      <div className="stat p-4">
                        <div className="stat-title">Age</div>
                        <div className="stat-value text-lg">{users[0].age || 'N/A'}</div>
                      </div>
                      <div className="stat p-4">
                        <div className="stat-title">Gender</div>
                        <div className="stat-value text-lg capitalize">{users[0].gender || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="badge badge-outline mt-4">
                    Member since {formatDate(users[0].createdAt || new Date())}
                  </div> */}
                </div>
                {/* Swipe Indicators */}
                <div className="absolute top-4 left-4 right-4 flex justify-between opacity-50">
                  <span
                    className={`text-3xl font-bold ${
                      swipePosition.x < 0 ? 'text-error opacity-100' : 'text-error'
                    }`}
                  >
                    Nope
                  </span>
                  <span
                    className={`text-3xl font-bold ${
                      swipePosition.x > 0 ? 'text-success opacity-100' : 'text-success'
                    }`}
                  >
                    Like
                  </span>
                </div>
              </div>
            )}
            {/* Background Cards (for stacking effect) */}
            {users.length > 1 && (
              <div className="card bg-base-100 shadow-md w-full max-w-md absolute scale-95 opacity-75">
                <figure>
                  <img
                    src={users[1].photoUrl || 'https://via.placeholder.com/150'}
                    alt="Next user"
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                </figure>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="btn btn-circle btn-error btn-lg" onClick={swipeLeft}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="btn btn-circle btn-success btn-lg" onClick={swipeRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;