import * as React from "react";
import TextField from "@mui/material/TextField";
import frLocale from "date-fns/locale/fr";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const adapter = new AdapterDateFns();
export default function SingleDate() {
  const [value, setValue] = React.useState(adapter.date());
  console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        dayOfWeekFormatter={(day) => `${day}.`}
        toolbarFormat="eee dd MMMM"
        showToolbar
      />
    </LocalizationProvider>
  );
}
