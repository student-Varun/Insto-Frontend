
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://insto-backend-ulnb.onrender.com/api/forgot-password", { email });
      alert("Reset link sent to your email");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send email");
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
        backgroundImage: `url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
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
            Forgot Password
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" mb={2}>
            Enter your email to receive a reset link
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              >
                Send Reset Link
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
