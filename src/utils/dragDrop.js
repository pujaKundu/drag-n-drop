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


export const handleInnerDivDrag = (e,dragging,containerRef,setPosition,setTooltipVisible) => {
  if (dragging) {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const newX = e.clientX - containerRect.left - 25;
      const newY = e.clientY - containerRect.top - 25;

      const clampedX = Math.max(0, Math.min(newX, containerRect.width - 100));
      const clampedY = Math.max(0, Math.min(newY, containerRect.height - 50));

      setPosition({ x: clampedX, y: clampedY });
    }

    setTooltipVisible(false);
  }
};
