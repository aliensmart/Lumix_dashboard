import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { deleteDoc } from "firebase/firestore";
import { docRef } from "../../services";

const CustomToolbarOption = ({ userId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const onViewUser = () => {
    navigate(`/users/${userId}`);
  };
  const onDelete = () => {
    deleteDoc(docRef(`/users/${userId}`));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Comfirmer La suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous vraiment supprimer cet utilisateur?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete}>Supprimer</Button>
          <Button onClick={handleClose} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={onViewUser}
        variant="contained"
        startIcon={<RemoveRedEyeIcon />}
      >
        Voir Details
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Supprimer
      </Button>
    </div>
  );
};

export default CustomToolbarOption;
