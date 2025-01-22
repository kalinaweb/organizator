import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import styles from "./index.module.scss";

interface MenuPagesForListsItemProps {
  id: string;
  title: string;
  classStyle: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const MenuPagesForListsItem: React.FC<MenuPagesForListsItemProps> = ({
  id,
  title,
  classStyle,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <>
      <div className={styles.menulistItem}>
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
						<a key={id} className={classStyle} href={"/" + id}>{title}</a>
					)}
        
        <div className={styles.menulistBtn}>
				{isEditMode ? (
					<button 
						aria-label='Save'
						className={styles.pageSave}
						onClick={() => {
							onEdited(id, value);
							setIsEditMode(false);
						}}
					/>
				) : (
					<button 
						aria-label='Edit'
						className={styles.pageEdit}
						onClick={() => {
							setIsEditMode(true);
						}}
					/>
				)}
          <button
            aria-label="Remove"
            className={styles.pageRemove}
            onClick={() => {
              if (window.confirm("Are you sure?")) {
                onRemoved(id);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
