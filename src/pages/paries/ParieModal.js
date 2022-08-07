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
import * as locales from "react-date-range/dist/locale";
import { addDays } from "date-fns";
import LmInputLabel from "../../components/LmInputLabel";
import { DateRange, DateRangePicker } from "react-date-range";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ParieModal({ open, title, setOpen }) {
  const minDate = new Date();
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
  } = useForm({
    defaultValues: {
      betName: "",
      minBet: "500",
      winnersNumber: "20",
    },
  });
  const onSubmit = (data) => {
    let random = Math.random().toString(36).substring(2, 15);
    const betData = {
      betID: `parie_${random}`,
      betName: data?.betName,
      minBet: parseInt(data?.minBet),
      winnersNumber: parseInt(data?.winnersNumber),
      startsOn: state?.[0]?.startDate,
      EndsOn: state?.[0]?.endDate,
    };

    reset({
      betName: "",
      minBet: "500",
      winnersNumber: "20",
    });
    setOpen(false);
  };
  const handleClose = () => {
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
            <Grid item lg={4} md={4} sm={12}>
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
            <Grid item lg={4} md={4} sm={12}>
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
            <DateRange
              onChange={(item) => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
              minDate={minDate}
              locale={locales["fr"]}
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
