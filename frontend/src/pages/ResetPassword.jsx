

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function ResetPassword() {
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://insto-backend-ulnb.onrender.com/api/reset-password", {
        ...form,
        token,
      });
      alert("Password reset successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Optional overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(6px)",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 2 }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: { xs: 3, sm: 5 },
            width: "90vw",
            maxWidth: "450px",
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" mb={2}>
            Enter your new password below
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 5, py: 1.5, borderRadius: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
