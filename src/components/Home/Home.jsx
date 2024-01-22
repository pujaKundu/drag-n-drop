import { useState, useRef } from "react";
import Selector from "../Selector/Selector";
import { createPortal } from "react-dom";
import { resizeHandler } from "../../utils/resizeHandler";
import "./Home.css";
import { handleDragContainer ,handleInnerDivDrag} from "../../utils/dragDrop";
import {handleMouseDown,handleMouseUp,handleMouseEnter,handleMouseLeave} from "../../utils/mouseEvents"
import dnd from "../../assets/drag.png";
import resize from "../../assets/resize.png";
import Tooltip from "../Tooltip/Tooltip";

const Home = () => {
  const containerRef = useRef(null);
  const innerDivRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isInnerDivHovered, setIsInnerDivHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState("top");

  const handleCornerResize = (e) => {
    resizeHandler(e, "right", containerRef, innerDivRef);
    resizeHandler(e, "bottom", containerRef, innerDivRef);
  };

  return (
    <>
      {createPortal(
        <Tooltip
          handleMouseEnter={()=>handleMouseEnter(dragging,setTooltipVisible,setIsInnerDivHovered)}
          handleMouseLeave={()=>handleMouseLeave(dragging,setTooltipVisible,setIsInnerDivHovered)}
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
        onMouseMove={(e)=>handleInnerDivDrag(e,dragging,containerRef,setPosition,setTooltipVisible)}
        onMouseUp={()=>handleMouseUp(setDragging,setTooltipVisible,setIsInnerDivHovered)}
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
          onMouseDown={handleCornerResize}
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
          onMouseDown={()=>handleMouseDown(setDragging,setTooltipVisible)}
          onMouseEnter={()=>handleMouseEnter(dragging,setTooltipVisible,setIsInnerDivHovered)}
          onMouseLeave={()=>handleMouseLeave(dragging,setTooltipVisible,setIsInnerDivHovered)}
          ref={innerDivRef}
        ></div>
      </div>
    </>
  );
};

export default Home;
