import { useState, useRef, useEffect } from "react";
import Selector from "../Selector/Selector";
import { createPortal } from "react-dom";
import { resizeHandler } from "../../utils/resizeHandler";
import "./Home.css";
import { handleDragContainer } from "../../utils/dragDrop";
import dnd from "../../assets/drag.png";
import resize from "../../assets/resize.png";
import Tooltip from "../Tooltip/Tooltip";

const Home = () => {
  const containerRef = useRef(null);
  const innerDivRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isInnerDivHovered, setIsInnerDivHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState("top");

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

  const handleCornerMouseDown = (e) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;

    positionRef.current = { x: offsetX, y: offsetY };

    resizeHandler(e, "right", containerRef, innerDivRef);
    resizeHandler(e, "bottom", containerRef, innerDivRef);
  };

  console.table(position);

  return (
    <>
      {createPortal(
        <Tooltip
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          selectedOption={selectedOption}
          position={position}
          containerRef={containerRef}
          innerDivRef={innerDivRef}
          tooltipVisible={tooltipVisible}
          isInnerDivHovered={isInnerDivHovered}
        />,
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
        <img
          src={resize}
          style={{
            height: "15px",
            width: "15px",
            position: "absolute",
            bottom: "0",
            right: "0",
            cursor: "se-resize",
            margin: "5px",
          }}
          onMouseDown={handleCornerMouseDown}
          onMouseUp={handleMouseUp}
        />
        <img
          src={dnd}
          style={{
            height: "20px",
            width: "20px",
            position: "absolute",
            right: "5px",
            top: "5px",
            cursor: "grab",
          }}
          onMouseDown={(e) => handleDragContainer(e, containerRef)}
        />

        <div
          className="resize-handle right-resize"
          onMouseDown={(e) =>
            resizeHandler(e, "right", containerRef, innerDivRef)
          }
        ></div>
        <div
          className="resize-handle bottom-resize"
          onMouseDown={(e) =>
            resizeHandler(e, "bottom", containerRef, innerDivRef)
          }
        ></div>

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
