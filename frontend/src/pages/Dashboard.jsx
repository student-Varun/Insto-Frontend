
// import { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Box,
//   TextField,
//   Paper,
//   Card,
//   CardContent,
//   IconButton,
//   CardActions,
//   Grid,
// } from "@mui/material";
// import { ThumbUp, ThumbDown, Comment, Delete } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ content: "", image: null });
//   const [preview, setPreview] = useState(null);
//   const [posts, setPosts] = useState([]);

//   // Fetch posts from backend
//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/posts");
//       setPosts(res.data);
//     } catch (error) {
//       console.error("Failed to fetch posts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(); // initial load
//     const interval = setInterval(fetchPosts, 10000); // every 10s
//     return () => clearInterval(interval);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       const file = files[0];
//       setForm({ ...form, image: file });
//       if (file) setPreview(URL.createObjectURL(file));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.content || !form.image) {
//       alert("Please add content and image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("content", form.content);
//     formData.append("image", form.image);

//     try {
//       const response = await axios.post("http://localhost:8000/api/posts", formData);
//       const newPost = response.data;
//       setPosts([newPost, ...posts]);
//       setForm({ content: "", image: null });
//       setPreview(null);
//     } catch (error) {
//       console.error("Error uploading post:", error);
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.patch(`http://localhost:8000/api/posts/${id}/like`);
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === id ? { ...post, likes: res.data.likes, dislikes: res.data.dislikes } : post
//         )
//       );
//     } catch (err) {
//       console.error("Like failed", err);
//     }
//   };

//   const handleDislike = async (id) => {
//     try {
//       const res = await axios.patch(`http://localhost:8000/api/posts/${id}/dislike`);
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === id ? { ...post, likes: res.data.likes, dislikes: res.data.dislikes } : post
//         )
//       );
//     } catch (err) {
//       console.error("Dislike failed", err);
//     }
//   };

//   const handleDelete = (id) => {
//     setPosts((prev) => prev.filter((post) => post._id !== id));
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#DADBDC",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             My Dashboard
//           </Typography>
//           <Button color="inherit" onClick={logout}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth={false} disableGutters sx={{ mt: 4, px: 3 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={3}>
//             <Paper
//               sx={{
//                 p: 3,
//                 minHeight: 280,
//                 boxShadow: 3,
//                 borderRadius: 2,
//                 backgroundColor: "white",
//               }}
//             >
//               <Typography variant="h6" gutterBottom>
//                 Upload Your Post
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 <TextField
//                   label="What's on your mind?"
//                   name="content"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={form.content}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                 />
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 >
//                   Upload Image
//                   <input
//                     type="file"
//                     hidden
//                     name="image"
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                 >
//                   Add Post
//                 </Button>
//               </form>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={9}>
//             <Grid container spacing={3}>
//               {posts.map((post) => (
//                 <Grid item xs={12} sm={6} md={4} key={post._id}>
//                   <Card
//                     sx={{
//                       borderRadius: 2,
//                       boxShadow: 6,
//                       backgroundColor: "#fff",
//                     }}
//                   >
//                     {post.imageUrl && (
//                       <img
//                         src={post.imageUrl}
//                         alt="Uploaded"
//                         style={{
//                           width: "100%",
//                           height: 200,
//                           objectFit: "cover",
//                           borderTopLeftRadius: 8,
//                           borderTopRightRadius: 8,
//                         }}
//                       />
//                     )}
//                     <CardContent>
//                       <Typography variant="subtitle1">
//                         {post.content}
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <IconButton onClick={() => handleLike(post._id)}>
//                         <ThumbUp />
//                         <Typography variant="body2" ml={0.5}>
//                           {post.likes}
//                         </Typography>
//                       </IconButton>
//                       <IconButton onClick={() => handleDislike(post._id)}>
//                         <ThumbDown />
//                         <Typography variant="body2" ml={0.5}>
//                           {post.dislikes}
//                         </Typography>
//                       </IconButton>
//                       <IconButton>
//                         <Comment />
//                         <Typography variant="body2" ml={0.5}>
//                           Comment
//                         </Typography>
//                       </IconButton>
//                       <IconButton onClick={() => handleDelete(post._id)}>
//                         <Delete />
//                       </IconButton>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>

//       <Box
//         component="footer"
//         sx={{
//           py: 2,
//           backgroundColor: "#191B1B",
//           color: "white",
//           textAlign: "center",
//           mt: 40,
//         }}
//       >
//         <Typography variant="body2">
//           &copy; {new Date().getFullYear()}  All rights reserved by Varun Trikha.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }


