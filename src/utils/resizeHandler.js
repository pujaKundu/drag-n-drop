export const resizeHandler = (e, direction, containerRef, innerDivRef) => {
    e.preventDefault();
  
    const containerRefBottom = containerRef.current.getBoundingClientRect().bottom;
    const innerRefBottom = innerDivRef.current.getBoundingClientRect().bottom;
  
    const handleMouseMove = (e) => {
      if (direction === "right") {
        containerRef.current.style.width =
          e.clientX - containerRef.current.getBoundingClientRect().left + "px";
      } else if (direction === "bottom") {
        containerRef.current.style.height =
          e.clientY - containerRef.current.getBoundingClientRect().top + "px";
  
        if (containerRefBottom === innerRefBottom) {
          const newBottomPosition =
            parseInt(containerRef.current.style.height, 10) + 50 + "px";
          innerDivRef.current.style.top = newBottomPosition;
        }
      } else {
        containerRef.current.style.width =
          e.clientX - containerRef.current.getBoundingClientRect().left + "px";
        containerRef.current.style.height =
          e.clientY - containerRef.current.getBoundingClientRect().top + "px";
        if (containerRefBottom === innerRefBottom) {
          const newBottomPosition =
            parseInt(containerRef.current.style.height, 10) + 50 + "px";
          innerDivRef.current.style.top = newBottomPosition;
        }
      }
    };
  
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  