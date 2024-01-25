import { useState, useRef } from "react";
import Selector from "../Selector/Selector";
import { resizeHandler } from "../../utils/resizeHandler";
import "./Home.css";
import { handleDragContainer, handleDragInnerDiv } from "../../utils/dragDrop";
import {
  handleMouseUp,
  handleMouseEnter,
  handleMouseLeave,
} from "../../utils/mouseEvents";
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
    <div>
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        margin: "20px",
      }}>
        <Selector setSelectedOption={setSelectedOption} />
        <div
          id="container"
          className="outer-div"
          style={{
            boxShadow: `${dragging ? "2px 3px 20px rgb(36, 171, 201)" : ""}`,
            minWidth: "100px",
            minHeight: "100px",
          }}
          ref={containerRef}
          onMouseUp={() =>
            handleMouseUp(setDragging, setTooltipVisible, setIsInnerDivHovered)
          }
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
              resizeHandler(
                e,
                "right",
                containerRef,
                innerDivRef,
                setPosition
              )
            }
          ></div>
          <div
            className="resize-handle bottom-resize"
            onMouseDown={(e) =>
              resizeHandler(
                e,
                "bottom",
                containerRef,
                innerDivRef,
                setPosition,position
              )
            }
          ></div>
          <div
            className="resize-handle left-resize"
            onMouseDown={(e) =>
              resizeHandler(
                e,
                "left",
                containerRef,
                innerDivRef,
                setPosition,position
              )
            }
          ></div>
          <div
            className="resize-handle top-resize"
            onMouseDown={(e) =>
              resizeHandler(
                e,
                "top",
                containerRef,
                innerDivRef,
                setPosition,position
              )
            }
          ></div>

          <div
            ref={innerDivRef}
            id="inner-div"
            className="inner-div"
            style={{ top: `${position.y}px`, left: `${position.x}px`}}
            onMouseDown={(e) =>
              handleDragInnerDiv(
                e,
                innerDivRef,
                containerRef,
                setTooltipVisible,
                setPosition,position
              )
            }
            onMouseEnter={() =>
              handleMouseEnter(
                dragging,
                setTooltipVisible,
                setIsInnerDivHovered
              )
            }
            onMouseLeave={() =>
              handleMouseLeave(
                dragging,
                setTooltipVisible,
                setIsInnerDivHovered
              )
            }
          ></div>
        </div>
        {isInnerDivHovered && (
        <Tooltip
          handleMouseEnter={() =>
            handleMouseEnter(dragging, setTooltipVisible, setIsInnerDivHovered)
          }
          handleMouseLeave={() =>
            handleMouseLeave(dragging, setTooltipVisible, setIsInnerDivHovered)
          }
          selectedOption={selectedOption}
          position={position}
          containerRef={containerRef}
          innerDivRef={innerDivRef}
          tooltipVisible={tooltipVisible}
          isInnerDivHovered={isInnerDivHovered}
        />
      )}
      </div>

     
    </div>
  );
};

export default Home;
