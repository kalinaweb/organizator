import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useToDoStoreList } from "../../../data/stores/useToDoStoreList.ts";
import { InputPlus } from "../InputPlus/index.tsx";

import logo from "./images/logo.svg";

import styles from "./index.module.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { UserMenu } from "../UserMenu/index.tsx";
import { ModalRegistration } from "../ModalRegistration/index.tsx";


export const Header: React.FC = () => {  

	
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [createList] = useToDoStoreList((state) => [state.createList]);

  let token = '';

  if (window.localStorage.getItem('jwt')) token = window.localStorage.getItem('jwt');
 
  const stylesInline = {
    width: "250px",
    textAlign: "center",
  };    

  return (    
    <>
      <div className={styles.header}>
        <div className={styles.header__logo}>
        <FontAwesomeIcon icon={faBars} className="fa-fw" />
          <img src={logo} width="30" height="30" alt="" />
          <span>ОРГАНИЗАТОР</span>
        </div>
        <div style={stylesInline}>
          <h5>Добавить список</h5>
          <InputPlus
            id="df"
            onAdd={(value) => {
              if (value) {
                createList(value);
              }
            }}
          />
        </div>
        <div>
					{token ? (
              <UserMenu />            
            ) : (
              <Button variant="primary" className="mt-3" onClick={handleShow}>
								Регистрация
							</Button>
            )
					}        
					
        </div>
      </div>
      <ModalRegistration show={show} onHide={handleClose} />      
    </>
  );
};
