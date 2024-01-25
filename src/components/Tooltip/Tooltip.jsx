import { createPortal } from "react-dom";
import { updatedPosition } from "../../utils/positionCalculation";

const Tooltip = ({ innerDivPosition, selectedOption, containerRef }) => {
  let tooltipStyle = {
    ...updatedPosition(selectedOption, innerDivPosition, containerRef),
    position: "absolute",
    backgroundColor: "rgb(72, 72, 82)",
    color: "#ffffff",
    padding: "5px",
    borderRadius: "5px",
    width: "50px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  };

  return containerRef.current
    ? createPortal(<div style={tooltipStyle}>Heyyy!</div>, document.body)
    : null;
};

export default Tooltip;
