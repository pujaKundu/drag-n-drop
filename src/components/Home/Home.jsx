import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const container = document.getElementById('container');
      const containerRect = container.getBoundingClientRect();

      // new position of draggable div
      let newX = e.clientX - containerRect.left - 25;
      let newY = e.clientY - containerRect.top - 25;

      // keep draggable div inside the container
      newX = Math.max(0, Math.min(newX, containerRect.width - 50));
      newY = Math.max(0, Math.min(newY, containerRect.height - 50));

      setPosition({
        x: newX,
        y: newY,
      });
    }
  };

  return (
    <div
      id='container'
      className='outer-div'
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className='inner-div'
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default Home;
