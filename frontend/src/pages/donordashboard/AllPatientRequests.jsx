import React, { useEffect, useState } from "react";
import RequestCard from "../../components/RequestCard";
import axios from "axios";

const AllPatientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const donorBloodGroup = localStorage.getItem("bloodGroup");

  useEffect(() => {
    if (!donorBloodGroup) {
      setLoading(false); // Don't fetch if not registered
      return;
    }

    axios
      .get("http://localhost:3000/patients/requests")
      .then((res) => {
        const responseData = res.data.requests || res.data;
        const allRequests = Array.isArray(responseData) ? responseData : [responseData];

        const matchedRequests = allRequests.filter(
          (req) => req.bloodGroup === donorBloodGroup
        );

        setRequests(matchedRequests);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patient requests:", err);
        setLoading(false);
      });
  }, [donorBloodGroup]);

  if (!donorBloodGroup) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-red-500">
          Please register as a donor first to view patient requests.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {requests.length > 0 ? (
        requests.map((req) => (
          <RequestCard key={req._id} request={req} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-600">
          No patient requests found for your blood group ({donorBloodGroup}).
        </p>
      )}
    </div>
  );
};

export default AllPatientRequests;
