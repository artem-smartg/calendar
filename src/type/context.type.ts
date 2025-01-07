import { ReactNode } from 'react'
import dnDStore from '../store/DragAndDrop.store';
import taskModal from '../store/TaskModal.store';
import calendarStore from '../store/Calendar.store';


export interface ContextType {
    calendar: calendarStore;
    dragDrop: dnDStore
    taskModal: taskModal
}

export interface ContextProviderProps {
    children: ReactNode;
}