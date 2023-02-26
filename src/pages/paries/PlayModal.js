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
import {
  addDocument,
  addOrUpdate,
  colRef,
  currentTime,
  docRef,
} from "../../services";
import { onSnapshot, Timestamp } from "firebase/firestore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const adapter = new AdapterDateFns();

function PlayModal({ open, setOpen, parieId }) {
  const [loading, setLoading] = useState(false);
  const [betData, setBetData] = useState(null);

  const {
    register,
    formState: { errors, touchedFields },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      winnersNumber: "1",
      winAmount: "500",
    },
  });

  useEffect(() => {
    if (!open) return;
    const sub = onSnapshot(docRef(`bets/${parieId}`), (snap) => {
      const data = { ...snap.data(), ref: snap.ref };
      setBetData(data);
    });

    return sub;
  }, [parieId, open]);

  const onSubmit = async (data) => {
    setLoading(true);
    addOrUpdate(betData?.ref?.path, {
      winnersNumber: parseInt(data?.winnersNumber),
      winAmount: parseInt(data?.winAmount),
      status: "PLAYING",
    });
    setOpen(false);
    setLoading(false);
    reset({
      winnersNumber: "1",
      winAmount: "500",
    });
  };
  const handleClose = () => {
    // random = Math.random().toString(36).substring(2, 15);
    reset({
      winnersNumber: "1",
      winAmount: "500",
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
      <DialogTitle>Choisir gagnants</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems={"stretch"}
          >
            <Grid item lg={12} md={12} sm={12}>
              <LmInputLabel
                label={"Nomber de gagnant"}
                desc={`Choisir le nombre de gagnant, ${betData?.betsCount} jeux actuel`}
                labelName="winnersNumber"
                errors={errors}
                isValid={touchedFields}
                register={register}
                // registerObj={{ maxLength: 20, minLength: 3 }}
                registerObj={{
                  required: true,
                  min: 1,
                  max: betData?.betsCount ?? 1,
                }}
                type="number"
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12}>
              <LmInputLabel
                label={"Montant Par Selection"}
                desc={
                  "Choisir le montant a distribuer pour chaque selection de 500 Francs"
                }
                labelName="winAmount"
                errors={errors}
                isValid={touchedFields}
                register={register}
                registerObj={{
                  required: true,
                  min: 100,
                  max: betData?.totalBet ?? 1000,
                }}
                type="number"
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
          Choisir les gagnants
        </Button>
        <Button onClick={handleClose}>Fermez</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlayModal;
