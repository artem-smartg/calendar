
import { observable, action, makeObservable, runInAction, computed } from "mobx";
import { Day } from "../type/calendar.type";
import { format } from "date-fns";
import calendarService from "../services/Calendar.services";


class CalendarStore {
    days = [] as Day[];
    selectedCountry = "US";
    weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    normalizeDate = (date: string | Date) => format(new Date(date), "yyyy-MM-dd");

    constructor() {
        makeObservable(this, {
            days: observable,
            weekdays: observable,
            selectedCountry: observable,
            fetchData: action,
            addTask: action,
            setDays: action,
            currentMonth: computed,
            currentYear: computed,
        });
    }

    setDays(days: Day[]) { this.days = days }

    get currentMonth() {
        if (this.days.length > 0) {
            return new Date(this.days[0].date).toLocaleString("en-US", { month: "short" });
        }
        return "";
    }

    get currentYear() {
        if (this.days.length > 0) {
            return new Date(this.days[0].date).getFullYear();
        }
        return new Date().getFullYear();
    }

    updateDay(day: Day) {
        const index = this.days.findIndex((d) => d.date === day.date);
        if (index > -1) {
            this.days[index] = day;
        }
    }

    async fetchData(countryCode: string) {
        try {
            const year = new Date().getFullYear();
            const response = await calendarService.fetchCalendaDay(year, countryCode);

            const longWeekends = response.data;

            const calendarDays = this.generateDaysInMonth(0, 2024).map((date) => {
                const longWeekend = longWeekends.find(
                    (lw: any) =>
                        this.normalizeDate(lw.startDate) <= date &&
                        this.normalizeDate(lw.endDate) >= date
                );

                return {
                    date,
                    isHoliday: !!longWeekend,
                    isLongWeekend: !!longWeekend,
                    tasks: [],
                    longWeekendDetails: longWeekend || null,
                };
            });

            runInAction(() => {
                this.days = calendarDays;
            });
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }

    private generateDaysInMonth(month: number, year: number): string[] {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) =>
            this.normalizeDate(new Date(year, month, i + 1))
        );
    }

    addTask(task: { date: string; title: string; labels: string[] }) {
        const normalizedDate = this.normalizeDate(task.date);
        const day = this.days.find((d) => d.date === normalizedDate);

        if (day) {
            runInAction(() => {
                if (!day.tasks) {
                    day.tasks = [];
                }
    
                day.tasks.push({
                    id: `${Date.now()}`,
                    title: task.title,
                    labels: task.labels,
                });
            });
        } else {
            console.error(`День с датой ${normalizedDate} не найден.`);
        }
    }


}

export default CalendarStore

