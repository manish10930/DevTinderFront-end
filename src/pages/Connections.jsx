// src/components/Connections.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../utils/constants';

const Connections = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch connections from API
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`${API}/user/connections`, {
          withCredentials: true, // Cookie-based authentication
        });
        console.log('Connections API Response:', response.data);
        setConnections(response.data.data); // Set the 'data' array from the response
        setLoading(false);
      } catch (err) {
        console.error('Error fetching connections:', err.response?.data || err.message);
        setError('Failed to load connections');
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  // Format date (if needed later)
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
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-10 text-primary">
          Your DevTinder Connections
        </h1>

        {connections.length === 0 ? (
          <div className="text-center text-lg text-base-content/70">
            You haven’t made any connections yet. Start swiping on the Feed!
            <div className="mt-4">
              <Link to="/feed" className="btn btn-primary">
                Go to Feed
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((user) => (
              <div
                key={user?._id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl"
              >
                {/* User Photo */}
                <figure className="relative">
                  <img
                    src={user?.photoUrl || 'https://via.placeholder.com/150'}
                    alt={`${user?.firstName} ${user?.lastName || ''}`}
                    className="w-full h-48 object-cover"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {/* Name Overlay */}
                  <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                    {user?.firstName} {user?.lastName || ''}, {user?.age || 'N/A'}
                  </h2>
                </figure>

                {/* Card Body */}
                <div className="card-body p-4">
                  {/* Skills */}
                  <div className="mt-2">
                    <h3 className="font-semibold text-lg text-primary">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user?.skills && user?.skills.length > 0 ? (
                        user.skills.map((skill, index) => (
                          <span key={index} className="badge badge-secondary badge-md">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-base-content/70">No skills listed</p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4">
                    <div className="stats shadow">
                      <div className="stat">
                        <div className="stat-title">Gender</div>
                        <div className="stat-value text-lg capitalize">{user?.gender || 'N/A'}</div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Age</div>
                        <div className="stat-value text-lg">{user?.age || 'N/A'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="card-actions mt-4">
                    <Link
                      to={`/messages/${user?._id}`}
                      className="btn btn-primary w-full"
                    >
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;