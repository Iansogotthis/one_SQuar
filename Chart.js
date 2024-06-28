import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";
import { data } from "../data";
import { calculateViewBox } from "../helpers/viewBoxHelper";

const Chart = ({ onSquareClick, viewBox, setViewBox }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current)
      .attr("viewBox", viewBox)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;
    const centerX = width / 2;
    const centerY = height / 2;
    const centerSquareSize = Math.min(width, height) / 2;
    const smallSquareSize = centerSquareSize / 2;
    const smallestSquareSize = smallSquareSize / 2;
    const tinySquareSize = smallestSquareSize / 2;

    const drawSquare = (x, y, size, color, className, depth, parentText) => {
      const rect = svg.append("rect")
        .attr("x", x - size / 2)
        .attr("y", y - size / 2)
        .attr("width", size)
        .attr("height", size)
        .attr("class", `square ${className}`)
        .attr("fill", color)
        .on("click", () => { onSquareClick(className); });

      svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", size / 5)
        .attr("pointer-events", "none")
        .text(className);
    };

    const initializeVisualization = (data) => {
      drawSquare(centerX, centerY, centerSquareSize, "lightblue", "root", 1, "Center");

      const corners = [
        [centerX - centerSquareSize / 2, centerY - centerSquareSize / 2],
        [centerX + centerSquareSize / 2, centerY - centerSquareSize / 2],
        [centerX - centerSquareSize / 2, centerY + centerSquareSize / 2],
        [centerX + centerSquareSize / 2, centerY + centerSquareSize / 2],
      ];

      drawSquares(corners, smallSquareSize, 1, "root", "Root");
    };

    const drawSquares = (corners, size, depth, className, parentText) => {
      if (depth > 3) return;

      const colors = {
        root: "lightblue",
        branch: "lightgray",
        leaf: "lightgreen",
        fruit: "lightcoral",
      };

      corners.forEach(([x, y], index) => {
        let currentClassName;
        if (depth === 1) {
          currentClassName = "branch";
        } else if (depth === 2) {
          currentClassName = "leaf";
        } else if (depth === 3) {
          currentClassName = "fruit";
        }

        drawSquare(
          x,
          y,
          size,
          colors[currentClassName] || "",
          currentClassName || "",
          depth,
          parentText
        );

        if (size > tinySquareSize) {
          const nextSize = size / 2;
          const nextCorners = [
            [x - size / 2, y - size / 2],
            [x + size / 2, y - size / 2],
            [x - size / 2, y + size / 2],
            [x + size / 2, y + size / 2],
          ];

          requestAnimationFrame(() => {
            drawSquares(
              nextCorners,
              nextSize,
              depth + 1,
              currentClassName || "",
              `${parentText}_${index + 1}`
            );
          });
        }
      });
    };

    initializeVisualization(data);
  }, [onSquareClick, viewBox]);

  return <svg ref={chartRef}></svg>;
};

export default Chart;