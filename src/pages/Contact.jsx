import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import LmInputLabel from "../components/LmInputLabel";
import "react-toastify/dist/ReactToastify.css";
import { addDocument } from "../services";

const Contact = () => {
  const {
    register,
    formState: { errors, touchedFields },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
      subject: "",
    },
  });

  const onSubmit = async (data) => {
    if (data?.fullName && data?.email && data?.message && data?.subject) {
      const emailData = {
        to: ["aide@cash-lumiere.com"],
        message: {
          html: `<div>
        <p>Nom Complet: ${data.fullName}</p>
        <p>Email: <a href=${data.email}>${data.email}</a></p>
        ${data?.message}
        </div>`,
          subject: data?.subject,
          text: "",
        },
      };

      await addDocument("mail", emailData);
      toast.success("Message envoyé avec succès");
      reset({
        fullName: "",
        email: "",
        message: "",
        subject: "",
      });
      return;
    }
    toast.error("Veuillez remplir tous les champs");
  };
  return (
    <div className="contact">
      <div className="contact__container">
        <div className="contact__container--top">
          <h1 className="contact__title">Contact</h1>
        </div>

        <div className="contact__container--content">
          <div className="contact__container--content_form">
            <LmInputLabel
              label={"Nom complet"}
              placeHolder="Alex Konan"
              errors={errors}
              isValid={touchedFields}
              register={register}
              labelName="fullName"
              registerObj={{ required: true }}
            />
            <LmInputLabel
              label={"email"}
              type="email"
              placeHolder={"alex@gmail.com"}
              errors={errors}
              isValid={touchedFields}
              register={register}
              registerObj={{
                pattern: /^\S+@\S+$/i,
                minLength: 3,
                required: true,
              }}
              labelName="email"
            />
            <LmInputLabel
              label={"Sujet"}
              errors={errors}
              isValid={touchedFields}
              register={register}
              labelName="subject"
              placeHolder={"a propos de ..."}
              registerObj={{ required: true }}
            />
            <div className="contact__container--content_form--textarea">
              <label htmlFor="message">Message</label>
              <textarea
                // placeholder=""
                id="message"
                {...register("message", { required: true })}
                placeholder="Votre message"
              ></textarea>
            </div>
            <div className="contact__container--content_form--submit">
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                Envoyer
              </button>
            </div>
          </div>
          <div className="contact__container--content_info">
            <p>
              Notre email:{" "}
              <a href="mailto:aide@cash-lumiere.com">aide@cash-lumiere.com</a>
            </p>
            <p>Notre Numero de tel:</p>
            <p>+225-01-70-50-60-99</p>
            <p>+225-27-21-54-07-00</p>
          </div>
        </div>
        <div className="contact__container--links">
          <a href="/terms">Nos termes et conditions</a>
          <a href="/privacy-policy" className="contact__container--content_btn">
            Notre politique de confidentialiter{" "}
          </a>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
