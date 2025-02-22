import tomatopic from "./tomato.png";
import "./App.css";
import EditableTimer from "./EditableTimer";
import { useState } from "react";
import { useEffect } from "react";

const Apple = () => {
  const [activeTimer, setActiveTimer] = useState<"work" | "break">("work");
  const [workStartTrigger, setWorkStartTrigger] = useState(false);
  const [breakStartTrigger, setBreakStartTrigger] = useState(false);
  const [pauseTrigger, setPauseTrigger] = useState(false); // starts from paused state
  const [resetTrigger, setResetTrigger] = useState(false);
  const [wasPausedTimer, setWasPausedTimer] = useState<"work" | "break" | null>(
    null
  ); // Track paused timer

  // Start Timer (Resumes from the paused one or starts fresh)
  const startTimer = () => {
    if (wasPausedTimer) {
      if (wasPausedTimer === "work") {
        setWorkStartTrigger(true);
      } else {
        setBreakStartTrigger(true);
      }
      setWasPausedTimer(null);
    } else {
      setWorkStartTrigger(true); // Always start work timer first if not paused
    }
    setPauseTrigger(false);
  };

  // Pause Timer
  const pauseTimers = () => {
    setPauseTrigger(true);
    setWasPausedTimer(activeTimer); // Store which timer was running
    setWorkStartTrigger(false);
    setBreakStartTrigger(false);
  };

  // Handle when a timer finishes
  const handleTimerEnd = () => {
    setResetTrigger(true); // Reset current timer
  };

  // Ensure reset finishes before switching timers
  useEffect(() => {
    if (resetTrigger) {
      setTimeout(() => {
        setResetTrigger(false);
        setActiveTimer((prev) => (prev === "work" ? "break" : "work")); // Swap timers
      }, 100);
    }
  }, [resetTrigger]);

  // Automatically start the next timer **AFTER** reset completes
  useEffect(() => {
    if (!resetTrigger) {
      setTimeout(() => {
        if (activeTimer === "work") {
          setWorkStartTrigger(true);
          setBreakStartTrigger(false);
        } else {
          setBreakStartTrigger(true);
          setWorkStartTrigger(false);
        }
      }, 200);
    }
  }, [activeTimer, resetTrigger]);

  return (
    <>
      <div className="bigapple">
        <img src={tomatopic} className="tomatopic"></img>
        <div className="headingone">Work</div>{" "}
        <div className="timerone">
          <EditableTimer
            onStart={() => console.log("Work timer started")}
            onPause={() => console.log("Work timer paused")}
            startTrigger={workStartTrigger}
            pauseTrigger={pauseTrigger}
            resetTrigger={resetTrigger && activeTimer === "work"}
            onTimerEnd={handleTimerEnd}
          />
        </div>
        <div className="timertwo">
          <EditableTimer
            onStart={() => console.log("Break timer started")}
            onPause={() => console.log("Break timer paused")}
            startTrigger={breakStartTrigger}
            pauseTrigger={pauseTrigger}
            resetTrigger={resetTrigger && activeTimer === "break"}
            onTimerEnd={handleTimerEnd}
          />
        </div>
        <div className="headingtwo">Play</div>
        <div className="butons">
          <button
            onClick={startTimer}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Start Timer
          </button>
          <button
            onClick={pauseTimers}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Pause Timer
          </button>
        </div>
      </div>
    </>
  );
};

export default Apple;
