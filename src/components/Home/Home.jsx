import React, { useState, useEffect, useRef } from "react";
import Tooltip from "../Tooltip/Tooltip";
import dnd from "../../assets/drag.png";
import "./Home.css";
import ResizeHandlers from "./ResizeHandlers";

const Home = ({ selectedOption }) => {
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);

  const [innerDivPosition, setInnerDivPosition] = useState({ x: 250, y: 250 });
  const [rel, setRel] = useState({ x: null, y: null });

  const [containerPosition, setcontainerPosition] = useState({
    x: 420,
    y: 110,
  });
  const [containerRel, setContainerRel] = useState({ x: null, y: null });

  const containerRef = useRef(null);
  const innerDivRef = useRef(null);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isInnerDivHovered, setIsInnerDivHovered] = useState(false);

  const [containerDragging, setContainerDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState("");
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(600);
  const [containerHeight, setContainerHeight] = useState(600);

  const handleMouseDown = (handle, e) => {
    if (e.button !== 0) return;
    setResizing(true);
    setResizeHandle(handle);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    setContainerWidth(containerRef.current?.offsetWidth || 0);
    setContainerHeight(containerRef.current?.offsetHeight || 0);
    setcontainerPosition({
      x: containerRef.current?.offsetLeft || 0,
      y: containerRef.current?.offsetTop || 0,
    });

    e.preventDefault();
    setInnerDivPosition({
      x: innerDivRef.current?.offsetLeft || 0,
      y: innerDivRef.current?.offsetTop || 0,
    });
  };

  let totalShiftX = 0;
  let totalShiftY = 0;

  const handleMouseMove = (e) => {
    if (!resizing) return;
    let differenceX = e.clientX - initialMousePos.x;
    let differenceY = e.clientY - initialMousePos.y;
    let newWidth = containerWidth;
    let newHeight = containerHeight;

    if (resizeHandle.includes("left")) {
      newWidth -= differenceX;
      if (newWidth < 100) {
        newWidth = 100;
        differenceX = containerWidth - newWidth;
      }
      containerRef.current?.style.setProperty(
        "left",
        `${containerPosition.x + differenceX}px`
      );
      containerRef.current?.style.setProperty("width", `${newWidth}px`);

      let newPosition = innerDivPosition.x - differenceX - totalShiftX;
      if (newPosition < 0) {
        totalShiftX += newPosition;
        newPosition = 0;
      }

      innerDivRef.current?.style.setProperty("left", `${newPosition}px`);
    }

    if (resizeHandle.includes("right")) {
      newWidth += differenceX;
      if (newWidth < 100) {
        newWidth = 100;
        differenceX = containerWidth - newWidth;
      }
      containerRef.current?.style.setProperty("width", `${newWidth}px`);

      const innerDivPos = innerDivRef.current?.offsetLeft || 0;
      const innerDivWidth = innerDivRef.current?.offsetWidth || 0;

      if (newWidth < innerDivPos + innerDivWidth) {
        innerDivRef.current?.style.setProperty(
          "left",
          `${newWidth - innerDivWidth}px`
        );
      }
    }
    if (resizeHandle.includes("top")) {
      newHeight -= differenceY;
      if (newHeight < 100) {
        newHeight = 100;
        differenceY = containerHeight - newHeight;
      }
      containerRef.current?.style.setProperty(
        "top",
        `${containerPosition.y + differenceY}px`
      );
      containerRef.current?.style.setProperty("height", `${newHeight}px`);

      let newPosition = innerDivPosition.y - differenceY - totalShiftY;
      if (newPosition < 0) {
        totalShiftY += newPosition;
        newPosition = 0;
      }

      innerDivRef.current?.style.setProperty("top", `${newPosition}px`);
    }
    if (resizeHandle.includes("bottom")) {
      newHeight += differenceY;
      if (newHeight < 100) {
        newHeight = 100;
        differenceY = containerHeight - newHeight;
      }
      containerRef.current?.style.setProperty("height", `${newHeight}px`);

      const innerDivPos = innerDivRef.current?.offsetTop || 0;
      const innerDivHeight = innerDivRef.current?.offsetHeight || 0;

      if (newHeight < innerDivPos + innerDivHeight) {
        innerDivRef.current?.style.setProperty(
          "top",
          `${newHeight - innerDivHeight}px`
        );
      }
    }
    containerRef.current?.style.setProperty("width", `${newWidth}px`);
    containerRef.current?.style.setProperty("height", `${newHeight}px`);

    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    setResizing(false);
    e.preventDefault();

    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
    }

    setInnerDivPosition({
      x: innerDivRef.current?.offsetLeft || 0,
      y: innerDivRef.current?.offsetTop || 0,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, handleMouseMove, handleMouseUp]);

  const onContainerMouseDown = (e) => {
    if (e.button !== 0) return;
    if (containerRef.current) {
      const positionX = e.clientX - containerRef.current.offsetLeft;
      const positionY = e.clientY - containerRef.current.offsetTop;
      setContainerDragging(true);
      setContainerRel({ x: positionX, y: positionY });
    }
    e.preventDefault();
  };

  const onContainerMouseMove = (e) => {
    if (!containerDragging || !containerRel) return;
    let newX = e.clientX - containerRel.x;
    let newY = e.clientY - containerRel.y;
    setcontainerPosition({
      x: newX,
      y: newY,
    });

    e.preventDefault();
    document.addEventListener("mouseup", onContainerMouseUp);
  };

  const onContainerMouseUp = (e) => {
    setContainerDragging(false);
    e.preventDefault();
    document.removeEventListener("mouseup", onContainerMouseUp);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onContainerMouseMove);

    return () => {
      document.removeEventListener("mousemove", onContainerMouseMove);
    };
  }, [containerDragging, onContainerMouseMove]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const positionX = e.clientX - innerDivPosition.x;
    const positionY = e.clientY - innerDivPosition.y;
    setDragging(true);
    setRel({ x: positionX, y: positionY });
    e.preventDefault();
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!dragging || !rel) return;
    let newX = e.clientX - rel.x;
    let newY = e.clientY - rel.y;
    newX = Math.max(0, Math.min(containerWidth - 100, newX));
    newY = Math.max(0, Math.min(containerHeight - 100, newY));
    setInnerDivPosition({
      x: newX,
      y: newY,
    });
    e.preventDefault();
  };

  const onMouseUp = (e) => {
    setDragging(false);
    e.preventDefault();
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseEnter = () => {
    if (!dragging) {
      setTooltipVisible(true);
    }
    setIsInnerDivHovered(true);
  };

  const onMouseLeave = () => {
    if (!dragging) {
      setTooltipVisible(false);
    }
    setIsInnerDivHovered(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [dragging, onMouseMove]);

  return (
    <>
      <div
        ref={containerRef}
        className="container"
        onMouseUp={() =>
          handleMouseUp(setDragging, setTooltipVisible, setIsInnerDivHovered)
        }
        style={{
          left: `${containerPosition.x}px`,
          top: `${containerPosition.y}px`,
        }}
      >
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
          onMouseDown={onContainerMouseDown}
        />
        <div
          ref={innerDivRef}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="inner-div"
          style={{
            left: `${innerDivPosition.x}px`,
            top: `${innerDivPosition.y}px`,
          }}
        ></div>
        {isInnerDivHovered && (
          <Tooltip
            selectedOption={selectedOption}
            innerDivPosition={innerDivPosition}
            containerRef={containerRef}
          />
        )}

        <ResizeHandlers handleMouseDown={handleMouseDown}/>
      </div>
    </>
  );
};

export default Home;
