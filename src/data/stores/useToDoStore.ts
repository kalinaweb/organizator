import {create, State, StateCreator} from 'zustand';

import { generateId } from '../helpers.ts';

interface Task {
	id: string;
	listId: number;
	title: string;
	createdAt: number;
}

interface ToDoStore {
	tasks: Task[];
	createTask: (listId: number, title: string) => void;
	updateTask: (id: string, title: string) => void;
	removeTask: (id: string) => void;
	getTasksOneList: (listId: number) => void;
	removeTasksOneList: (listId: number) => void;
	changeTasks: (indexOld: number, indexNew: number, listId: number) => void;
	changeList: (id: string, listIdNew: number, indexNew: number) => void;
}

function isToDoStore(object: any): object is ToDoStore {
	return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
	if(isToDoStore(nextState)) {
		
		window.localStorage.setItem('tasks', JSON.stringify(
			nextState.tasks
		));

	}
	set(nextState, ...args);
}, get, api);

const getCurrentState = () => {
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]'));
		return currentState;
	}
	catch(err) {
		window.localStorage.setItem('tasks', '[]');
	}
	return [];
}

export const useToDoStore = create<ToDoStore>(localStorageUpdate((set, get) => ({
	tasks: getCurrentState(),
	createTask: (listId, title) => {
		const { tasks } = get();
		const newTask = {
			id: generateId(),
			listId: listId,
			title,
			createdAt: Date.now(),
		}

		set({
			tasks: [newTask].concat(tasks),
		})
	},
	updateTask: (id: string, title: string) => {
		const { tasks } = get();
		set({
			tasks: tasks.map((task) => ({
				...task,
				title: task.id === id ? title : task.title,
			})),
		});
	},
	removeTask: (id: string) => {
		const { tasks } = get();
		set({
			tasks: tasks.filter((task) => task.id !== id )
		});
	},
	getTasksOneList: (listId: number) => {
		const { tasks } = get();
		/*set({
			tasks: tasks.filter((task) => task.listId !== listId )
		});*/
		return tasks.filter((task) => task.listId == listId );
	},
	removeTasksOneList: (listId: number) => {
		const { tasks } = get();
		set({
			tasks: tasks.filter((task) => task.listId !== listId )
		});
	},
	changeTasks: (indexOld: number, indexNew: number, listId: number) => {
		const { tasks } = get();
		const  tasksFromList  = tasks.filter((task) => task.listId === listId );
		const tasksWithoutCurrentList = tasks.filter((task) => task.listId !== listId );		
		let currentValue = tasksFromList[indexOld];

		tasksFromList.splice(indexOld, 1); 								//удаление со старого места
		tasksFromList.splice(indexNew, 0, currentValue);	//вставка на новое место
		
		set({
			tasks: tasksFromList.concat(tasksWithoutCurrentList),
		});		
	},
	changeList: (id: string, listIdNew: number, indexNew: number) => {
		const { tasks } = get();	
		
		set({
			tasks: tasks.map((task) => ({
				...task,
				listId: task.id === id ? listIdNew : task.listId,
			})),
		});
	},
})));
