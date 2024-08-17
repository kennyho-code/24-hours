"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-yellow-50">
      <TimeLine />
    </main>
  );
}

function TimeLine() {
  const [selectedHours, setSelectedHours] = useState<number[]>([]);

  function handleClick(hour: number) {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h != hour));
    } else {
      const newSelectedHours = [...selectedHours, hour];
      setSelectedHours(newSelectedHours);
    }
  }

  return (
    <div className="">
      <div className="flex justify-between sticky top-0">
        <span>Selected Hours: {selectedHours.join(", ")}</span>
        <button className="bg-pink-50 rounded-lg px-4 py-2 mb-4 sticky">
          Add Event
        </button>
      </div>
      {Array(24)
        .fill(null)
        .map((_, idx) => (
          <span key={idx}>
            <Hours
              hour={idx + 1}
              onClick={() => handleClick(idx + 1)}
              selected={selectedHours.includes(idx + 1)}
            />
          </span>
        ))}
    </div>
  );
}

function Hours({
  selected,
  hour,
  onClick,
}: {
  hour: number;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      className={`w-[500px] h-[100px] flex justify-center items-center ${
        selected ? "hover:bg-green-50" : "hover:bg-blue-50"
      } ${selected ? "bg-green-100" : "bg-blue-100"}`}
      onClick={onClick}
    >
      {hour}: 00
    </button>
  );
}
