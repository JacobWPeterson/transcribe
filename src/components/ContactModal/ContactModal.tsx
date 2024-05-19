import { useState, type ReactElement } from "react";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

import styles from "./ContactModal.module.scss";

interface ContactModalProps {
  show: boolean;
  onHide: () => void;
}

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const ContactModal = ({
  show,
  onHide,
}: ContactModalProps): ReactElement => {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [sendFailed, setSendFailed] = useState<boolean>(false);
  const {
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<ContactFormData>({ mode: "onBlur" });

  const nameInput = watch("name");
  const emailInput = watch("email");
  const messageInput = watch("message");

  // TO-DO improve this regex
  const emailRegex = /[^@s]+@[^@s]+.[^@s]+/g;

  const handleCancel = () => {
    reset();
    setEmailSent(false);
    onHide();
  };
  const sendEmail = () => {
    emailjs
      .send(
        "service_v5oeqac",
        "template_r9mhd7m",
        {
          from_name: nameInput,
          message: messageInput,
          reply_to: emailInput,
        },
        {
          publicKey: "bLp81eIkp1XLYMVPi",
        }
      )
      .then(
        () => {
          setEmailSent(true);
          if (sendFailed) {
            setSendFailed(false);
          }
        },
        () => {
          setSendFailed(true);
        }
      );
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={classNames(styles.Modal, {
        [styles.Sent]: emailSent,
      })}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Contact Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {emailSent ? (
          <div className={styles.EmailSent}>
            <h3>Email successfully sent</h3>
            <div className={styles.EmailSentSubTitle}>
              Thanks for reaching out
            </div>
          </div>
        ) : (
          <>
            <p>Please reach out with any questions or suggestions.</p>
            <p>
              Also use this form to report any errors or bugs you have found.
              For errors, please indicate the manuscript and line number. For
              bugs, please provide detailed replication steps.
            </p>
            <form onSubmit={handleSubmit(sendEmail)} className={styles.Form}>
              <div className={styles.NameAndEmailContainer}>
                <div className={styles.FormSection}>
                  <label>Name</label>
                  <input
                    className={styles.TextInput}
                    autoFocus
                    type="text"
                    placeholder="e.g., Paul Maas"
                    {...register("name", { required: true })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name?.type === "required" && (
                    <p className={styles.ErrorHelp} role="alert">
                      Name is required
                    </p>
                  )}
                </div>
                <div className={styles.FormSection}>
                  <label>Email</label>
                  <input
                    className={styles.TextInput}
                    type="text"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: true,
                      pattern: emailRegex,
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email?.type === "required" && (
                    <p className={styles.ErrorHelp} role="alert">
                      Email is required
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className={styles.ErrorHelp} role="alert">
                      Please enter a valid email
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.FormSection}>
                <label>Message</label>
                <textarea
                  className={styles.TextArea}
                  {...register("message", {
                    required: true,
                    minLength: 5,
                  })}
                  maxLength={2000}
                  aria-invalid={errors.message ? "true" : "false"}
                  placeholder="Enter your comments here"
                />
                <div
                  className={classNames(styles.TextAreaErrors, {
                    [styles.HasErrors]: !!errors.message,
                  })}
                >
                  {errors.message?.type === "required" && (
                    <p className={styles.ErrorHelp} role="alert">
                      Message is required
                    </p>
                  )}
                  {errors.message?.type === "minLength" && (
                    <p className={styles.ErrorHelp} role="alert">
                      Please include a longer message
                    </p>
                  )}
                  <p className={styles.Help} role="alert">
                    {`(${messageInput?.length || 0}/2000)`}
                  </p>
                </div>
              </div>
            </form>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className={classNames(styles.Button, styles.Cancel)}
          onClick={handleCancel}
        >
          {emailSent ? "Close" : "Cancel"}
        </button>
        {!emailSent && (
          <button
            className={styles.Button}
            disabled={
              isSubmitting ||
              isSubmitSuccessful ||
              Object.keys(errors).length > 0
            }
            onClick={sendEmail}
          >
            {isSubmitting ? "Sending" : "Send"}
          </button>
        )}
        {sendFailed && (
          <p className={styles.ErrorHelp} role="alert">
            Email failed to send. Please retry
          </p>
        )}
      </Modal.Footer>
    </Modal>
  );
};
