import { ICalendar, IEvent } from "../backend";

export interface ICalendarScreenState {
  calendars: ICalendar[];
  calendarsSelected: boolean[];
  events: IEvent[];
}

type ICalendarScreenAction =
  | {
      type: "load";
      payload: { events: IEvent[]; calendars: ICalendar[] };
    }
  | {
      type: "edit";
      payload: IEvent;
    }
  | {
      type: "toggleCalendar";
      payload: number;
    };

export function reducer(state: ICalendarScreenState, action: ICalendarScreenAction): ICalendarScreenState {
  switch (action.type) {
    case "load":
      return {
        ...state,
        events: action.payload.events,
        calendars: action.payload.calendars,
        calendarsSelected: action.payload.calendars.map(() => true),
      };
    case "edit":
      return { ...state };
    default:
      return state;
  }
}
