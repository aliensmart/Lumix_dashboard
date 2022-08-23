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
import * as locales from "react-date-range/dist/locale";
import { addDays } from "date-fns";
import LmInputLabel from "../../components/LmInputLabel";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDocument, colRef, currentTime } from "../../services";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import SingleDate from "./SingleDate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function ParieModal({ open, title, setOpen }) {
  const [minDate, setMinDate] = useState(new Date());
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const checkOverluping = async () => {
      const ref2 = query(
        colRef("bets"),
        where("endsOn", ">=", new Date()),
        orderBy("endsOn", "desc")
      );

      let docs2 = await getDocs(ref2);
      console.log(docs2);
      let dateRange = [];
      if (docs2?.empty) {
        dateRange.push({
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection",
        });
      } else {
        let latestDoc = docs2?.docs[0]?.data();
        console.log(latestDoc);

        let startDate = addDays(latestDoc?.endsOn?.toDate(), 1);
        setMinDate(startDate);
        // dateRange = [
        //   {
        //     startDate: startDate,
        //     endDate: addDays(startDate, 7),
        //     key: "selection",
        //   },
        // ];
      }
      // setState(dateRange);
      // return await getDocs(ref);
    };
    checkOverluping();
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    let random = Math.random().toString(36).substring(2, 15);
    const betData = {
      betName: data?.betName ?? `parie_${random}`,
      minBet: parseInt(data?.minBet),
      winnersNumber: parseInt(data?.winnersNumber),
      startsOn: state?.[0]?.startDate,
      endsOn: state?.[0]?.endDate,
      status: "SCHEDULED",
      beters: 0,
      addedOn: currentTime(),
      totalBet: 0,
    };

    await addDocument("bets", betData);
    setState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: "selection",
      },
    ]);
    setOpen(false);
    setLoading(false);
    reset({
      betName: "",
      minBet: "500",
      winnersNumber: "20",
    });
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
              <SingleDate />
            </Grid>
          </Grid>

          {/* <div>
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
          <div></div> */}
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
