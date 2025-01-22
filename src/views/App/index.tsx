import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useToDoStoreList } from '../../data/stores/useToDoStoreList.ts';
import { useToDoStore } from '../../data/stores/useToDoStore.ts';
import { useToDoStorePagesForLists } from "../../data/stores/useToDoStorePagesForLists.ts";
import { Header } from '../components/Header/index.tsx';
import { List } from '../components/List/index.tsx';
import { DragDropContext } from 'react-beautiful-dnd';

import styles from './index.module.scss';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { MenuPagesForLists } from '../components/MenuPagesForLists/index.tsx';

export const App: React.FC = () => {
	const [		
		lists,
		createList,
		updateList,
		removeList,
	] = useToDoStoreList(state => [		
		state.lists,
		state.createList,
		state.updateList,
		state.removeList,
	]);
	const [
		getTasksOneList,		
		changeTasks,
		changeList,
	] = useToDoStore(state => [
		state.getTasksOneList,		
		state.changeTasks,		
		state.changeList,
	]);

	const [		
		pagesForLists
	] = useToDoStorePagesForLists(state => [		
		state.pagesForLists		
	]);  

	function onDragEnd(result) {
		const { destination, source } = result;
		if (!destination) { return }
		console.log(result);
		const tasks = getTasksOneList(source.droppableId);
		
		if(destination.droppableId === source.droppableId && destination.index != source.index) {			
			changeTasks(source.index, destination.index, parseFloat(source.droppableId));		
		}		
		if(destination.droppableId !== source.droppableId) {			
			changeList(tasks[source.index].id, parseFloat(destination.droppableId), destination.index);
		}
	}	

	const arrUrl = window.location.href.split('/');
	let pageForListNumber = parseInt(arrUrl[arrUrl.length - 1]);	

	if (typeof pageForListNumber != 'number' || isNaN(pageForListNumber) ) {
		pageForListNumber = pagesForLists[0].pageId;
	}
	
	return (
		<>
			<Header></Header>	
			<MenuPagesForLists></MenuPagesForLists>	
			<div className={styles.main}>
				
				<DragDropContext onDragEnd={onDragEnd}>
					
						{lists.filter(list => list.pageId == pageForListNumber).map((list, index) => {
								return <>
									
										<List
											id={list.listId}
											key={list.listId}
											title={list.title}
											onEdited={updateList}
											onRemoved={removeList}
										></List>
									
								</>
							})}											
					
				</DragDropContext>
			</div>				
		</>

	);
}