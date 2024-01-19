import React, { useState, useRef, useEffect } from "react";
import Selector from "../Selector/Selector";
import { createPortal } from "react-dom";
import {resizeHandler} from '../../utils/resizeHandler'
import "./Home.css";

const Home = () => {
  const containerRef = useRef(null);
  const innerDivRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const containerRefBottom = containerRef?.current?.getBoundingClientRect().bottom ;
  const innerRefBottom = innerDivRef?.current?.getBoundingClientRect().bottom ;
  const containerRefLeft = containerRef?.current?.getBoundingClientRect().left ;
  const innerRefLeft = innerDivRef?.current?.getBoundingClientRect().left ;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isInnerDivHovered, setIsInnerDivHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState("top");

  console.log(position)
  
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
    if (!dragging) {
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

  const updatedPosition = () => {
    switch (selectedOption) {
      case "top":
        return {
          top: `${
            position.y >= 0 && position.y <= 60
              ? position.y +
                (containerRef?.current?.getBoundingClientRect()?.top || 0) +
                60
              : position.y +
                (containerRef?.current?.getBoundingClientRect()?.top || 0) -
                40
          }px`,
          left: `${
            position.x +
            (containerRef?.current?.getBoundingClientRect()?.left - 5 || 0)
          }px`,
        };
      case "bottom":
        return {
          top: `${
            containerRefBottom - innerRefBottom <=100
              ? position.y +
                (containerRef?.current?.getBoundingClientRect()?.top || 0) -
                40
              : position.y +
                (containerRef?.current?.getBoundingClientRect()?.top || 0) +
                60
          }px`,
          left: `${
            position.x +
            (containerRef?.current?.getBoundingClientRect()?.left - 5 || 0)
          }px`,
        };
      case "left":
        return {
          top: `${
            position.y +
            (containerRef?.current?.getBoundingClientRect()?.top || 0) +
            10
          }px`,
          left: `${
            position.x >= 0 && position.x <= 110
              ? position.x +
                (containerRef?.current?.getBoundingClientRect()?.left || 0) +
                120
              : position.x +
                (containerRef?.current?.getBoundingClientRect()?.left || 0) -
                120
          }px`,
        };
      case "right":
        return {
          top: `${
            position.y +
            (containerRef?.current?.getBoundingClientRect()?.top || 0) +
            10
          }px`,
          left: `${
            position.x >= 400 && position.x <= 505
              ? position.x +
                (containerRef?.current?.getBoundingClientRect()?.left || 0) -
                120
              : position.x +
                (containerRef?.current?.getBoundingClientRect()?.left || 0) +
                120
          }px`,
        };
      default:
        return {};
    }
  };

  const tooltipStyle = {
    ...updatedPosition(),
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
      <Selector setSelectedOption={setSelectedOption} />
      <div
        id="container"
        className="outer-div"
        style={{
          boxShadow: `${dragging ? "2px 3px 20px rgb(36, 171, 201)" : ""}`,
          minWidth: "300px",
          minHeight: "300px",
        }}
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
        {/* Resize handles */}
        <div
          className="resize-handle right-resize"
          onMouseDown={(e) => resizeHandler(e, "right", containerRef,innerDivRef)}
        ></div>
        <div
          className="resize-handle bottom-resize"
          onMouseDown={(e) => resizeHandler(e, "bottom", containerRef,innerDivRef)}
        ></div>
      </div>
    </>
  );
};

export default Home;
