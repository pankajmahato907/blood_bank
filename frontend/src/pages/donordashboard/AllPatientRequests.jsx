import React, { useEffect, useState } from "react";
import RequestCard from "../../components/RequestCard";
import axios from "axios";

const AllPatientRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const donorBloodGroup = localStorage.getItem("bloodGroup");

    axios
      .get("http://localhost:3000/patients/requests")
      .then((res) => {
        const responseData = res.data.requests || res.data;
        const allRequests = Array.isArray(responseData) ? responseData : [responseData];

        // Filter requests where bloodGroup matches localStorage
        const matchedRequests = allRequests.filter(
          (req) => req.bloodGroup === donorBloodGroup
        );

        setRequests(matchedRequests);
      })
      .catch((err) => console.error("Error fetching patient requests:", err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {requests.length > 0 ? (
        requests.map((req) => (
          <RequestCard key={req._id} request={req} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-600">
          No matching blood group requests found.
        </p>
      )}
    </div>
  );
};

export default AllPatientRequests;
