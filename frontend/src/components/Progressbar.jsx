import React, { useEffect, useState } from 'react';

const TaskProgressBar = ({ startTime, endTime }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = new Date().getTime(); // Current time in milliseconds
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      const calculatedProgress = ((currentTime - start) / (end - start)) * 100;

      setProgress(Math.min(100, Math.max(0, calculatedProgress))); // Clamp between 0% and 100%
    };

    updateProgress(); // Initial calculation
    const interval = setInterval(updateProgress, 60000); // Update every 1 minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [startTime, endTime]);

  return (
    <div className="task-progress-container">
      <div
        className="task-progress-bar"
        style={{ width: `${progress}%`, backgroundColor: progress >= 100 ? 'green' : 'blue' }}
      ></div>
      <span>{Math.round(progress)}%</span>
    </div>
  );
};

export default TaskProgressBar;
