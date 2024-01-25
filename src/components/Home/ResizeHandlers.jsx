import React from 'react'

const ResizeHandlers = ({handleMouseDown}) => {
  return (
    <div>
      <div
          onMouseDown={(e) => handleMouseDown("top-left", e)}
          className="top-left"
        />
        <div onMouseDown={(e) => handleMouseDown("top", e)} className="top" />
        <div
          onMouseDown={(e) => handleMouseDown("top-right", e)}
          className="top-right"
        />
        <div
          onMouseDown={(e) => handleMouseDown("right", e)}
          className="right"
        />
        <div
          onMouseDown={(e) => handleMouseDown("bottom-right", e)}
          className="bottom-right"
        />
        <div
          onMouseDown={(e) => handleMouseDown("bottom", e)}
          className="bottom"
        />
        <div
          onMouseDown={(e) => handleMouseDown("bottom-left", e)}
          className="bottom-left"
        />
        <div onMouseDown={(e) => handleMouseDown("left", e)} className="left" />
    </div>
  )
}

export default ResizeHandlers
