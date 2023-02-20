import React, { useEffect, useRef, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useToDoStore } from '../../../data/stores/useToDoStore.ts';
import { InputPlus } from '../InputPlus//index.tsx';
import { InputTask } from '../InputTask//index.tsx';
import { Droppable } from 'react-beautiful-dnd';
import { MyDocument } from './MyDocument.js'

import styles from './index.module.scss';

interface ListProps {
	id: number;
	title: string;
	onEdited: (id: string, title: string) => void;
	onRemoved: (id: string) => void;
}


export const List: React.FC<ListProps> = ({
	id,
	title,
	onEdited,
	onRemoved
}) => {
	const [
		tasks,
		listId,
		createTask,
		updateTask,
		removeTask,
	] = useToDoStore(state => [
		state.tasks,
		state.listId,
		state.createTask,
		state.updateTask,
		state.removeTask,
	]);

	const divStyle = {
		transform: 'translate3d(100px, 0px, 0px)',
	};

	const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

	function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };	

	const [checked, setChecked] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [value, setValue] = useState(title);
	const editTitleInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditMode) {
			editTitleInputRef?.current?.focus();
		}		
	}, [isEditMode]);

	return (		
		
		<div className={styles.list} id={id}>			
			
			<menu className={styles.menu}>

				{/* <button className={styles.menu__item} title="Дублировать список">
					<svg className={styles.icon} viewBox="0 0 32 32">
						<path d="M4,6h20c1.1,0,2,0.9,2,2v20c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V8C2,6.9,2.9,6,4,6z" />
						<path d="M8,6H6V4c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v20c0,1.1-0.9,2-2,2h-2" />
					</svg>
				</button>	 */}			

				<button className={styles.menu__item}  onClick={copyToClipboard} title="Скопировать текст">
					<svg className={styles.icon} viewBox="0 0 32 32">
						<path d="M26.4,0.5H10.4C9.6,0.5,8.9,1.2,8.9,2v3.3H5.6c-0.8,0-1.5,0.7-1.5,1.5V30c0,0.8,0.7,1.5,1.5,1.5h15.9
	c0.8,0,1.5-0.7,1.5-1.5v-3.3h3.3c0.8,0,1.5-0.7,1.5-1.5V2C27.9,1.2,27.2,0.5,26.4,0.5z"/>
						<path d="M23.1,26.7v-3v-17c0-0.8-0.7-1.5-1.5-1.5h-9.7" />
						<path d="M17.7,11.3H9.5 M17.7,15.7H9.5 M17.7,20.1H9.5 M17.7,24.5H9.5" />
						<path d="M9.3,5.3c2.6,0,0.7,0,2.6,0" />
						<path d="M32,31.5" />
					</svg>
				</button>
				
				<PDFDownloadLink document={<MyDocument data={title + '\n'+ tasks.filter(task => task.listId == id).map((task, index) => {
									return '\n'+task.title;
								})}/>} fileName="somename.pdf">
				<button className={styles.menu__item} title="Сохранить в pdf">
				<svg className={styles.icon} viewBox="0 0 32 32">
						<g>
							<path d="M14,0.6c-2.2,0,0,0-3,0h-0.5H6.7c-1,0-1.8,0.8-1.8,1.8v27.2c0,1,0.8,1.8,1.8,1.8h18.7c1,0,1.8-0.8,1.8-1.8
		v-3.8"/>
							<path d="M27.1,25.8v-3.5V2.4c0-1-0.8-1.8-1.8-1.8H14" />
						</g>
						<path d="M32,31.5" />
						<path d="M36.3,11.9" />
						<path d="M23.7,18.1c0-0.1-0.1-0.3-0.2-0.4c-0.3-0.3-1-0.5-2-0.5c-0.7,0-1.6,0.1-2.5,0.2c-0.4-0.2-0.8-0.5-1.1-0.8
	c-0.9-0.8-1.6-1.9-2.1-3.2c0-0.1,0.1-0.2,0.1-0.3c0,0,0.5-2.8,0.4-3.7c0-0.1,0-0.2-0.1-0.3l0-0.1c-0.1-0.3-0.4-0.6-0.8-0.6l-0.2,0h0
	c-0.5,0-0.8,0.2-0.9,0.6c-0.3,1.1,0,2.7,0.6,4.9l-0.1,0.3c-0.4,1-0.9,2-1.3,2.8l-0.1,0.1c-0.5,0.9-0.9,1.7-1.3,2.3l-0.4,0.2
	c0,0-0.7,0.4-0.9,0.5c-1.3,0.8-2.2,1.7-2.4,2.4c0,0.2,0,0.5,0.2,0.7l0.4,0.2c0.2,0.1,0.3,0.1,0.5,0.1c1,0,2.1-1.2,3.6-3.9
	c1.8-0.6,3.8-1.1,5.5-1.3c1.3,0.8,3,1.3,4,1.3c0.2,0,0.3,0,0.5-0.1c0.2-0.1,0.4-0.2,0.5-0.3C23.7,19,23.8,18.6,23.7,18.1z M9.2,22.8
	c0.2-0.5,0.9-1.4,1.9-2.3c0.1-0.1,0.2-0.2,0.4-0.3C10.4,22,9.7,22.6,9.2,22.8z M15.2,8.9c0.3,0,0.5,0.8,0.5,1.5
	c0,0.7-0.2,1.2-0.4,1.6c-0.2-0.6-0.3-1.4-0.3-2C15.1,10,15.1,8.9,15.2,8.9z M13.4,18.8c0.2-0.4,0.4-0.8,0.7-1.2
	c0.6-1,0.9-1.9,1.2-2.5c0.5,0.9,1.2,1.7,1.9,2.4c0.1,0.1,0.2,0.2,0.3,0.2C16,18,14.6,18.4,13.4,18.8z M23.2,18.8
	c-0.1,0.1-0.4,0.1-0.5,0.1c-0.6,0-1.3-0.3-2.2-0.7c0.4,0,0.7,0,1,0c0.6,0,0.7,0,1.3,0.1C23.3,18.4,23.3,18.7,23.2,18.8z"/>
					</svg>
					</button>
            </PDFDownloadLink>		

				
				{isEditMode ? (
					<button 					
						aria-label='Save'
						className={styles.menu__item}
						onClick={() => {
							onEdited(id, value);
							setIsEditMode(false);
						}}
					>
						<svg className={styles.icon} viewBox="0 0 24 24" >
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>	
					</button>
				) : (
					<button 
						className={styles.menu__item} 
						title="Настройки"
						onClick={() => {
							setIsEditMode(true);
						}}
					>
						<svg className={styles.icon} viewBox="0 0 24 24" >
							<path d="M21.3,9.5l-1.9-0.6l0.9-1.8c0.2-0.4,0.1-0.8-0.2-1.1L18,3.9c-0.3-0.3-0.8-0.4-1.1-0.2l-1.8,0.9l-0.6-1.9
		C14.3,2.3,13.9,2,13.5,2h-3c-0.4,0-0.8,0.3-0.9,0.7L8.9,4.6L7.1,3.7C6.8,3.5,6.3,3.6,6,3.9L3.9,6C3.6,6.3,3.5,6.8,3.7,7.1l0.9,1.8
		L2.7,9.6C2.3,9.7,2,10.1,2,10.5v3c0,0.4,0.3,0.8,0.7,0.9l1.9,0.6l-0.9,1.8c-0.2,0.4-0.1,0.8,0.2,1.1L6,20.1c0.3,0.3,0.8,0.4,1.2,0.2
		l1.8-0.9l0.6,1.9c0.1,0.4,0.5,0.7,0.9,0.7h3c0.4,0,0.8-0.3,0.9-0.7l0.6-1.9l1.8,0.9c0.4,0.2,0.8,0.1,1.1-0.2l2.1-2.1
		c0.3-0.3,0.4-0.8,0.2-1.1l-0.9-1.8l1.9-0.6c0.4-0.1,0.7-0.5,0.7-0.9v-3C22,10.1,21.7,9.7,21.3,9.5z"/>
							<circle cx="12" cy="12" r="4" />
						</svg>
					</button>
				)}
				
				<button className={styles.menu__item} title="Удалить" onClick={() => {
						if(window.confirm('Are you sure?')) {
							onRemoved(id);							
						}
					}}>
					<svg className={styles.icon} viewBox="0 0 24 24" >
						<polyline points="3,6 5,6 21,6 "/>
						<path d="M19,6v14c0,1.1-0.9,2-2,2H7c-1.1,0-2-0.9-2-2V6 M8,6V4c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v2"/>
						<line x1="10" y1="11" x2="10" y2="17"/>
						<line x1="14" y1="11" x2="14" y2="17"/>
					</svg>
				</button>

			</menu>	
			<div className={styles.list__edit}>
			{isEditMode ? (
				
					<input 
						type="text" 
						value={value}
						ref={editTitleInputRef}
						onChange={(evt) => {
							setValue(evt.target.value);
						}}
						onKeyDown={(evt) => {
							if(evt.key === 'Enter') {
								onEdited(id, value);
								setIsEditMode(false);
							}
						}}
				/>
				
			) : (
				<h1 className={styles.list__title}>{title}</h1>		
			)}
			</div>
			
			<div className={styles.list__form}>
				<InputPlus
					id={id}
					onAdd={(title) => {
						if (title) {
							createTask(id, title);
						}
					}}
				/>
			</div>
			<Droppable droppableId={id} key={id}>
				{(provided) => (
					
					<div className={styles.list__elements}
						ref={provided.innerRef}
						{...provided.droppableProps}
						key={id}
					>
						{provided.placeholder}						
						{!tasks.length && (
							<p className={styles.list__text}>Записей пока нет</p>
						)}
						{tasks.filter(task => task.listId == id).map((task, index) => {														
							return <>
								<InputTask
									key={task.id}
									listId={id}
									id={task.id}
									index={index}
									title={task.title}
									onDone={removeTask}
									onEdited={updateTask}
									onRemoved={removeTask}
								/>
							</>
						})}				
							
						<form className="copyTextList">
							<textarea
								ref={textAreaRef}
								value={title + '\n\n' + tasks.filter(task => task.listId == id).map((task, index) => {
									if(index == 0 ) return task.title;
									else return '\n'+task.title;
								})}
							/>
						</form>			
								
					</div>
					
				)}

			</Droppable>
			
			
		</div>
	)
	
}