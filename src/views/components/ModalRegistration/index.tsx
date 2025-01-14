import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

import styles from "./index.module.scss";

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
  const textEmailNotFound = "Пользователь не найден.";

  const [register, setRegister] = useState(() => {
    return {
      name: "",
      email: "",
      password: "",
    };
  });

  const changeInputRegister = (event) => {
    setTextEmail(false);
    event.persist();
    setRegister((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const [login, setLogin] = useState(() => {
    return {      
      email: "",
      password: "",
    };
  });

  const changeInputLogin = (event) => {
    setLoginError(false);
    event.persist();
    setLogin((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    }); 
  };

  const [validated, setValidated] = useState(false);
  const [invalidEmailClass, setInvalidEmailClass] = useState("");
  const [textEmail, setTextEmail] = useState(textEmailDefault);
  const [loginError, setLoginError] = useState(false);  
  const [regError, setRegError] = useState(false); 

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
          "https://elvees.ru/jwtauth/сreate_user.php",
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

          if (response.status == 200) {            
            window.localStorage.setItem('jwt', response.data.jwt);
            refresh();            
          }        
          
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          setRegError(true);
        });
    }
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
   
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      console.log('submit');
      
      axios
        .post(
          "https://elvees.ru/jwtauth/login.php",
          {
            email: login.email,
            password: login.password,
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

          if (response.status == 200) {            
            window.localStorage.setItem('jwt', response.data.jwt);  
            refresh();          
          }          
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          setLoginError(true);
        });
    }
  };

  const refresh = () => window.location.reload(true);

  return (
    <Modal show={show} onHide={onHide} className="modalAuth">
      <Modal.Header closeButton>
        
      </Modal.Header>
       <Modal.Body className={styles.modalContent}>
       <div className={styles.main}>  	
        <input type="checkbox" id="chk" aria-hidden="true"/>
          <div className={styles.login}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleLoginFormSubmit(e)}
        >
          
          {loginError ? (
              <div id="loginError" className={styles.loginError}>
                {textEmailNotFound}
              </div>          
            ) : (
              <div></div>
            )
					}
          
          <Form.Group controlId="loginEmail" className="mt-2 position-relative">
            <Form.Control
              type="email"
              name="email"
              className={invalidEmailClass}
              value={login.email}
              onChange={changeInputLogin}
              required
              placeholder="Е-майл"
            />
            <Form.Control.Feedback type="invalid">
              {textEmail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="loginPass" className="mt-2 position-relative">
            <Form.Control
              type="password"
              name="password"
              value={login.password}
              onChange={changeInputLogin}
              required
              minLength="8"
              placeholder="Пароль"
            />
            <Form.Control.Feedback type="invalid">
              Заполните обязательное поле.
            </Form.Control.Feedback>
          </Form.Group>
          <div id="error-message-for-regform"></div>
          <div className="mt-2 d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-2">
              Login
            </Button>
          </div>
        </Form>
            {/* <form>
              <label htmlFor="chk" aria-hidden="true">Login</label>
              <input type="email" name="email" placeholder="Email" required>
              <input type="password" name="pswd" placeholder="Password" required>
              <button>Login</button>
            </form>		 */}		
          </div>
          <div className={styles.signup}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleRegistrationFormSubmit(e)}
        >
          {regError ? (
              <div id="loginError" className={styles.loginError}>
                {textEmailReg}
              </div>          
            ) : (
              <div></div>
            )
					}
          
          <Form.Group controlId="regName" className="position-relative">
            <Form.Control
              type="text"
              name="name"
              value={register.name}
              onChange={changeInputRegister}
              required
              minLength="2"
              placeholder="Имя"
            />
            <Form.Control.Feedback type="invalid">
              Заполните обязательное поле.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="regEmail" className="mt-2 position-relative">
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
          <Form.Group controlId="regPass" className="mt-2 position-relative">
            <Form.Control
              type="password"
              name="password"
              value={register.password}
              onChange={changeInputRegister}
              required
              minLength="8"
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
            {/* <form>
              <label htmlFor="chk" aria-hidden="true">Sign up</label>
              <input type="text" name="txt" placeholder="User name" required>
              <input type="email" name="email" placeholder="Email" required>          
              <input type="password" name="pswd" placeholder="Password" required>
              <button>Sign up</button>
            </form> */}
          </div>
      </div>
       </Modal.Body>
      

      
      {/* <Modal.Body>
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
              minLength="2"
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
              minLength="8"
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
      </Modal.Body> */}
    </Modal>
  );
};
