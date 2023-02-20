import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useToDoStoreList } from '../../data/stores/useToDoStoreList.ts';
import { Header } from '../components/Header/index.tsx';
import { List } from '../components/List/index.tsx';
import { DragDropContext } from 'react-beautiful-dnd';
//import { PrismaClient } from '@prisma/client';


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

	function onDragEnd(result) {
		console.log("onDragEnd");
	}	

	/*const getServerSideProps = async () => {
		const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] }); 
		const result = prisma.user.findUnique({
			where: { id: 1 },
			select: {
				name: true,
				profileViews: true,
			},
		});
			
			
			return {
				props: { result },
			};
		};
		
	/*const result = prisma.user.findUnique({
		where: { id: 1 },
		select: {
			name: true,
			profileViews: true,
		},
	});

	console.log(result);*/
	

	return (
		<>
			<Header></Header>		
			<div className={styles.main}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Swiper
						spaceBetween={50}
						slidesPerView={"auto"}
						loop={false}						
						navigation={{
							prevEl: '.swiper-button-prev',
							nextEl: '.swiper-button-next',
						}}
						modules={[Navigation]}
						onSlideChange={() => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper)}
						centeredSlides={false}
						breakpoints={{
							"200": {
								slidesPerView: 1,
								spaceBetween: 10,
								centeredSlides: true
							},
							"650": {
								slidesPerView: 2,
								spaceBetween: 20,
								centeredSlides: false
							},
							"1100": {
								slidesPerView: 3,
								spaceBetween: 30,
							},
							"1200": {
								slidesPerView: 4,
								spaceBetween: 30,
							},
						}}
						className="mySwiper"
					>
						{lists.map((list, index) => {														
								return <>
									<SwiperSlide key={list.listId}>
										<List
											id={list.listId}
											key={list.listId}
											title={list.title}
											onEdited={updateList}
											onRemoved={removeList}
										></List>
									</SwiperSlide>
								</>
							})}						
					</Swiper>
					<div className='swiper-button-prev'></div>
					<div className='swiper-button-next'></div>
				</DragDropContext>
			</div>				
		</>

	);
}