// import { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Box,
//   TextField,
//   Paper,
//   Card,
//   CardContent,
//   IconButton,
//   CardActions,
//   Grid,
// } from "@mui/material";
// import {
//   ThumbUp,
//   ThumbDown,
//   Comment,
//   Delete,
//   Edit,
//   Save,
//   Cancel,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ content: "", image: null });
//   const [preview, setPreview] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [commentText, setCommentText] = useState({});
//   const [editingComment, setEditingComment] = useState({});

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/posts");
//       setPosts(res.data);
//     } catch (error) {
//       console.error("Failed to fetch posts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//     const interval = setInterval(fetchPosts, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       const file = files[0];
//       setForm({ ...form, image: file });
//       if (file) setPreview(URL.createObjectURL(file));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleCommentChange = (postId, value) => {
//     setCommentText((prev) => ({ ...prev, [postId]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.content || !form.image) {
//       alert("Please add content and image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("content", form.content);
//     formData.append("image", form.image);

//     try {
//       const response = await axios.post("http://localhost:8000/api/posts", formData);
//       const newPost = response.data;
//       setPosts([newPost, ...posts]);
//       setForm({ content: "", image: null });
//       setPreview(null);
//     } catch (error) {
//       console.error("Error uploading post:", error);
//     }
//   };

//   const handleLike = async (id) => {
//     try {
//       const res = await axios.patch(`http://localhost:8000/api/posts/${id}/like`);
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === id ? { ...post, likes: res.data.likes, dislikes: res.data.dislikes } : post
//         )
//       );
//     } catch (err) {
//       console.error("Like failed", err);
//     }
//   };

//   const handleDislike = async (id) => {
//     try {
//       const res = await axios.patch(`http://localhost:8000/api/posts/${id}/dislike`);
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === id ? { ...post, likes: res.data.likes, dislikes: res.data.dislikes } : post
//         )
//       );
//     } catch (err) {
//       console.error("Dislike failed", err);
//     }
//   };

//   const handleDelete = (id) => {
//     setPosts((prev) => prev.filter((post) => post._id !== id));
//   };

//   const handleAddComment = async (postId) => {
//     const text = commentText[postId]?.trim();
//     if (!text) return;
//     try {
//       const res = await axios.post(`http://localhost:8000/api/posts/${postId}/comments`, {
//         text,
//       });
//       const updatedComment = res.data;
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === postId
//             ? { ...post, comments: [...(post.comments || []), updatedComment] }
//             : post
//         )
//       );
//       setCommentText((prev) => ({ ...prev, [postId]: "" }));
//     } catch (err) {
//       console.error("Comment add failed", err);
//     }
//   };

//   const handleEditComment = async (postId, commentId, newText) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:8000/api/posts/${postId}/comments/${commentId}`,
//         { text: newText }
//       );
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === postId
//             ? {
//                 ...post,
//                 comments: post.comments.map((c) =>
//                   c._id === commentId ? res.data : c
//                 ),
//               }
//             : post
//         )
//       );
//       setEditingComment((prev) => ({ ...prev, [commentId]: null }));
//     } catch (err) {
//       console.error("Edit failed", err);
//     }
//   };

//   const handleDeleteComment = async (postId, commentId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/posts/${postId}/comments/${commentId}`);
//       setPosts((prev) =>
//         prev.map((post) =>
//           post._id === postId
//             ? {
//                 ...post,
//                 comments: post.comments.filter((c) => c._id !== commentId),
//               }
//             : post
//         )
//       );
//     } catch (err) {
//       console.error("Delete comment failed", err);
//     }
//   };

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#DADBDC", display: "flex", flexDirection: "column" }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>My Dashboard</Typography>
//           <Button color="inherit" onClick={logout}>Logout</Button>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth={false} disableGutters sx={{ mt: 4, px: 3 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={3}>
//             <Paper sx={{ p: 3, minHeight: 280, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
//               <Typography variant="h6" gutterBottom>Upload Your Post</Typography>
//               <form onSubmit={handleSubmit}>
//                 <TextField
//                   label="What's on your mind?"
//                   name="content"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={form.content}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                 />
//                 <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
//                   Upload Image
//                   <input type="file" hidden name="image" accept="image/*" onChange={handleChange} />
//                 </Button>
//                 <Button type="submit" variant="contained" color="primary" fullWidth>Add Post</Button>
//               </form>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={9}>
//             <Grid container spacing={3}>
//               {posts.map((post) => (
//                 <Grid item xs={12} sm={6} md={4} key={post._id}>
//                   <Card sx={{ borderRadius: 2, boxShadow: 6, backgroundColor: "#fff" }}>
//                     {post.imageUrl && (
//                       <img
//                         src={post.imageUrl}
//                         alt="Uploaded"
//                         style={{
//                           width: "100%",
//                           height: 200,
//                           objectFit: "cover",
//                           borderTopLeftRadius: 8,
//                           borderTopRightRadius: 8,
//                         }}
//                       />
//                     )}
//                     <CardContent>
//                       <Typography variant="subtitle1">{post.content}</Typography>

