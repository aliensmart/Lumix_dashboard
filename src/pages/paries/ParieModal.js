import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import LmInputLabel from "../../components/LmInputLabel";
import { DateRangePicker } from "react-date-range";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ParieModal({ open, handleClose, title }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const {
    register,
    formState: { errors, touchedFields },
    reset,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log(state);
    reset();
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={"lg"}
    >
      <DialogTitle>Creez une Parie</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12}>
              <LmInputLabel
                label={"Nom du Parie"}
                desc={"Entrez le nom de votre parie"}
                labelName="betName"
                errors={errors}
                isValid={touchedFields}
                register={register}
                registerObj={{ required: true, maxLength: 20, minLength: 3 }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <LmInputLabel
                label={"Parie Minimum"}
                desc={"Entrez le montant minimum de ce parie"}
                labelName="MinBet"
                errors={errors}
                isValid={touchedFields}
                register={register}
                registerObj={{ required: true, min: 100 }}
                type="number"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <LmInputLabel
                label={"Nombre de Gagnant"}
                desc={"Entrez le nombre de gagnant de votre parie"}
                labelName="winnersNumber"
                errors={errors}
                isValid={touchedFields}
                register={register}
                registerObj={{ required: true, min: 1 }}
                type="number"
              />
            </Grid>
          </Grid>
          <div>
            <div>
              <p style={{ fontWeight: "600", margin: "0px" }}>
                Debut et fin du jeux
              </p>
              <span style={{ fontSize: "12px", opacity: "0.7" }}>
                Entrez le debut et la fin de votre jeux
              </span>
            </div>
            <DateRangePicker
              onChange={(item) => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
            />
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)}>Creez</Button>
        <Button onClick={handleClose}>Fermez</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParieModal;
