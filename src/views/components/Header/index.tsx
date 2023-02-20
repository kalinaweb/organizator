import React from 'react';
import { useToDoStoreList } from '../../../data/stores/useToDoStoreList.ts';
import { InputPlus } from '../InputPlus/index.tsx';

import logo from './images/logo.svg';

import styles from './index.module.scss';

export const Header: React.FC = () => {
	const [
		createList,
	] = useToDoStoreList(state => [		
		state.createList,		
	]);

	const stylesInline = {
		'width': "250px",
		"textAlign": "center",
	}
	
	return (
		<div className={styles.header}>
			<div className={styles.header__logo}>
				<img src={logo} width='30' height='30' alt="" />
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
		</div>
	)
}