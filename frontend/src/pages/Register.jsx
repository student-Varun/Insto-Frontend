

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://insto-backend-ulnb.onrender.com/api/register-user", form);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/009/690/713/non_2x/white-notepad-and-ink-pen-on-the-wooden-desk-register-now-concept-photo.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
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
          elevation={12}
          sx={{
            padding: { xs: 3, sm: 5 },
            width: "90vw",
            maxWidth: "500px",
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Register
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" mb={2}>
            Create your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required
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
            />
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 5, py: 1.5, borderRadius: 2 }}
              >
                Register
              </Button>
            </Box>
            <Box mt={2} textAlign="center">
              <Button onClick={() => navigate("/")} sx={{ textTransform: "none" }}>
                Already have an account? Login
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