//                       {/* Comments Section */}
//                       <Box mt={2}>
//                         {(post.comments || []).map((comment) => (
//                           <Box key={comment._id} display="flex" alignItems="center" mb={1}>
//                             {editingComment[comment._id] ? (
//                               <>
//                                 <TextField
//                                   size="small"
//                                   fullWidth
//                                   value={editingComment[comment._id]}
//                                   onChange={(e) =>
//                                     setEditingComment((prev) => ({
//                                       ...prev,
//                                       [comment._id]: e.target.value,
//                                     }))
//                                   }
//                                 />
//                                 <IconButton
//                                   onClick={() =>
//                                     handleEditComment(post._id, comment._id, editingComment[comment._id])
//                                   }
//                                 >
//                                   <Save fontSize="small" />
//                                 </IconButton>
//                                 <IconButton
//                                   onClick={() =>
//                                     setEditingComment((prev) => ({ ...prev, [comment._id]: null }))
//                                   }
//                                 >
//                                   <Cancel fontSize="small" />
//                                 </IconButton>
//                               </>
//                             ) : (
//                               <>
//                                 <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                                   {comment.text}
//                                 </Typography>
//                                 <IconButton
//                                   onClick={() =>
//                                     setEditingComment((prev) => ({
//                                       ...prev,
//                                       [comment._id]: comment.text,
//                                     }))
//                                   }
//                                 >
//                                   <Edit fontSize="small" />
//                                 </IconButton>
//                                 <IconButton
//                                   onClick={() => handleDeleteComment(post._id, comment._id)}
//                                 >
//                                   <Delete fontSize="small" />
//                                 </IconButton>
//                               </>
//                             )}
//                           </Box>
//                         ))}

//                         {/* Add comment */}
//                         <TextField
//                           size="small"
//                           fullWidth
//                           placeholder="Add a comment"
//                           value={commentText[post._id] || ""}
//                           onChange={(e) => handleCommentChange(post._id, e.target.value)}
//                           sx={{ mt: 1 }}
//                         />
//                         <Button
//                           size="small"
//                           onClick={() => handleAddComment(post._id)}
//                           sx={{ mt: 1 }}
//                         >
//                           Add
//                         </Button>
//                       </Box>
//                     </CardContent>

//                     <CardActions>
//                       <IconButton onClick={() => handleLike(post._id)}>
//                         <ThumbUp />
//                         <Typography variant="body2" ml={0.5}>{post.likes}</Typography>
//                       </IconButton>
//                       <IconButton onClick={() => handleDislike(post._id)}>
//                         <ThumbDown />
//                         <Typography variant="body2" ml={0.5}>{post.dislikes}</Typography>
//                       </IconButton>
//                       <IconButton>
//                         <Comment />
//                         <Typography variant="body2" ml={0.5}>Comment</Typography>
//                       </IconButton>
//                       <IconButton onClick={() => handleDelete(post._id)}>
//                         <Delete />
//                       </IconButton>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>

