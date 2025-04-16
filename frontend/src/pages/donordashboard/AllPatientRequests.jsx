import React, { useEffect, useState } from "react";
import RequestCard from "../../components/RequestCard";
import axios from "axios";

const AllPatientRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/patients/requests")
      .then((res) => {
        // Support both array and single object responses
        const responseData = res.data.requests || res.data;
        setRequests(Array.isArray(responseData) ? responseData : [responseData]);
      })
      .catch((err) => console.error("Error fetching patient requests:", err));
  }, []); // ✅ Fixed dependency issue

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {requests.map((req) => (
        <RequestCard key={req._id} request={req} />
      ))}
    </div>
  );
};

export default AllPatientRequests;
