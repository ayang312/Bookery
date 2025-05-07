import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import UserManagement from "../admin/UserManagement";
import TimeSlotManagement from "../admin/TimeSlotManagement";
import AppointmentTracking from "../admin/AppointmentTracking";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Logout button
  const handleLogout = async () => {
    try {
      // Dispatch logout action from authSlice
      dispatch(logout());
      // Redirect back to homepage
      navigate("/");
      // Show alert message
      alert("Successfully logged out!");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      {/* User Management */}
      <UserManagement />

      {/* Time Slot Management */}
      <TimeSlotManagement />

      {/* Appointment Tracking/Management */}
      <AppointmentTracking />

      {/* Analytics Dashboard */}

      {/* Button to Logout */}
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Admin;
