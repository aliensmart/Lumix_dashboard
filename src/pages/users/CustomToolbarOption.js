import { Button, IconButton } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

const CustomToolbarOption = ({ userId }) => {
  const navigate = useNavigate();
  console.log(userId);
  const onViewUser = () => {
    navigate(`/users/${userId}`);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0 2rem",
      }}
    >
      <Button
        onClick={onViewUser}
        variant="contained"
        startIcon={<RemoveRedEyeIcon />}
      >
        Voir Details
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />} sx>
        Supprimer
      </Button>
    </div>
  );
};

export default CustomToolbarOption;
