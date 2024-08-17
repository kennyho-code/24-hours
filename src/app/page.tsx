"use client";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-yellow-50">
      <div className="flex gap-2">
        <TimeLine />
      </div>
    </main>
  );
}

function Calendar({ calendar }: { calendar: CalendarEvent[] }) {
  function getHoursRemaining() {
    const hoursTaken = calendar
      .map((calendarEvent) => calendarEvent.end - calendarEvent.start + 1)
      .reduce((acc, curr) => acc + curr, 0);
    return 24 - hoursTaken;
  }

  return (
    <div className="flex flex-col">
      {JSON.stringify(calendar)}
      <h2>Analysis</h2>
      <span>Hours Left: {getHoursRemaining()}</span>
    </div>
  );
}

type CalendarEvent = {
  hours: number[];
  start: number;
  end: number;
  name: string;
  description: string;
};

function TimeLine() {
  const [calendar, setCalendar] = useState<CalendarEvent[]>([]);
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
  const [toggleEventForm, setToggleEventForm] = useState<boolean>(false);

  function handleClick(hour: number) {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h != hour));
    } else {
      const newSelectedHours = [...selectedHours, hour];
      setSelectedHours(newSelectedHours);
    }
  }

  function handleNewEvent() {
    setToggleEventForm(!toggleEventForm);
  }

  function confirmEvent(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name-input") as string;
    const description = formData.get("description-input") as string;
    let start = Math.min(...selectedHours);
    let end = Math.max(...selectedHours);

    const newCalendar = [...calendar];
    newCalendar.push({
      hours: selectedHours,
      start,
      end,
      description,
      name,
    });
    setCalendar(newCalendar);
    setSelectedHours([]);
    setToggleEventForm(false);
  }

  return (
    <div className="">
      <div>
        <div className="sticky top-0 bg-slate-50">
          <div className="flex justify-between">
            <span>Selected Hours: {selectedHours.join(", ")}</span>
            <button
              onClick={handleNewEvent}
              className="bg-pink-50 rounded-lg px-4 py-2 mb-4 sticky"
            >
              Add Event
            </button>
          </div>
          {toggleEventForm && (
            <form
              onSubmit={confirmEvent}
              className="flex flex-col gap-4 items-center rounded-lg border-2 mb-4 p-4 "
            >
              <div>
                <label className="block" htmlFor="name-input">
                  Name:{" "}
                </label>
                <input type="text" name="name-input"></input>
              </div>
              <div>
                <label htmlFor="description-input" className="block">
                  Description:{" "}
                </label>
                <input type="text" name="description-input"></input>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="border-2 rounded-lg px-4 py-2 bg-pink-50"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setToggleEventForm(false);
                  }}
                  className="border-2 rounded-lg px-4 py-2 bg-pink-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        {Array(24)
          .fill(null)
          .map((_, idx) => (
            <span key={idx}>
              <Hours
                hour={idx}
                onClick={() => handleClick(idx)}
                selected={selectedHours.includes(idx)}
                confirmed={calendar.some((calendarEvent) =>
                  calendarEvent.hours.includes(idx)
                )}
              />
            </span>
          ))}
      </div>
      <Calendar calendar={calendar} />
    </div>
  );
}

function Hours({
  selected,
  confirmed,
  hour,
  onClick,
}: {
  hour: number;
  onClick: () => void;
  selected: boolean;
  confirmed?: boolean;
}) {
  return (
    <button
      className={`w-[500px] h-[100px] flex justify-center items-center ${
        selected ? "hover:bg-green-50" : "hover:bg-blue-50"
      } ${selected ? "bg-green-100" : "bg-blue-100"} ${
        confirmed ? "bg-red-100" : "bg-blue-100"
      }`}
      onClick={onClick}
    >
      {hour}: 00
    </button>
  );
}
