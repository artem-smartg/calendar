import axios, { AxiosResponse } from "axios";


class CalendarServices {
    private baseUrl = "https://date.nager.at/api/v3";

    async fetchCalendaDay(year: number, countryCode:string): Promise<AxiosResponse<[]>> {
        try {
            return await axios.get(`${this.baseUrl}/LongWeekend/${year}/${countryCode}`);
        } catch (error) {
            console.error("Ошибка при вызове API:", error);
            throw error;
        }
    }
}

const calendarService = new CalendarServices();
export default calendarService