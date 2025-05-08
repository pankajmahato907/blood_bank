// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Droplet } from 'lucide-react'; 

// const DonorList = () => {
//   const [donors, setDonors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const res = await axios.get('/donors');
//         setDonors(res.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load donors');
//         setLoading(false);
//       }
//     };

//     fetchDonors();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-white px-6 py-10">
//       <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <div className="flex items-center justify-center mb-6">
//           <Droplet className="text-red-600 w-10 h-10 mr-2" />
//           <h1 className="text-3xl font-bold text-red-700">Available Donors</h1>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading donors...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : donors.length === 0 ? (
//           <p className="text-center text-gray-500">No donors found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-red-300 text-left">
//               <thead className="bg-red-100 text-red-700">
//                 <tr>
//                   <th className="py-2 px-4 border">Name</th>
//                   <th className="py-2 px-4 border">Phone</th>
//                   <th className="py-2 px-4 border">Gender</th>
//                   <th className="py-2 px-4 border">Blood Group</th>
//                   <th className="py-2 px-4 border">Address</th>
//                   <th className="py-2 px-4 border">Email</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {donors.map((donor) => (
//                   <tr key={donor._id} className="hover:bg-red-50">
//                     <td className="py-2 px-4 border">{donor.name}</td>
//                     <td className="py-2 px-4 border">{donor.phone}</td>
//                     <td className="py-2 px-4 border">{donor.gender}</td>
//                     <td className="py-2 px-4 border font-bold text-red-700">{donor.bloodGroup}</td>
//                     <td className="py-2 px-4 border">{donor.address}</td>
//                     <td className="py-2 px-4 border">{donor.email}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonorList;
