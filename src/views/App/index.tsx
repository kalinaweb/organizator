import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useToDoStoreList } from '../../data/stores/useToDoStoreList.ts';
import { useToDoStore } from '../../data/stores/useToDoStore.ts';
import { Header } from '../components/Header/index.tsx';
import { List } from '../components/List/index.tsx';
import { DragDropContext } from 'react-beautiful-dnd';

import styles from './index.module.scss';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";

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
	
	return (
		<>
			<Header></Header>		
			<div className={styles.main}>
				<DragDropContext onDragEnd={onDragEnd}>
					
						{lists.map((list, index) => {														
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