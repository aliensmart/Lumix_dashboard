import React from "react";
import { useForm } from "react-hook-form";
import LmInputLabel from "../components/LmInputLabel";

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

  const onSubmit = (data) => {
    console.log(data);
    reset({
      fullName: "",
      email: "",
      message: "",
      subject: "",
    });
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
            />
            <LmInputLabel
              label={"email"}
              type="email"
              placeHolder={"alex@gmail.com"}
              errors={errors}
              isValid={touchedFields}
              register={register}
              labelName="email"
            />
            <LmInputLabel
              label={"Sujet"}
              errors={errors}
              isValid={touchedFields}
              register={register}
              labelName="subject"
            />
            <div className="contact__container--content_form--textarea">
              <label htmlFor="message">Message</label>
              <textarea
                placeholder=""
                id="message"
                {...register("message")}
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
            <p>
              Notre Numero de tel: <span>+22507789045</span>
            </p>
          </div>
        </div>
        <div className="contact__container--links">
          <a href="/terms">Nos termes et conditions</a>
          <a href="/privacy-policy" className="contact__container--content_btn">
            Notre politique de confidentialiter{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
