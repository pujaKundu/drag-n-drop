export const updatedPosition = (
  selectedOption,
  innerDivPosition,
  containerRef
) => {
  switch (selectedOption) {
    case "top":
      return {
        top: `${
          innerDivPosition.y >= 0 && innerDivPosition.y <= 60
            ? innerDivPosition.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) +
              60
            : innerDivPosition.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) -
              40
        }px`,
        left: `${
          innerDivPosition.x +
          (containerRef?.current?.getBoundingClientRect()?.left - 5 || 0)
        }px`,
      };
    case "bottom":
      return {
        top: `${
          innerDivPosition.y >= 400 && innerDivPosition.y <= 600
            ? innerDivPosition.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) -
              40
            : innerDivPosition.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) +
              60
        }px`,
        left: `${
          innerDivPosition.x +
          (containerRef?.current?.getBoundingClientRect()?.left - 5 || 0)
        }px`,
      };
    case "left":
      return {
        top: `${
          innerDivPosition.y +
          (containerRef?.current?.getBoundingClientRect()?.top || 0) +
          10
        }px`,
        left: `${
          innerDivPosition.x >= 0 && innerDivPosition.x <= 110
            ? innerDivPosition.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) +
              120
            : innerDivPosition.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) -
              120
        }px`,
      };
    case "right":
      return {
        top: `${
          innerDivPosition.y +
          (containerRef?.current?.getBoundingClientRect()?.top || 0) +
          10
        }px`,
        left: `${
          innerDivPosition.x >= 400 && innerDivPosition.x <= 505
            ? innerDivPosition.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) -
              120
            : innerDivPosition.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) +
              120
        }px`,
      };
    default:
      return {};
  }
};