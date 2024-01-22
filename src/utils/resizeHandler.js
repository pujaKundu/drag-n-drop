/* eslint-disable no-case-declarations */
export const resizeHandler = (e, direction, containerRef, innerDivRef) => {
  e.preventDefault();

  const handleMouseMove = (e) => {
    const containerRect = containerRef?.current.getBoundingClientRect();
    const innerDivRect = innerDivRef?.current.getBoundingClientRect();
    const containerBottom = containerRect.bottom;

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
        const newWidth = containerRect.right - e.clientX;

        containerRef.current.style.width = `${newWidth}px`;

        if (newWidth >= innerDivRect.width && newWidth >= 300) {
          containerRef.current.style.width = newWidth + "px";
          containerRef.current.style.left = `${e.clientX}px`;
        }

        if (containerRect.left === innerDivRect.left) {
          const innerBoxLeft = Math.min(
            containerRect.width - innerDivRect.width,
            containerRect.width - newWidth
          );
          innerDivRef.current.style.left = innerBoxLeft + "px";
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
        const newHeight = containerBottom - e.clientY;

        if (containerRect.bottom >= innerDivRect.bottom && newHeight >= 300) {
          containerRef.current.style.height = newHeight + "px";
          containerRef.current.style.top = `${e.clientY}px`;

          if (containerRect.top === innerDivRect.top) {
            const innerBoxTop = containerRect.height - newHeight;
            innerDivRef.current.style.top = innerBoxTop + "px";
          }
        }
        break;

      default:
        containerRef.current.style.width =
          e.clientX - containerRef.current.getBoundingClientRect().left + "px";
        containerRef.current.style.height =
          e.clientY - containerRef.current.getBoundingClientRect().top + "px";

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
