export const resizeHandler = (e, direction, containerRef, innerDivRef) => {
  e.preventDefault();

  const containerRect = containerRef.current.getBoundingClientRect();
  const innerDivRect = innerDivRef.current.getBoundingClientRect();
  const containerBottom = containerRect.bottom;

  const handleMouseMove = (e) => {
    if (direction === "right") {
      const newWidth = e.clientX - containerRect.left;
      containerRef.current.style.width = `${newWidth}px`;

      if (containerRect.right <= innerDivRect.right) {
        const innerBoxLeft = containerRect.width - innerDivRect.width;
        innerDivRef.current.style.left = `${innerBoxLeft}px`;
      }
    } else if (direction === "bottom") {
      const newHeight = e.clientY - containerRect.top;
      containerRef.current.style.height = `${newHeight}px`;

      if (innerDivRect.bottom > containerBottom) {
        const newTopPosition =
          containerBottom - containerRect.top - innerDivRect.height + "px";
        innerDivRef.current.style.top = newTopPosition;
      }
    } else {
      const newWidth = e.clientX - containerRect.left;
      const newHeight = e.clientY - containerRect.top;

      containerRef.current.style.width = `${newWidth}px`;
      containerRef.current.style.height = `${newHeight}px`;

      if (innerDivRect.bottom > containerBottom) {
        const newTopPosition =
          containerBottom - containerRect.top - innerDivRect.height + "px";
        innerDivRef.current.style.top = newTopPosition;
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
