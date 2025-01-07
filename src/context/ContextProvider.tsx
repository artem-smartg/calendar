import React, { FC } from 'react'
import { ContextProviderProps, ContextType } from '../type/context.type';
import CalendarStore from '../store/Calendar.store';
import DragAndDropStore from '../store/DragAndDrop.store';
import TaskModalStore from '../store/TaskModal.store';


export const Context = React.createContext<ContextType | null>(null)

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {

    const calendarStore = new CalendarStore()
    const dragDropStore = new DragAndDropStore(calendarStore)
    const taskModalStore = new TaskModalStore()

    return (
        <Context.Provider value={{
            calendar: calendarStore,
            dragDrop: dragDropStore,
            taskModal: taskModalStore
        }}>
            {children}
        </Context.Provider>
    )
}
