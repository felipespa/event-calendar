import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Icon,
  IconButton,
  Avatar,
} from "@mui/material";
import { ICalendar, IEvent, getCalendarsEndpoint, getEventsEndpoint } from "../backend";
import { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";

type IEventWithCalendar = IEvent & { calendar: ICalendar };

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}

function generateCalendar(date: string, allEvents: IEvent[], calendars: ICalendar[], calendarsSelected: boolean[]): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "2024-01-01T10:00:00");
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);

  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < days_of_week.length; i++) {
      const yearStr = currentDay.getFullYear();
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");

      const isoDate = `${yearStr}-${monthStr}-${dayStr}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const callIndex = calendars.findIndex((cal) => cal.id === event.calendarId);
          if (calendarsSelected[callIndex]) {
            events.push({ ...event, calendar: calendars[callIndex] });
          }
        }
      }
      week.push({
        date: isoDate,
        dayOfMonth: currentDay.getDate(),
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

function getToday() {
  return "2024-01-01";
}

// function addMonths(month: string, increment: number) {
//implement logic
// }

const days_of_week = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

// const CalendarTable = styled(TableContainer)(() => ({
//   "&.MuiTableContainer-root": {
//     height: "100%",
//   },

//   "&.MuiTable-root": {
//     thead: {
//       // display: "none",
//     },
//   },
// }));

export default function Calendar() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);

  const weeks = generateCalendar(getToday(), events, calendars, calendarsSelected);
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([getCalendarsEndpoint(), getEventsEndpoint(firstDate, lastDate)]).then(([calendars, events]) => {
      setCalendarsSelected(calendars.map(() => true));
      setCalendars(calendars);
      setEvents(events);
    });
  }, [firstDate, lastDate]);

  function toggleCalendar(index: number) {
    const newValue = [...calendarsSelected];
    newValue[index] = !newValue[index];
    setCalendarsSelected(newValue);
  }

  return (
    <Box display="flex" alignItems="stretch" height="100%">
      <Box width="16em" padding="0.8rem 1rem">
        <h2>Projeto Agenda</h2>
        <Button variant="contained" color="primary">
          Novo evento
        </Button>

        <Box marginTop="64px">
          <h3>Agendas</h3>
          {calendars.map((calendar, i) => (
            <FormControlLabel
              control={<Checkbox style={{ color: calendar.color }} checked={calendarsSelected[i]} onChange={() => toggleCalendar(i)} />}
              label={calendar.name}
              key={calendar.id}
            />
          ))}
        </Box>
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" padding="0.3rem">
          <Box>
            <IconButton aria-label="Mês anterior">
              <Icon>chevron-left</Icon>
            </IconButton>
            <IconButton aria-label="Próximo mês">
              <Icon>chevron-right</Icon>
            </IconButton>
          </Box>

          <Box flex="1" component="h3" marginLeft="0.3rem">
            Janeiro 2024
          </Box>
          <IconButton aria-label="Usuário">
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>

        <TableContainer style={{ flex: "1" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {days_of_week.map((day) => (
                  <TableCell key={day} align="center">
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks.map((week, i) => (
                <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {week.map((cell) => (
                    <TableCell key={cell.dayOfMonth} component="th" scope="row">
                      <div className="dayOfMonth">{cell.dayOfMonth}</div>

                      {cell.events.map((event) => {
                        const color = event.calendar.color;

                        return (
                          <button className="event" key={event.id}>
                            <Icon style={{ color }} fontSize="inherit">
                              watch_later
                            </Icon>
                            <Box component="span" margin="0 0.2rem">
                              {event.time}
                            </Box>
                            <span>{event.description}</span>
                          </button>
                        );
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
