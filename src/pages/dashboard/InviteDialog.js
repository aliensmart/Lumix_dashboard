import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import React, { useState } from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import LmInputLabel from "../../components/LmInputLabel";
import LmSelectLabel from "../../components/LmSelectLabel";
import { generateRandom } from "../../helpers";
import {
  addDocument,
  backendRegist,
  checkExistingEmail,
  createDocFromId,
  currentTime,
} from "../../services";
import { ADMINDEFAULT } from "../../utils/AllDefaultData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InviteDialog = ({ open, onClose, roles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors, touchedFields },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: { ...ADMINDEFAULT, role: ADMINDEFAULT?.role?.id },
  });

  const onSubmit = async (formData) => {
    const ExistingEmail = await checkExistingEmail(formData?.email);

    if (ExistingEmail.includes("password")) {
      return;
    }
    const password = generateRandom();

    const roleRef = roles.filter((el) => el.value === formData.role);

    const adminData = {
      ...formData,
      role: roleRef?.[0].ref,
    };

    const { data: userId } = await backendRegist(formData?.email, password);

    //create user
    await createDocFromId("admins", userId, adminData);

    //send email
    const emailData = {
      to: [formData?.email],
      message: {
        html: `<div>Vous etes inviter a etre un ${roleRef?.[0].value} dans le platform de <a href="https://lumix-91314.web.app/" target="_blank">lumix</a> votre email est ${formData?.email} et votre mot de pass est ${password}</div>`,
        subject: "Invitation a joindre lumix administration",
        text: "",
      },
    };

    addDocument("mail", emailData);
    onClose();
    reset({ ...ADMINDEFAULT, role: ADMINDEFAULT?.role?.id });
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
            registerObj={{ required: true }}
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
