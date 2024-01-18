import React, { useState } from 'react';


function Test() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState('top');

  const handleDrag = (e) => {
    const { clientX, clientY } = e;
    const containerRect = document.getElementById('container').getBoundingClientRect();
    const elementRect = document.getElementById('draggable').getBoundingClientRect();

    const x = Math.max(0, Math.min(clientX - containerRect.left, containerRect.width - elementRect.width));
    const y = Math.max(0, Math.min(clientY - containerRect.top, containerRect.height - elementRect.height));

    setPosition({ x, y });

    // Determine tooltip position based on element's position relative to container
    if (y === 0) {
      setTooltipPosition('bottom');
    } else if (x === containerRect.width - elementRect.width) {
      setTooltipPosition('left');
    } else if (x === 0) {
      setTooltipPosition('right');
    } else {
      setTooltipPosition('top');
    }
  };

  return (
    <div id="container" style={{ position: 'relative', width: '600px', height: '600px', border: '1px solid' }}>
      <div
        id="draggable"
        style={{
          position: 'absolute',
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: 'move',
        }}
        onMouseMove={(e) => handleDrag(e)}
      >
        Hover me
      </div>
      {position.x !== 0 || position.y !== 0 ? (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            pointerEvents: 'none',
            zIndex: 2,
            left: tooltipPosition === 'right' ? `${position.x + 50}px` : `${position.x}px`,
            top: tooltipPosition === 'bottom' ? `${position.y + 50}px` : `${position.y}px`,
          }}
        >
          Tooltip
        </div>
      ) : null}
    </div>
  );
}

export default Test;
