import React, { useState } from "react";

import { useToDoStore } from "../../../data/stores/useToDoStore.ts";
import { useToDoStoreList } from "../../../data/stores/useToDoStoreList.ts";
import { useToDoStorePagesForLists } from "../../../data/stores/useToDoStorePagesForLists.ts";
import { InputPlus } from "../InputPlus/index.tsx";
import { MenuPagesForListsItem } from "../MenuPagesForListsItem/index.tsx";

import styles from "./index.module.scss";

export const MenuPagesForLists: React.FC = () => {  
	
  const [		
		pagesForLists,
		createPageForLists,
		updatePageForLists,
		removePageForLists,
	] = useToDoStorePagesForLists(state => [		
		state.pagesForLists,
		state.createPageForLists,
		state.updatePageForLists,
		state.removePageForLists,
	]);  

	const [		
		removeListOnePage,
	] = useToDoStoreList(state => [		
		state.removeListOnePage,
	]); 

	const [		
		removeTasksOneList,
	] = useToDoStore(state => [		
		state.removeTasksOneList,
	]);

	const deletePage = (pageId) => {
    removePageForLists(pageId);
    const arrDelLists = removeListOnePage(pageId);
    arrDelLists.forEach((listId) => {
      removeTasksOneList(listId);
    });
    window.location.href = "/";
  };

	const arrUrl = window.location.href.split('/');
	let pageForListNumber = parseInt(arrUrl[arrUrl.length - 1]);

	if (typeof pageForListNumber != 'number' || isNaN(pageForListNumber)) {
		pageForListNumber = pagesForLists[0].pageId;
	}
	
	 return (    
    <>
      <div className={styles.menulists}>        
        {pagesForLists.map((page, index) => {														
								return <>								
								<MenuPagesForListsItem
									key={page.pageId}
									id={page.pageId}
									classStyle={pageForListNumber == page.pageId ? ( styles.active ) : ( "" )}
									title={page.title}			
									onEdited={updatePageForLists}						
									onRemoved={deletePage}
								/>	
                 /									
								</>
							})}
				<div className={styles.addpage}>
					<InputPlus
            id="df"
						placeholder="Добавить страницу"
            onAdd={(value) => {
              if (value) {
                createPageForLists(value);
              }
            }}
          />
				</div>
        
      </div>
      
    </>
  );
};
