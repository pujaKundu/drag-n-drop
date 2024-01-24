import { useState } from "react";

export const resizeHandler = (e, direction, containerRef, innerDivRef,setPosition,position) => {
  e.preventDefault();

  // console.log(position)

  const initialContainerRect = containerRef?.current.getBoundingClientRect();
  const initialInnerDivRect = innerDivRef?.current.getBoundingClientRect();

  const debounce = (func, wait) => {
    let timeout;

    return function () {
      if(timeout){
        clearTimeout(timeout)
      }
      timeout = setTimeout(()=>{
        func()
      },wait)
    };
  };

  const handleMouseMove = (e) => {

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
        
        if (newWidth >= innerDivRect.width && newWidth>=100) {
          containerRef.current.style.width = newWidth + "px";
          containerRef.current.style.left = `${e.clientX}px`  
        }

        if (containerRect.left <= innerDivRect.left ) {
          // console.log('left',position)
          debounce(setPosition(prevItem => ({
            ...prevItem,
            x: Math.max(0,prevItem.x-e.movementX)
          })),5000)
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

        if (initialContainerRect.bottom >= innerDivRect.bottom && newHeight >= 100) {
          containerRef.current.style.height = newHeight + "px";
          containerRef.current.style.top = `${e.clientY}px`;
        }

        if (containerRect.top <= innerDivRect.top) {
          // console.log('left',position)
          debounce(setPosition(prevItem=>({
            ...prevItem,
            y:Math.max(0,prevItem.y-e.movementY)
          })),5000)
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
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

