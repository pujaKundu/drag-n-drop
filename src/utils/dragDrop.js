export const handleDragContainer = (e, containerRef) => {
  e.preventDefault();

  if (containerRef.current) {
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;

    const handleMouseMove = (e) => {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      containerRef.current.style.left = `${x}px`;
      containerRef.current.style.top = `${y}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
};

export const handleDragInnerDiv = (
  e,
  innerDivRef,
  containerRef,
  setTooltipVisible,
  setPosition
) => {
  e.preventDefault();
  setTooltipVisible(false);

  let offsetX, offsetY;

  const containerRect = containerRef.current.getBoundingClientRect();
  const innerDivRect = innerDivRef.current.getBoundingClientRect();

  offsetX = e.clientX - innerDivRef.current.getBoundingClientRect().left;
  offsetY = e.clientY - innerDivRef.current.getBoundingClientRect().top;

  const handleDragMove = (e) => {
    e.preventDefault();
    setTooltipVisible(false);
    
    if (innerDivRef.current && containerRef.current) {
      let x = e.clientX - offsetX - containerRect.left;
      let y = e.clientY - offsetY - containerRect.top;

      x = Math.max(0, Math.min(containerRect.width - innerDivRect.width, x));
      y = Math.max(0, Math.min(containerRect.height - innerDivRect.height, y));

      innerDivRef.current.style.left = x + "px";
      innerDivRef.current.style.top = y + "px";

      setPosition({ x: x, y: y });
    }
  };

  

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);
};
