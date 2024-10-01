import React from 'react';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';

import styles from './index.module.scss';

export const UserMenu: React.FC = () => {	
	
	return (
		<Dropdown className={styles.usermenu}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">	
				<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1.5"/>
					<path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#3F72AF" stroke-width="1.5" stroke-linecap="round"/>
					<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#3F72AF" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Sign out</Dropdown.Item>        
      </Dropdown.Menu>
    </Dropdown>


		/*<>
			<div className='dropdown text-end'>
				<a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
					<Image src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" /></a>
				<ul className="dropdown-menu text-small show" data-popper-placement="bottom-end">
					<li><a className="dropdown-item" href="#">New project...</a></li>
					<li><a className="dropdown-item" href="#">Settings</a></li>
					<li><a className="dropdown-item" href="#">Profile</a></li>
					<li><hr className="dropdown-divider" /></li>
					<li><a className="dropdown-item" href="#">Sign out</a></li>
				</ul>
			</div>
		</>	*/	
	);
};