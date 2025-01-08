export interface Day {
    date: string;
    isHoliday: boolean;
    isLongWeekend: boolean;
    showMonth?: boolean;
    tasks?: Task[];
}

export interface DayProps {
    day: Day,
    onClick?: () => void;
}

export interface Task {
    id: string;
    title: string;
    labels: string[];
    isMatched?: boolean
}