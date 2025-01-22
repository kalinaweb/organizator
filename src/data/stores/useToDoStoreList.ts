import {create, State, StateCreator} from 'zustand';
import { generateIdNumber } from '../helpers.ts';

interface List {
	listId: number,
	title: string,
	order: number,
	pageId: number,
}


interface ToDoList {
	lists: List[];
	createList: (listId: number, title: string) => void;
	updateList: (id: number, title: string) => void;
	removeList: (id: number) => void;
	removeListOnePage: (pageid: number) => void;
}

function isToDoList(object: any): object is ToDoList {
	return 'lists' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
	if(isToDoList(nextState)) {

		window.localStorage.setItem('lists', JSON.stringify(
			nextState.lists
		));
	}
	set(nextState, ...args);
}, get, api);

const getListCurrentState = () => {
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('lists') || '[{"listId":0,"title":"Дела на сегодня","order":1668074397138m, "pageId":0},{"listId":1,"title":"Домашние дела","order":1668074438913, "pageId":0},{"listId":2,"title":"Купить","order":1668074423928, "pageId":0}]'));
				
		return currentState;
	}
	catch(err) {
		window.localStorage.setItem('lists', '[]');
	}
	return [];
}

const arrUrl = window.location.href.split('/');
const pageForListNumber = parseInt(arrUrl[arrUrl.length - 1]);

export const useToDoStoreList = create<ToDoList>(localStorageUpdate((set, get) => ({
	lists: getListCurrentState(),	
	createList: (title) => {
		const { lists } = get();
		const newList = {			
			listId: generateIdNumber(),
			title,
			order: Date.now(), 
			pageId: pageForListNumber,
		}

		set({
			lists: [newList].concat(lists),
		})
	},
	updateList: (id: number, title: string) => {
		const { lists } = get();
		set({
			lists: lists.map((list) => ({
				...list,
				title: list.listId === id ? title : list.title,
			})),
		});
	},
	removeList: (id: number) => {
		const { lists } = get();
		set({
			lists: lists.filter((list) => list.listId !== id )
		});
	},
	removeListOnePage: (pageid: number) => {
		const { lists } = get();
		const arrDel = lists.filter((list) => list.pageId == pageid);
		const result= arrDel.map((item) => item.listId);
		
		set({
			lists: lists.filter((list) => list.pageId !== pageid )
		});
		return result;
	},
})));
