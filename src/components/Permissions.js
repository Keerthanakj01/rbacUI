import React, { useState } from "react";
import { permissions } from "../mockApi";
import { Checkbox, List, ListItem, ListItemText, Divider } from "@mui/material";

const Permissions = () => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const togglePermission = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Manage Permissions</h2>
      <List>
        {permissions.map((permission) => (
          <React.Fragment key={permission}>
            <ListItem>
              <Checkbox
                checked={selectedPermissions.includes(permission)}
                onChange={() => togglePermission(permission)}
              />
              <ListItemText primary={permission} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <h3>Selected Permissions:</h3>
      <ul>
        {selectedPermissions.map((perm) => (
          <li key={perm}>{perm}</li>
        ))}
      </ul>
    </div>
  );
};

export default Permissions;