//       <Box
//         component="footer"
//         sx={{
//           py: 2,
//           backgroundColor: "#191B1B",
//           color: "white",
//           textAlign: "center",
//           mt: 40,
//         }}
//       >
//         <Typography variant="body2">
//           &copy; {new Date().getFullYear()} All rights reserved by Varun Trikha.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
  Paper,
  Card,
  CardContent,
  IconButton,
  CardActions,
  Grid,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Comment,
  Delete,
  Edit,
  Save,
  Cancel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ content: "", image: null });
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [editingComment, setEditingComment] = useState({});
  const [showForm, setShowForm] = useState(false); // New state

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content || !form.image) {
      alert("Please add content and image");
      return;
    }

    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("image", form.image);

    try {
      const response = await axios.post("http://localhost:8000/api/posts", formData);
      const newPost = response.data;
      setPosts([newPost, ...posts]);
      setForm({ content: "", image: null });
      setPreview(null);
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/posts/${id}/like`);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === id ? { ...post, likes: res.data.likes, dislikes: res.data.dislikes } : post
        )
      );
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleDislike = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/posts/${id}/dislike`);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === id ? { ...post, likes: res.data.likes, dislikes: res.data.dislikes } : post
        )
      );
    } catch (err) {
      console.error("Dislike failed", err);
    }
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post._id !== id));
  };

  const handleAddComment = async (postId) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    try {
      const res = await axios.post(`http://localhost:8000/api/posts/${postId}/comments`, {
        text,
      });
      const updatedComment = res.data;
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), updatedComment] }
            : post
        )
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Comment add failed", err);
    }
  };

  const handleEditComment = async (postId, commentId, newText) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/posts/${postId}/comments/${commentId}`,
        { text: newText }
      );
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((c) =>
                  c._id === commentId ? res.data : c
                ),
              }
            : post
        )
      );
      setEditingComment((prev) => ({ ...prev, [commentId]: null }));
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}/comments/${commentId}`);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.filter((c) => c._id !== commentId),
              }
            : post
        )
      );
    } catch (err) {
      console.error("Delete comment failed", err);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#DADBDC", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>My Dashboard</Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} disableGutters sx={{ mt: 4, px: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Close Upload Form" : "Upload New Post"}
            </Button>

            {showForm && (
              <Paper sx={{ p: 3, minHeight: 280, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h6" gutterBottom>Upload Your Post</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="What's on your mind?"
                    name="content"
                    fullWidth
                    multiline
                    rows={4}
                    value={form.content}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                  <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
                    Upload Image
                    <input type="file" hidden name="image" accept="image/*" onChange={handleChange} />
                  </Button>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Add Post</Button>
                </form>
              </Paper>
            )}
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Card sx={{ borderRadius: 2, boxShadow: 6, backgroundColor: "#fff" }}>
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="subtitle1">{post.content}</Typography>

                      <Box mt={2}>
                        {(post.comments || []).map((comment) => (
                          <Box key={comment._id} display="flex" alignItems="center" mb={1}>
                            {editingComment[comment._id] ? (
                              <>
                                <TextField
                                  size="small"
                                  fullWidth
                                  value={editingComment[comment._id]}
                                  onChange={(e) =>
                                    setEditingComment((prev) => ({
                                      ...prev,
                                      [comment._id]: e.target.value,
                                    }))
                                  }
                                />
                                <IconButton
                                  onClick={() =>
                                    handleEditComment(post._id, comment._id, editingComment[comment._id])
                                  }
                                >
                                  <Save fontSize="small" />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    setEditingComment((prev) => ({ ...prev, [comment._id]: null }))
                                  }
                                >
                                  <Cancel fontSize="small" />
                                </IconButton>
                              </>
                            ) : (
                              <>
                                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                  {comment.text}
                                </Typography>
                                <IconButton
                                  onClick={() =>
                                    setEditingComment((prev) => ({
                                      ...prev,
                                      [comment._id]: comment.text,
                                    }))
                                  }
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleDeleteComment(post._id, comment._id)}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </>
                            )}
                          </Box>
                        ))}

                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Add a comment"
                          value={commentText[post._id] || ""}
                          onChange={(e) => handleCommentChange(post._id, e.target.value)}
                          sx={{ mt: 1 }}
                        />
                        <Button size="small" onClick={() => handleAddComment(post._id)} sx={{ mt: 1 }}>
                          Add
                        </Button>
                      </Box>
                    </CardContent>

                    <CardActions>
                      <IconButton onClick={() => handleLike(post._id)}>
                        <ThumbUp />
                        <Typography variant="body2" ml={0.5}>{post.likes}</Typography>
                      </IconButton>
                      <IconButton onClick={() => handleDislike(post._id)}>
                        <ThumbDown />
                        <Typography variant="body2" ml={0.5}>{post.dislikes}</Typography>
                      </IconButton>
                      <IconButton>
                        <Comment />
                        <Typography variant="body2" ml={0.5}>Comment</Typography>
                      </IconButton>
                      <IconButton onClick={() => handleDelete(post._id)}>
                        <Delete />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          backgroundColor: "#191B1B",
          color: "white",
          textAlign: "center",
          mt: 40,
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} All rights reserved by Varun Trikha.
        </Typography>
      </Box>
    </Box>
  );
}
