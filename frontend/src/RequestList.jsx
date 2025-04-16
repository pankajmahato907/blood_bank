import React, { useEffect, useState } from "react";
import RequestCard from "./components/RequestCard";
import axios from "axios";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const data = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/${data}`)
      .then((res) => {
        // Check if 'requests' is an array or single object
        const responseData = res.data.requests || res.data;
        setRequests(Array.isArray(responseData) ? responseData : [responseData]); // Ensure it is always an array
      })
      .catch((err) => console.error(err));
  }, [data]);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* Map over requests, ensuring it's always treated as an array */}
      {requests.map((req) => (
        <RequestCard key={req._id} request={req} />
      ))}
    </div>
  );
};

export default RequestList;
