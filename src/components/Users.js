import React, { useState } from "react";
import { roles } from "../mockApi";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Keerthana K J",
      email: "keerthi@gmail.com",
      role: "Admin",
      status: "Active",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const handleOpen = (user = null) => {
    setIsEditing(!!user);
    setCurrentUser(
      user || { name: "", email: "", role: roles[0].name, status: "Active" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser({ name: "", email: "", role: "", status: "" });
  };

  const handleSave = () => {
    if (isEditing) {
      setUsers((prev) =>
        prev.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
    } else {
      setUsers((prev) => [...prev, { ...currentUser, id: prev.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Manage Users</h2>
      <Button
        style={{
          backgroundColor: "black",
          color: "white",
          alignItems: "center",
          display: "block",
          margin: "0 auto",
        }}
        variant="contained"
        onClick={() => handleOpen()}
      >
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(user)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(user.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={currentUser.name}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={currentUser.email}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
          />
          <Select
            label="Role"
            fullWidth
            value={currentUser.role}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, role: e.target.value })
            }
          >
            {roles.map((role) => (
              <MenuItem key={role.name} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Status"
            fullWidth
            value={currentUser.status}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, status: e.target.value })
            }
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
