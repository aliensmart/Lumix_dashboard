import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LmInputLabel from "../../components/LmInputLabel";
import LmSelectLabel from "../../components/LmSelectLabel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InviteDialog = ({ open, onClose, roles }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(roles);
  const {
    register,
    formState: { errors, touchedFields },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      ville: "",
      role: "Editeur",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
    reset({
      fullName: "",
      email: "",
      phoneNumber: "",
      city: "",
      role: "",
    });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={"xl"}
    >
      <DialogTitle>Invitez un Administrateur</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <LmInputLabel
            label={"Nom Complet"}
            desc={"Entrez le nom complet de la personne a Inviter"}
            labelName="fullName"
            errors={errors}
            placeHolder="Alexis"
            // isValid={touchedFields}
            register={register}
            registerObj={{ maxLength: 20, minLength: 3, required: true }}
          />
          <LmInputLabel
            label={"Email"}
            desc={"Entrez l'adresse email que l'invitation sera envoyer"}
            labelName="email"
            errors={errors}
            placeHolder="email@gmail.com"
            type="email"
            // isValid={touchedFields}
            register={register}
            registerObj={{
              pattern: /^\S+@\S+$/i,
              minLength: 3,
              required: true,
            }}
          />
          <LmInputLabel
            label={"Numero de Telephone"}
            desc={"Entrez le numero de telephone de l'invite"}
            labelName="phoneNumber"
            errors={errors}
            placeHolder="+2250734589632"
            // isValid={touchedFields}
            register={register}
            type="tel"
            registerObj={{ minLength: 6, pattern: /\+?\d+/ }}
          />
          <LmInputLabel
            label={"Ville"}
            desc={"Entrez la ville ou reside l'invite"}
            labelName="city"
            errors={errors}
            placeHolder="Abidjan"
            // isValid={touchedFields}
            register={register}
            registerObj={{ maxLength: 20, minLength: 3, required: true }}
          />
          <LmSelectLabel
            label={"Role"}
            desc={"Choisir le role de l'invite"}
            labelName="role"
            errors={errors}
            register={register}
            options={roles}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          Invitez
        </Button>
        <Button onClick={onClose}>Annulez</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteDialog;
