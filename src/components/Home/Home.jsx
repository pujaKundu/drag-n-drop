import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Home.css";

const Home = () => {
  const containerRef = useRef(null);
  const innerDivRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isInnerDivHovered, setIsInnerDivHovered] = useState(false);

  // console.log(position);
  // console.log(dragging);
  // console.log('set vis', tooltipVisible);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (containerRect) {
          const newX = e.clientX - containerRect.left - 25;
          const newY = e.clientY - containerRect.top - 25;

          const clampedX = Math.max(
            0,
            Math.min(newX, containerRect.width - 100)
          );
          const clampedY = Math.max(
            0,
            Math.min(newY, containerRect.height - 50)
          );

          setPosition({ x: clampedX, y: clampedY });
        }

        setTooltipVisible(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging]);

  const handleMouseDown = () => {
    setDragging(true);
    setTooltipVisible(false);
  };

  const handleMouseUp = () => {
    setDragging(false);
    const newPosition = { x: position.x, y: position.y };
    setTooltipPosition(newPosition);
    positionRef.current = newPosition;

    setTooltipVisible(true);
    setIsInnerDivHovered(true);
  };

  const handleMouseEnter = () => {
    if (
      !dragging &&
      (position.x !== positionRef.current.x ||
        position.y !== positionRef.current.y)
    ) {
      setTooltipVisible(true);
    }

    setIsInnerDivHovered(true);
  };

  const handleMouseLeave = () => {
    if (!dragging) {
      setTooltipVisible(false);
    }

    setIsInnerDivHovered(false);
  };

  const tooltipStyle = {
    top: `${
      position.y >= 0 && position.y <= 60
        ? tooltipPosition.y +
          (containerRef?.current?.getBoundingClientRect()?.top || 0) +
          60
        : tooltipPosition.y +
          (containerRef?.current?.getBoundingClientRect()?.top || 0) -
          40
    }px`,
    left: `${
      tooltipPosition.x +
      (containerRef?.current?.getBoundingClientRect()?.left - 5 || 0)
    }px`,
    display: tooltipVisible && isInnerDivHovered ? "block" : "none",
  };

  return (
    <>
      {createPortal(
        <div
          className={`tooltip `}
          style={tooltipStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          This is tooltip
        </div>,
        document.body
      )}
      <div
        id="container"
        className="outer-div"
        ref={containerRef}
        onMouseUp={handleMouseUp}
      >
        <div
          className="inner-div"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={innerDivRef}
        ></div>
      </div>
    </>
  );
};

export default Home;
