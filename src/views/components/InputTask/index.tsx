import React, {useEffect, useRef, useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './index.module.scss';

interface InputTaskProps {
	id: string;
	listId: number;
	title: string;
	index: number;
	onDone: (id: string) => void; 
	onEdited: (id: string, title: string) => void; 
	onRemoved: (id: string) => void; 
}

export const InputTask: React.FC<InputTaskProps> = ({
	id,
	listId,
	title,
	index,
	onDone,
	onEdited,
	onRemoved
}) => {
	
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
		<Draggable draggableId={id} index={index} key={id}>
			{(provided) => (
				<div className={styles.inputTask}					
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
				<label className={styles.inputTaskLabel}>
					<input 
						type="checkbox" 
						disabled={isEditMode}
						checked={checked}
						className={styles.inputTaskCheckbox}
						onChange={(evt) => {
							setChecked(evt.target.checked);

							if(evt.target.checked) {
								setTimeout(() => {
									onDone(id);
								}, 300);							
							}
						}}
					/>
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
							className={styles.inputTaskEditTitle}
						/>
					) : (
						<h3 className={styles.inputTaskTitle}>{title}</h3>
					)}
					
				</label>
				{isEditMode ? (
					<button 
						aria-label='Save'
						className={styles.inputTaskSave}
						onClick={() => {
							onEdited(id, value);
							setIsEditMode(false);
						}}
					/>
				) : (
					<button 
						aria-label='Edit'
						className={styles.inputTaskEdit}
						onClick={() => {
							setIsEditMode(true);
						}}
					/>
				)}
				<button 
					aria-label='Remove'
					className={styles.inputTaskRemove}
					onClick={() => {
						if(window.confirm('Are you sure?')) {
							onRemoved(id);
						}
					}}
				/>
			</div>
			)}
			
		</Draggable>		
	)
}