import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

interface ModalRegistrationProps {
  show: boolean;
  onHide: () => void;
  handleClose: () => void;
}

export const ModalRegistration: React.FC<ModalRegistrationProps> = ({
  show,
  onHide,
}) => {
  const textEmailReg = "Пользователь с таким email уже зарегистрирован.";
  const textEmailDefault = "Заполните обязательное поле.";

  const [register, setRegister] = useState(() => {
    return {
      name: "",
      email: "",
      password: "",
    };
  });

  const changeInputRegister = (event) => {
    event.persist();
    setRegister((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const [validated, setValidated] = useState(false);
  const [invalidEmailClass, setInvalidEmailClass] = useState("");
  const [textEmail, setTextEmail] = useState(textEmailDefault);

  const handleRegistrationFormSubmit = (event) => {
    event.preventDefault();
    //console.log("click");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      axios
        .post(
          "https://elvees.ru/apiPost.php",
          {
            name: register.name,
            email: register.email,
            password: register.password,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          //handle success
          console.log(response);

          switch (response.data) {
            case "errorEmailReg":
              setInvalidEmailClass("is-invalid");
              setTextEmail(textEmailReg);
              break;
            case "success":
              setInvalidEmailClass("");
              setTextEmail("");
              setShow(false);
              setRegister(() => {
                return {
                  name: "",
                  email: "",
                  password: "",
                };
              });
              break;
            default:
              break;
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleRegistrationFormSubmit(e)}
        >
          <Form.Group controlId="regName">
            <Form.Control
              type="text"
              name="name"
              value={register.name}
              onChange={changeInputRegister}
              required
              minlength="2"
              placeholder="Имя"
            />
            <Form.Control.Feedback type="invalid">
              Заполните обязательное поле.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="regEmail" className="mt-2">
            <Form.Control
              type="email"
              name="email"
              className={invalidEmailClass}
              value={register.email}
              onChange={changeInputRegister}
              required
              placeholder="Е-майл"
            />
            <Form.Control.Feedback type="invalid">
              {textEmail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="regPass" className="mt-2">
            <Form.Control
              type="password"
              name="password"
              value={register.password}
              onChange={changeInputRegister}
              required
              minlength="8"
              placeholder="Пароль"
            />
            <Form.Control.Feedback type="invalid">
              Заполните обязательное поле. Пароль должен быть не меньше 8
              символов.
            </Form.Control.Feedback>
          </Form.Group>
          <div id="error-message-for-regform"></div>
          <div className="mt-2 d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-2">
              Зарегистрироваться
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
