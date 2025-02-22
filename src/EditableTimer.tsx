import { useState, useEffect } from "react";

interface TimerProps {
  onStart: () => void;
  onPause: () => void;
  startTrigger: boolean;
  pauseTrigger: boolean;
  onTimerEnd: () => void;
  resetTrigger: boolean; // New prop to reset timer
}

export default function EditableTimer({
  onStart,
  onPause,
  startTrigger,
  pauseTrigger,
  onTimerEnd,
  resetTrigger,
}: TimerProps) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editing, setEditing] = useState<"minutes" | "seconds" | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setIsRunning(false);
              onTimerEnd(); // Notify parent that this timer finished
              return 0;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, minutes]);

  useEffect(() => {
    if (startTrigger) {
      setIsRunning(true);
      onStart();
    }
  }, [startTrigger]);

  useEffect(() => {
    if (pauseTrigger) {
      setIsRunning(false);
      onPause();
    }
  }, [pauseTrigger]);

  useEffect(() => {
    if (resetTrigger) {
      resetTimer();
    }
  }, [resetTrigger]);

  const handleEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "minutes" | "seconds"
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value < 60) {
      if (type === "minutes") {
        setMinutes(value);
        setInitialMinutes(value); // Store initial value for reset
      } else {
        setSeconds(value);
        setInitialSeconds(value); // Store initial value for reset
      }
    }
  };

  const resetTimer = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div className="text-4xl font-mono cursor-pointer flex space-x-2">
      {editing === "minutes" ? (
        <input
          type="number"
          value={minutes}
          onChange={(e) => handleEdit(e, "minutes")}
          onBlur={() => setEditing(null)}
          autoFocus
          className="w-16 text-center bg-transparent border-b border-gray-500 focus:outline-none"
        />
      ) : (
        <span onClick={() => setEditing("minutes")} className="px-2">
          {String(minutes).padStart(2, "0")}
        </span>
      )}
      :
      {editing === "seconds" ? (
        <input
          type="number"
          value={seconds}
          onChange={(e) => handleEdit(e, "seconds")}
          onBlur={() => setEditing(null)}
          autoFocus
          className="w-16 text-center bg-transparent border-b border-gray-500 focus:outline-none"
        />
      ) : (
        <span onClick={() => setEditing("seconds")} className="px-2">
          {String(seconds).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
