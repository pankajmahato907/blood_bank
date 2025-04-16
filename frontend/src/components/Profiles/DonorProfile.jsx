import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorProfile = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodGroup: '',
    available: true,
    newPassword: '',
    confirmPassword: '',
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchDonorProfile = async () => {
      const storedEmail = localStorage.getItem('email');
      if (!storedEmail) {
        alert('No email found in local storage!');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/donor/${storedEmail}`);
        setForm((prev) => ({ ...prev, ...res.data }));
      } catch (err) {
        console.error('Error fetching donor profile:', err);
        alert('Failed to fetch donor data');
      }
    };

    fetchDonorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'available') {
      setForm((prev) => ({ ...prev, available: value === 'Yes' }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/donor/${form.email}`, {
        phone: form.phone,
        address: form.address,
        available: form.available,
        password: form.newPassword && form.newPassword === form.confirmPassword ? form.newPassword : undefined
      });
      alert('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally, you can refetch the profile here
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Donor Profile</h2>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input type="text" name="name" value={form.name} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={form.email} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${!editMode && 'bg-gray-100'}`}
            readOnly={!editMode}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${!editMode && 'bg-gray-100'}`}
            readOnly={!editMode}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium">Blood Group</label>
          <input type="text" name="bloodGroup" value={form.bloodGroup} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium">Availability</label>
          <select
            name="available"
            value={form.available ? 'Yes' : 'No'}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${!editMode && 'bg-gray-100'}`}
            disabled={!editMode}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Password fields only in edit mode */}
        {editMode && (
          <>
            <div className="pt-4 border-t">
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {!editMode ? (
            <>
              <button onClick={() => setEditMode(true)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
