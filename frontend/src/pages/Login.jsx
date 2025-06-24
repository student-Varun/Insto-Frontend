
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const floatingIcons = [
    "https://cdn-icons-png.flaticon.com/512/919/919827.png", // JS
    "https://cdn-icons-png.flaticon.com/512/732/732190.png", // HTML
    "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // React
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661265944044-bc7248ae54f9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      {/* Floating icons */}
      {floatingIcons.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt={`icon-${i}`}
          initial={{ y: -100 }}
          animate={{ y: [0, 30, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: `${30 + i * 25}px`,
            left: `${10 + i * 30}%`,
            width: "40px",
            height: "40px",
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        <Paper
          elevation={12}
          sx={{
            padding: { xs: 3, sm: 5 },
            borderRadius: 4,
            width: "90vw",
            maxWidth: "450px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Login
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            mb={3}
          >
            Access your account securely
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              variant="outlined"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={handleChange}
              required
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />

            <Box mt={3} display="flex" justifyContent="space-between" flexWrap="wrap">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: "bold",
                    mb: { xs: 2, sm: 0 },
                  }}
                >
                  Login
                </Button>
              </motion.div>

              <Button
                onClick={() => navigate("/forgot-password")}
                sx={{ textTransform: "none" }}
              >
                Forgot Password?
              </Button>
            </Box>

            <Box mt={4} textAlign="center">
              <Typography variant="body2">Don’t have an account?</Typography>
              <Button
                onClick={() => navigate("/register")}
                variant="outlined"
                color="secondary"
                sx={{ mt: 1, px: 4, borderRadius: 2 }}
              >
                Register Now
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
