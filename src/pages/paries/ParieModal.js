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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import LmInputLabel from "../../components/LmInputLabel";
import TextField from "@mui/material/TextField";
import frLocale from "date-fns/locale/fr";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { addDocument, colRef, currentTime } from "../../services";
import { Timestamp } from "firebase/firestore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const adapter = new AdapterDateFns();
function ParieModal({ open, title, setOpen }) {
  const [value, setValue] = React.useState(adapter.date());

  const [loading, setLoading] = useState(false);
  let random = Math.random().toString(36).substring(2, 15);

  const {
    register,
    formState: { errors, touchedFields },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      betName: `parie_${random}`,
      minBet: "500",
      winnersNumber: "20",
    },
  });

  // console.log(value.toUTCString());

  const onSubmit = async (data) => {
    setLoading(true);

    const startOn = value.setUTCHours(8, 30, 0);
    const endOn = value.setUTCHours(18, 30, 0);
    // Timestamp.
    const betData = {
      betName: data?.betName,
      minBet: parseInt(data?.minBet),
      winnersNumber: parseInt(data?.winnersNumber),
      startsOn: new Date(startOn),
      endsOn: new Date(endOn),
      status: "ONGOING",
      played: false,
      beters: 0,
      addedOn: currentTime(),
      totalBet: 0,
    };

    await addDocument("bets", betData);
    setOpen(false);
    setLoading(false);
    random = Math.random().toString(36).substring(2, 15);
    reset({
      betName: `parie_${random}`,
      minBet: "500",
      winnersNumber: "20",
    });
  };
  const handleClose = () => {
    // random = Math.random().toString(36).substring(2, 15);
    reset({
      betName: `parie_${random}`,
      minBet: "500",
      winnersNumber: "20",
    });
    setOpen(false);
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
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems={"stretch"}
          >
            <Grid item lg={6} md={6} sm={12}>
              <LmInputLabel
                label={"Nom du Parie"}
                desc={"Entrez le nom de votre parie"}
                labelName="betName"
                errors={errors}
                isValid={touchedFields}
                register={register}
                // registerObj={{ maxLength: 20, minLength: 3 }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12}>
              <LmInputLabel
                label={"Parie Minimum en francs Cfa"}
                desc={"Entrez le montant minimum de ce parie"}
                labelName="minBet"
                errors={errors}
                isValid={touchedFields}
                register={register}
                registerObj={{ required: true, min: 100 }}
                type="number"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12}>
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
            <Grid item lg={6} md={6} sm={12}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
                Choisir la date
              </h3>
              <p
                style={{
                  margin: 0,
                  marginBottom: "15px",
                  opacity: "0.8",
                  fontSize: "14px",
                }}
              >
                La date choisir sera toujour entre 8:30 et 18:30
              </p>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={frLocale}
              >
                <DatePicker
                  views={["day", "month", "year"]}
                  label="Choisir le Jour de Votre Parie"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
                {/* <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                /> */}
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
          Creez
        </Button>
        <Button onClick={handleClose}>Fermez</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParieModal;
