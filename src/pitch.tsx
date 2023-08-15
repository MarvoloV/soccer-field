import { select as d3Select } from "d3-selection";
import { arc as d3Arc } from "d3-shape";
import * as d3 from "d3";

export const pitch = () => {
  const pitchLenght = 105;
  const pitchWidth = 68;
  let clip = { top: 0, right: pitchLenght, bottom: pitchWidth, left: 0 };
  let height = 300;
  let rotated = false;
  let width = ((-clip.left + clip.right) / (-clip.top + clip.bottom)) * height;
  let pitchstrokewidth = 0.5;
  let dirOfPlay = false;
  let shadeMiddleThird = true;

  function chart(g) {
    g.each(function () {
      const pitch = d3Select(this)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", () => {
          let width = clip.right - clip.left;
          let height = clip.bottom - clip.top;
          let xdim, ydim, xpad, ypad;
          if (rotated) {
            xpad = height === pitchWidth ? 4 : 2;
            ypad = width === pitchLenght ? 4 : 2;
            xdim = -clip.left + clip.right + ypad;
            ydim = -clip.top + clip.bottom + xpad;
          } else {
            xpad = height === pitchWidth ? 4 : 2;
            ypad = width === pitchLenght ? 4 : 2;
            ydim = -clip.top + clip.bottom + xpad;
            xdim = -clip.left + clip.right + ypad;
          }
          return `-2 -2 ${xdim} ${ydim}`;
        })
        .append("g")
        .attr("id", "pitch")
        .attr(
          "transform",
          `translate(${-clip.left}, ${-clip.top})rotate(${
            rotated ? -90 : 0
          } 0 0)translate(${rotated ? -105 : 0} 0)`
        );

      pitch.append("g").attr("id", "below");

      const lines = pitch
        .append("g")
        .attr("id", "lines")
        .attr("class", "pitch")
        .attr("pointer-events", "none");

      // Halfway line
      lines
        .append("line")
        .style("stroke-width", pitchstrokewidth)
        .attr("x1", pitchLenght / 2)
        .attr("y1", 0)
        .attr("x2", pitchLenght / 2)
        .attr("y2", pitchWidth);

      // Centre circle
      lines
        .append("circle")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("cx", pitchLenght / 2)
        .attr("cy", pitchWidth / 2)
        .attr("r", 9.15);
      lines
        .append("circle")
        .style("stroke-width", 0)
        .attr("cx", pitchLenght / 2)
        .attr("cy", pitchWidth / 2)
        .attr("r", pitchstrokewidth);

      // Penalty arcs
      const arc1 = d3Arc()
        .innerRadius(9.15)
        .outerRadius(9.15)
        .startAngle(38 * (Math.PI / 180)) //converting from degs to radians
        .endAngle(142 * (Math.PI / 180)); //just radians
      lines
        .append("path")
        .style("stroke-width", pitchstrokewidth)
        .attr("d", arc1)
        .attr("transform", "translate(11," + pitchWidth / 2 + ")");
      const arc2 = d3Arc()
        .innerRadius(9.15)
        .outerRadius(9.15)
        .startAngle(218 * (Math.PI / 180)) //converting from degs to radians
        .endAngle(322 * (Math.PI / 180)); //just radians
      lines
        .append("path")
        .style("stroke-width", pitchstrokewidth)
        .attr("d", arc2)
        .attr(
          "transform",
          "translate(" + (pitchLenght - 11) + "," + pitchWidth / 2 + ")"
        );

      // Goal areas
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", 0)
        .attr("y", pitchWidth / 2 - 9.16)
        .attr("width", 5.5)
        .attr("height", 18.32);
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", pitchLenght - 5.5)
        .attr("y", pitchWidth / 2 - 9.16)
        .attr("width", 5.5)
        .attr("height", 18.32);

      // Penalty areas
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", 0)
        .attr("y", pitchWidth / 2 - 20.16)
        .attr("width", 16.5)
        .attr("height", 40.32);
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", pitchLenght - 16.5)
        .attr("y", pitchWidth / 2 - 20.16)
        .attr("width", 16.5)
        .attr("height", 40.32);

      // Penalty marks
      lines
        .append("circle")
        .style("stroke-width", 0)
        .attr("cx", 11)
        .attr("cy", pitchWidth / 2)
        .attr("r", pitchstrokewidth);
      lines
        .append("circle")
        .style("stroke-width", 0)
        .attr("cx", pitchLenght - 11)
        .attr("cy", pitchWidth / 2)
        .attr("r", pitchstrokewidth);

      

      // Pitch boundaries
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .attr("fill", "none")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", pitchLenght)
        .attr("height", pitchWidth);

      pitch.append("g").attr("id", "above");

      // Middle third
      if (shadeMiddleThird) {
        const linesInfo = [
          -2.5, 10.5, 22.5, 35.5, 47.1, 60.4, 75.2, 89.2, 102.1,
        ];
        linesInfo.forEach((info) => {
          lines
            .append("rect")
            .attr("class", "shaded")
            .attr("fill", "#000000")
            .attr("x", info)
            .attr("y", 0)
            .attr("width", 5.5)
            .attr("height", pitchWidth);
        });
      }
      // prueba svg draw
      const fieldWidth = 106;
      const fieldHeight = 68;
      const teamPositions = [
        {
          x: fieldWidth * 0.03,
          y: fieldHeight * 0.5,
          name: "Jorge",
          team: "player",
          positionNumber: 10,
        }, // Goalkeeper
        {
          x: fieldWidth * 0.11,
          y: fieldHeight * 0.72,
          name: "Luis",
          team: "player",
          positionNumber: 20,
        }, // Goalkeeper
        {
          x: fieldWidth * 0.11,
          y: fieldHeight * 0.5,
          name: "Luis",
          team: "player",
          positionNumber: 1,
        }, // Goalkeeper
        {
          x: fieldWidth * 0.11,
          y: fieldHeight * 0.28,
          name: "Luis",
          team: "player",
          positionNumber: 2,
        }, // Goalkeeper

        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.13,
          name: "Remirez",
          team: "player",
          positionNumber: 4,
        }, // Defender
        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.28,
          name: "Miguel",
          team: "player",
          positionNumber: 10,
        }, // Midfielder
        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.72,
          name: "Angel",
          team: "player",
          positionNumber: 10,
        },
        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.91,
          name: "Angel",
          team: "player",
          positionNumber: 10,
        }, // Forward
        {
          x: fieldWidth * 0.35,
          y: fieldHeight * 0.5,
          name: "Angel",
          team: "player",
          positionNumber: 10,
        }, // Forward
        {
          x: fieldWidth * 0.44,
          y: fieldHeight * 0.72,
          name: "Angel",
          team: "player",
          positionNumber: 10,
        }, // Forward
        {
          x: fieldWidth * 0.44,
          y: fieldHeight * 0.28,
          name: "Angel",
          team: "player",
          positionNumber: 10,
        }, // Forward

        // Add more team positions
        // ...
      ];

      const opponentPositions = [
        {
          x: fieldWidth * 0.03,
          y: fieldHeight * 0.5,
          name: "Jorge",
          team: "opponent",
          positionNumber: 10,
        }, // Goalkeeper
        {
          x: fieldWidth * 0.11,
          y: fieldHeight * 0.72,
          name: "Luis",
          team: "opponent",
          positionNumber: 50,
        }, // Goalkeeper
        {
          x: fieldWidth * 0.11,
          y: fieldHeight * 0.5,
          name: "Luis",
          team: "opponent",
          positionNumber: 40,
        }, // Goalkeeper
        {
          x: fieldWidth * 0.11,
          y: fieldHeight * 0.28,
          name: "Luis",
          team: "opponent",
          positionNumber: 41,
        }, // Goalkeeper

        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.13,
          name: "Remirez",
          team: "opponent",
          positionNumber: 42,
        }, // Defender
        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.28,
          name: "Miguel",
          team: "opponent",
          positionNumber: 43,
        }, // Midfielder
        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.72,
          name: "Angel",
          team: "opponent",
          positionNumber: 44,
        },
        {
          x: fieldWidth * 0.21,
          y: fieldHeight * 0.91,
          name: "Angel",
          team: "opponent",
          positionNumber: 45,
        }, // Forward
        {
          x: fieldWidth * 0.35,
          y: fieldHeight * 0.5,
          name: "Angel",
          team: "opponent",
          positionNumber: 10,
        }, // Forward
        {
          x: fieldWidth * 0.44,
          y: fieldHeight * 0.72,
          name: "Angel",
          team: "opponent",
          positionNumber: 70,
        }, // Forward
        {
          x: fieldWidth * 0.44,
          y: fieldHeight * 0.28,
          name: "Angel",
          team: "opponent",
          positionNumber: 82,
        }, // F

        // Add more opponent positions
        // ...
      ];
      const playerGroups = pitch
        .selectAll(".player-group")
        .data(teamPositions)
        .enter()
        .append("g")
        .attr("class", "player-group")
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);
      playerGroups
        .append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => fieldHeight - d.y)
        .attr("r", 3)
        .attr("class", (d) => (d.team === "player" ? "player" : "opponent"));
      playerGroups
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => fieldHeight - d.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("class", "player-number")
        .text((d) => d.positionNumber);
      const playerGroupsOponent = pitch
        .selectAll(".opponent-group")
        .data(opponentPositions)
        .enter()
        .append("g")
        .attr("class", "player-group")
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);
      playerGroupsOponent
        .append("circle")
        .attr("cx", (d) => fieldWidth - d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 3)
        .attr("class", (d) => (d.team === "player" ? "player" : "opponent"));
      playerGroupsOponent
        .append("text")
        .attr("x", (d) => fieldWidth - d.x)
        .attr("y", (d) => d.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("class", "player-number")
        .text((d) => d.positionNumber);
    });
  }
  function showTooltip(event, d) {
    const playerGroup = d3.select(this); // Obtén el grupo actual que se está haciendo hover
    playerGroup
      .selectAll(".player,.opponent") // Aplica el hover al círculo y al número
      .classed("player-hover", true);
    
     d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("color", "black")
      .style("padding", "3px")
      .style("border-radius", "3px")
      .style("border","1px solid black")
      .style("pointer-events", "none")
      .style("left", event.pageX + "px")
      .style("top", event.pageY +16 + "px")
      .text( `[${d.positionNumber}] ${d.name}`);
  }

  function hideTooltip() {
    const playerGroup = d3.select(this); // Obtén el grupo actual que se hizo hover
    playerGroup
      .selectAll(".player,.opponent") // Elimina el hover del círculo y el número
      .classed("player-hover", false);
    d3.select(".tooltip").remove();
  }
  chart.height = function (_) {
    if (!arguments.length) return height;
    height = +_;
    width = ((-clip.left + clip.right) / (-clip.top + clip.bottom)) * height;
    return chart;
  };

  chart.width = function () {
    return width;
  };

  chart.rotate = function (_) {
    if (!arguments.length) return rotated;
    rotated = Boolean(_);
    return chart;
  };

  chart.clip = function (_) {
    if (!arguments.length)
      return [
        [clip.left, clip.top],
        [clip.right, clip.bottom],
      ];
    clip = { top: _[0][1], bottom: _[1][1], left: _[0][0], right: _[1][0] };
    width = ((-clip.left + clip.right) / (-clip.top + clip.bottom)) * height;
    return chart;
  };

  return chart;
};
