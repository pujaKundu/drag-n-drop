export const updatedPosition = (
  selectedOption,
  position,
  containerRef,
  containerRefBottom,
  innerRefBottom
) => {
  switch (selectedOption) {
    case "top":
      return {
        top: `${
          position.y >= 0 && position.y <= 60
            ? position.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) +
              60
            : position.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) -
              40
        }px`,
        left: `${
          position.x +
          (containerRef?.current?.getBoundingClientRect()?.left - 5 || 0)
        }px`,
      };
    case "bottom":
      return {
        top: `${
          containerRefBottom - innerRefBottom <= 100
            ? position.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) -
              40
            : position.y +
              (containerRef?.current?.getBoundingClientRect()?.top || 0) +
              60
        }px`,
        left: `${
          position.x +
          (containerRef?.current?.getBoundingClientRect()?.left - 5 || 0)
        }px`,
      };
    case "left":
      return {
        top: `${
          position.y +
          (containerRef?.current?.getBoundingClientRect()?.top || 0) +
          10
        }px`,
        left: `${
          position.x >= 0 && position.x <= 110
            ? position.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) +
              120
            : position.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) -
              120
        }px`,
      };
    case "right":
      return {
        top: `${
          position.y +
          (containerRef?.current?.getBoundingClientRect()?.top || 0) +
          10
        }px`,
        left: `${
          position.x >= 400 && position.x <= 505
            ? position.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) -
              120
            : position.x +
              (containerRef?.current?.getBoundingClientRect()?.left || 0) +
              120
        }px`,
      };
    default:
      return {};
  }
};