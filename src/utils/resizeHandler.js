export const resizeHandler = (e, direction, containerRef) => {
  e.preventDefault();
  const handleMouseMove = (e) => {
    if (direction === "right") {
      containerRef.current.style.width =
        e.clientX - containerRef.current.getBoundingClientRect().left + "px";
    } else if (direction === "bottom") {
      containerRef.current.style.height =
        e.clientY - containerRef.current.getBoundingClientRect().top + "px";
    } else {
      containerRef.current.style.width =
        e.clientX - containerRef.current.getBoundingClientRect().left + "px";
      containerRef.current.style.height =
        e.clientY - containerRef.current.getBoundingClientRect().top + "px";
    }
  };
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

