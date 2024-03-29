import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteDoc } from "firebase/firestore";
import React from "react";
import { addOrUpdate, docRef } from "../../services";

const CustomToolbar = ({ played, parieId, setIsPlay, beters }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onDelete = () => {
    deleteDoc(docRef(`/bets/${parieId}`));
    handleClose();
  };
  const onPlay = () => addOrUpdate(`/bets/${parieId}`, { played: true });
  return (
    <div>
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
            Voulez vous vraiment supprimer ce Pari?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDelete}>Supprimer</Button>
          <Button onClick={handleClose} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
      {!played && beters > 0 && (
        <Button onClick={() => setIsPlay(true)}>Jouer</Button>
      )}

      {!played && beters <= 0 && (
        <Button onClick={handleClickOpen}>Supprimer</Button>
      )}
    </div>
  );
};

export default CustomToolbar;
