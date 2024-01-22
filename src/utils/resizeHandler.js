export const resizeHandler = (e, direction, containerRef, innerDivRef) => {
  e.preventDefault();

  const containerRect = containerRef.current.getBoundingClientRect();
  const innerDivRect = innerDivRef.current.getBoundingClientRect();
  const containerBottom = containerRect.bottom;

  const container = document.getElementById("container")

  console.log(container?.current?.getBoundingClientRect().left)

  const handleMouseMove = (e) => {

    if (direction === "right") {
        const newWidth = e.clientX - containerRect.left;

        containerRef.current.style.width = `${newWidth}px`;

        if (containerRect.right <= innerDivRect.right) {
          const innerBoxLeft = containerRect.width - innerDivRect.width;
          innerDivRef.current.style.left = innerBoxLeft;
        }
    } 
    else if (direction === "left") {
      const newWidth = containerRect.right - e.clientX;

        containerRef.current.style.width = `${newWidth}px`;

      if (newWidth >= innerDivRect.width) {
        containerRef.current.style.width = newWidth + "px";
        containerRef.current.style.left = `${e.clientX}px`;
      }
      if (containerRect.left === innerDivRect.left) {
        const innerBoxLeft = containerRect.width - newWidth;
        innerDivRef.current.style.left = innerBoxLeft + "px";
      }
    } 

    else if (direction === "bottom") {
      const newHeight = e.clientY - containerRect.top;
      containerRef.current.style.height = `${newHeight}px`;
      
      if (innerDivRect.bottom > containerBottom) {
        const newTopPosition =
          containerBottom - containerRect.top - innerDivRect.height + "px";
        innerDivRef.current.style.top = newTopPosition;
      }
    } 
    else if (direction === "top") {
      const newHeight = containerBottom - e.clientY;

      if (containerRect.bottom >= innerDivRect.bottom) {
        containerRef.current.style.height = newHeight + "px";
        containerRef.current.style.top = `${e.clientY}px`;

        if (containerRect.top === innerDivRect.top) {
          const innerBoxTop = containerRect.height - newHeight;
          innerDivRef.current.style.top = innerBoxTop + "px";
        }
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

