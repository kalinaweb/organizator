import { useToDoStore } from './useToDoStore';
import {create, State, StateCreator} from 'zustand';
import { generateIdNumber } from '../helpers.ts';

interface PagesForLists {
	pageId: number,
	title: string,
	order: number,
}

interface ToDoPagesForLists {
	pagesForLists: PagesForLists[];
	createPageForLists: (pageId: number, title: string) => void;
	updatePageForLists: (id: number, title: string) => void;
	removePageForLists: (id: number) => void;
}

function isToDoPagesForLists(object: any): object is ToDoPagesForLists {
	return 'pagesForLists' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
	if(isToDoPagesForLists(nextState)) {

		window.localStorage.setItem('pagesForLists', JSON.stringify(
			nextState.pagesForLists
		));
	}
	set(nextState, ...args);
}, get, api);

const getPagesForListsCurrentState = () => {
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('pagesForLists') || '[{"pageId":0,"title":"Покупки","order":1668074397138}]'));
		return currentState;
	}
	catch(err) {
		window.localStorage.setItem('pagesForLists', '[]');
	}
	return [];
}

export const useToDoStorePagesForLists = create<ToDoPagesForLists>(localStorageUpdate((set, get) => ({
	pagesForLists: getPagesForListsCurrentState(),	
	createPageForLists: (title) => {
		const { pagesForLists } = get();
		const newId = generateIdNumber();
		const newPageForLists = {			
			pageId: newId,
			title,
			order: Date.now(), 
		}

		set({
			pagesForLists: [newPageForLists].concat(pagesForLists),
		})

		window.location.href = '/' + newId;
	},
	updatePageForLists: (id: number, title: string) => {
		const { pagesForLists } = get();
		set({
			pagesForLists: pagesForLists.map((page) => ({
				...page,
				title: page.pageId === id ? title : page.title,
			})),
		});
	},
	removePageForLists: (id: number) => {		
		const { pagesForLists } = get();
		set({
			pagesForLists: pagesForLists.filter((page) => page.pageId !== id )
		});		
	},
})));
