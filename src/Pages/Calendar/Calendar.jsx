import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper, Stack, Typography, Box } from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import Header from "../../Components/Header";
function renderEventContent(eventInfo) {
  return (
    <Box sx={{ fontSize: "12px", lineHeight: 1.2 }}>
      <b>{eventInfo.timeText}</b>
      <div>{eventInfo.event.title}</div>
    </Box>
  );
}
function renderSidebarEvent(event) {
  return (
    <li
      key={event.id}
      style={{
        padding: "8px",
        borderRadius: "10px",
        marginBottom: "6px",
        background: "var(--fourthGrad)",
        color: "#fff",
        boxShadow: "var(--secondary-shadow)",
      }}
    >
      <b style={{ display: "block", fontSize: "12px" }}>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <span style={{ fontSize: "13px" }}>{event.title}</span>
    </li>
  );
}

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  let eventGuid = 0;
  const createEventId = () => String(eventGuid++);

  const handleDateSelect = (selectInfo) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`Delete event '${clickInfo.event.title}' ?`)) {
      clickInfo.event.remove();
    }
  };

  return (
    <Box>
      <Header title={"Calendar"} description={"List of Events"} />
      <Stack
        sx={{
          p: { xs: 1, sm: 2 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        
        <Paper
          sx={{
            width: { xs: "100%", md: 260 },
            p: 2,
            borderRadius: "8px",
            background: "var(--backColor)",
            boxShadow: "var(--secondary-shadow)",
            border: "1px solid var(--border-color)",
            order: { xs: 1, md: 0 },
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "var(--main-color)", mb: 2 }}
          >
            All Events ({currentEvents.length})
          </Typography>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </Paper>

        
        <Paper
          sx={{
            flex: 1,
            minWidth: 0,
            p: { xs: 2, sm: 2 },
            borderRadius: "16px",
            background: "var(--backColor)",
            boxShadow: "var(--secondary-shadow)",
            border: "1px solid var(--border-color)",
            marginLeft: { lg: "10px", md: "10px", xs: "0px", sm: "0px" },
            marginBottom: { xs: "10px", sm: "10px" },
            "& .fc-toolbar": {
              flexWrap: "wrap",
              gap: 10,
            },

            "& .fc-toolbar-title": {
              width: "100%",
              textAlign: "center",
              color: "var(--main-color)",
              fontWeight: 600,
            },

            "& .fc-button": {
              background: "transparent",
              border: "1px solid var(--border-color)",
              color: "var(--main-color)",
              borderRadius: "10px",
              fontSize: { xs: "11px", sm: "13px" },
              padding: "4px 8px",
            },

            "& .fc-theme-standard td, & .fc-theme-standard th": {
              border: "1px solid var(--border-color)",
            },

            "& .fc-event": {
              background: "var(--fourthGrad)",
              border: "none",
              borderRadius: "8px",
              padding: "2px 4px",
              boxShadow: "var(--secondary-shadow)",
              fontSize: { xs: "10px", sm: "12px" },
            },
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            height="auto"
            editable
            selectable
            selectMirror
            dayMaxEvents
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={setCurrentEvents}
          />
        </Paper>
      </Stack>
    </Box>
  );
};

export default Calendar;
