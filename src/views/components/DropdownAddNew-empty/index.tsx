import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiViewDashboardVariant , mdiViewList, mdiViewGrid, mdiFormatListBulletedSquare } from '@mdi/js';
import styles from "./index.module.scss";

export const DropdownAddNew: React.FC = () => {  	

  return (
    <div className={styles.dropdownAddNew}>      
                <a
                  className={`${styles['dropdownAddNew__toggle']} nav-link`}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="d-none d-md-block"
                    >Create New <i className="fa fa-angle-down"></i
                  ></span>
                  <span className="d-block d-md-none"
                    ><i className="fa fa-plus"></i
                  ></span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </li>
                </ul>
              
         
    </div>
  );
};
