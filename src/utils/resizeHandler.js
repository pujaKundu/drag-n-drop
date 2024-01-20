export const resizeHandler = (e, direction, containerRef, innerDivRef) => {
  e.preventDefault();

  const containerRect = containerRef.current.getBoundingClientRect();
  const innerDivRect = innerDivRef.current.getBoundingClientRect();
  const containerBottom = containerRect.bottom;

  const handleMouseMove = (e) => {
    if (direction === "right") {
      containerRef.current.style.width = e.clientX - containerRect.left + "px";
    } else if (direction === "bottom") {
      containerRef.current.style.height = e.clientY - containerRect.top + "px";

      // Check if the inner div is positioned outside the container
      if (innerDivRef.current && innerDivRect.bottom > containerBottom) {
        const newBottomPosition = containerBottom - containerRect.top + "px";
        innerDivRef.current.style.top = newBottomPosition;
      }
    } else {
      containerRef.current.style.width = e.clientX - containerRect.left + "px";
      containerRef.current.style.height = e.clientY - containerRect.top + "px";

      // Check if the inner div is positioned outside the container
      if (innerDivRef.current && innerDivRect.bottom > containerBottom) {
        const newBottomPosition = containerBottom - containerRect.top + "px";
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
