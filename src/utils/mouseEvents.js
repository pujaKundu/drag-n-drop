export const handleMouseDown = (setDragging,setTooltipVisible) => {
    setDragging(true);
    setTooltipVisible(false);
  };

export const handleMouseUp = (setDragging,setTooltipVisible,setIsInnerDivHovered) => {
    setDragging(false);
    setTooltipVisible(true);
    setIsInnerDivHovered(true);
  };

export const handleMouseEnter = (dragging,setTooltipVisible,setIsInnerDivHovered) => {
    if (!dragging) {
      setTooltipVisible(true);
    }
    setIsInnerDivHovered(true);
  };

export  const handleMouseLeave = (dragging,setTooltipVisible,setIsInnerDivHovered) => {
    if (!dragging) {
      setTooltipVisible(false);
    }
    setIsInnerDivHovered(false);
  };