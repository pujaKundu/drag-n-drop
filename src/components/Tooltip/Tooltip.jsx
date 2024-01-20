/* eslint-disable react/prop-types */
import { updatedPosition } from "../../utils/positionCalculation";

const Tooltip = ({
  handleMouseEnter,
  handleMouseLeave,
  selectedOption,
  position,
  containerRef,
  innerDivRef,
  tooltipVisible,
  isInnerDivHovered,
}) => {
  const containerRefBottom =
    containerRef?.current?.getBoundingClientRect().bottom;
  const innerRefBottom = innerDivRef?.current?.getBoundingClientRect().bottom;

  const tooltipStyle = {
    ...updatedPosition(
      selectedOption,
      position,
      containerRef,
      containerRefBottom,
      innerRefBottom
    ),
    display: tooltipVisible && isInnerDivHovered ? "block" : "none",
  };
  return (
    <div
      className={`tooltip `}
      style={tooltipStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      This is tooltip
    </div>
  );
};

export default Tooltip;
