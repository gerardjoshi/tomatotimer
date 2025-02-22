import tomatopic from "./tomato.png";
import "./App.css";
import EditableTimer from "./EditableTimer";
import { useState } from "react";

const Apple = () => {
  const [isFirstTimerActive, setIsFirstTimerActive] = useState(true);
  const [startTrigger, setStartTrigger] = useState(false);
  const [pauseTrigger, setPauseTrigger] = useState(false);

  const handleStart = () => {
    setStartTrigger((prev) => !prev); // Toggle to trigger start
    setPauseTrigger(false);
  };

  const handlePause = () => {
    setPauseTrigger((prev) => !prev); // Toggle to trigger pause
    setStartTrigger(false);
  };

  const handleTimerFinish = () => {
    setIsFirstTimerActive((prev) => !prev); // Swap active timer
    setStartTrigger((prev) => !prev); // Restart the next timer
  };

  return (
    <>
      <div className="bigapple">
        <img src={tomatopic} className="tomatopic"></img>
        <div className="headingone">Work</div>{" "}
        <div className="timerone">
          <EditableTimer
            onStart={() => console.log("Timer Started")}
            onPause={() => console.log("Timer Paused")}
            startTrigger={startTrigger}
            pauseTrigger={pauseTrigger}
            
          ></EditableTimer>
        </div>
        <div className="timertwo">
          <EditableTimer
            onStart={() => console.log("Second Timer Started")}
            onPause={() => console.log("Second Timer Paused")}
            startTrigger={!isFirstTimerActive && startTrigger}
            pauseTrigger={pauseTrigger}
          />
        </div>
        <div className="headingtwo">Play</div>
        <div className="butons">
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Start Timer
          </button>
          <button
            onClick={handlePause}
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
