import { useState } from "react";

export const resizeHandler = (
  e,
  direction,
  containerRef,
  innerDivRef,
  setPosition,position
) => {
  e.preventDefault();

  const initialContainerRect = containerRef?.current.getBoundingClientRect();
  const initialInnerDivRect = innerDivRef?.current.getBoundingClientRect();

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  };

  let  isResizing = true;

  const handleMouseMove =  (e) => {

    if (!isResizing) return;

    const containerRect = containerRef?.current.getBoundingClientRect();
    const innerDivRect = innerDivRef?.current.getBoundingClientRect();

    switch (direction) {
      case "right":
        containerRef.current.style.width =
          e.clientX -
          containerRef?.current?.getBoundingClientRect().left +
          "px";

        if (containerRect.right <= innerDivRect.right) {
          const innerBoxLeft = containerRect.width - innerDivRect.width;
          innerDivRef.current.style.left = innerBoxLeft + "px";
        }
        break;

      case "left":
        const newWidth = initialContainerRect.right - e.clientX;

        if (newWidth >= innerDivRect.width && newWidth > 100) {

          containerRef.current.style.width = newWidth + "px";
          containerRef.current.style.left = `${e.clientX}px`;

          if( containerRef.current.style.left - innerDivRef.current.style.left !== 0){
            
            const maxInnerDivX = (containerRect.width - innerDivRect.width / 3)+7;

            throttle(
              setPosition((prevItem) => ({
                ...prevItem,
                x: Math.max(0, Math.min(prevItem.x - e.movementX, maxInnerDivX)),
              })),
              50
            );
          }
        }

        break;

      case "bottom":
        containerRef.current.style.height =
          e.clientY - containerRef?.current?.getBoundingClientRect().top + "px";

        if (containerRect.bottom <= innerDivRect.bottom) {
          const innerBoxTop = containerRect.height - innerDivRect.height;
          innerDivRef.current.style.top = innerBoxTop + "px";
        }
        break;

      case "top":
        const newHeight = initialContainerRect.bottom - e.clientY;

        if (newHeight >= innerDivRect.height && newHeight > 100) {

          // containerRef.current.style.willChange = "height,top"
          // innerDivRef.current.style.willChange = "transform, height, top";

          containerRef.current.style.height = newHeight + "px";
          containerRef.current.style.top = `${e.clientY}px`;

          if(isResizing && containerRef.current.style.top - innerDivRef.current.style.top!==0){
            const maxInnerDivY = containerRect.height - innerDivRect.height/ 3;
          
            throttle(
              setPosition((prevItem) => ({
                ...prevItem,
                y: Math.max(0, Math.min(prevItem.y - e.movementY, maxInnerDivY)),
              })),
              100
            );
          }
          
          
        }

        break;

      default:
        containerRef.current.style.width =
          e.clientX - containerRect.left + "px";
        containerRef.current.style.height =
          e.clientY - containerRect.top + "px";

        if (containerRect.right <= innerDivRect.right) {
          const innerBoxLeft = containerRect.width - innerDivRect.width;
          innerDivRef.current.style.left = innerBoxLeft + "px";
        }

        if (containerRect.bottom <= innerDivRect.bottom) {
          const innerBoxTop = containerRect.height - innerDivRect.height;
          innerDivRef.current.style.top = innerBoxTop + "px";
        }
        break;
    }

  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // containerRef.current.style.willChange = "auto";
    // innerDivRef.current.style.willChange = "auto";

    isResizing = false;
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};



