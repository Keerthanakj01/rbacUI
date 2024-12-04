import React, { useState } from "react";
import { roles, permissions } from "../mockApi";
import {
  Button,
  List,
  ListItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const Roles = () => {
  const [roleList, setRoleList] = useState(roles);
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  const handleAddRole = () => {
    setRoleList([...roleList, { ...newRole, id: roleList.length + 1 }]);
    setOpen(false);
  };

  const togglePermission = (perm) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        style={{ background: "black", color: "white" }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add Role
      </Button>
      <List>
        {roleList.map((role) => (
          <ListItem key={role.id}>
            {role.name} - {role.permissions.join(", ")}
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <h3>Assign Permissions</h3>
          {permissions.map((perm) => (
            <div key={perm}>
              <Checkbox
                checked={newRole.permissions.includes(perm)}
                onChange={() => togglePermission(perm)}
              />
              {perm}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddRole}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Roles;
