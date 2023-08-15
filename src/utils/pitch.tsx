/* eslint-disable @typescript-eslint/ban-ts-comment */
import { select as d3Select } from "d3-selection";
import { arc as d3Arc } from "d3-shape";
import * as d3 from "d3";
import { PlayerInformation } from "../interfaces/PlayerInformation";
import { MouseEvent } from "react";

export const pitch = (
  teamPositions: PlayerInformation[],
  opponentPositions: PlayerInformation[],
  rotated = false,
  shadeMiddleThird = false
) => {
  const fieldWidth = 105;
  const fieldHeight = 68;
  let clip = { top: 0, right: fieldWidth, bottom: fieldHeight, left: 0 };
  let height = 300;
  let width = ((-clip.left + clip.right) / (-clip.top + clip.bottom)) * height;
  const pitchstrokewidth = 0.5;
  let colorTeam1='';
  let colorTeam2='';

  // @ts-ignore
  function chart(g) {
    g.each(function () {
      // @ts-ignore
      const pitch = d3Select(this)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", () => {
          const width = clip.right - clip.left;
          const height = clip.bottom - clip.top;
          let xdim, ydim, xpad, ypad;
          if (rotated) {
            xpad = height === fieldHeight ? 4 : 2;
            ypad = width === fieldWidth ? 4 : 2;
            xdim = -clip.left + clip.right + ypad;
            ydim = -clip.top + clip.bottom + xpad;
          } else {
            xpad = height === fieldHeight ? 4 : 2;
            ypad = width === fieldWidth ? 4 : 2;
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
        .attr("x1", fieldWidth / 2)
        .attr("y1", 0)
        .attr("x2", fieldWidth / 2)
        .attr("y2", fieldHeight);

      // Centre circle
      lines
        .append("circle")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("cx", fieldWidth / 2)
        .attr("cy", fieldHeight / 2)
        .attr("r", 9.15);
      lines
        .append("circle")
        .style("stroke-width", 0)
        .attr("cx", fieldWidth / 2)
        .attr("cy", fieldHeight / 2)
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
        // @ts-ignore
        .attr("d", arc1)
        .attr("transform", "translate(11," + fieldHeight / 2 + ")");
      const arc2 = d3Arc()
        .innerRadius(9.15)
        .outerRadius(9.15)
        .startAngle(218 * (Math.PI / 180)) //converting from degs to radians
        .endAngle(322 * (Math.PI / 180)); //just radians
      lines
        .append("path")
        .style("stroke-width", pitchstrokewidth)
        // @ts-ignore
        .attr("d", arc2)
        .attr(
          "transform",
          "translate(" + (fieldWidth - 11) + "," + fieldHeight / 2 + ")"
        );

      // Goal areas
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", 0)
        .attr("y", fieldHeight / 2 - 9.16)
        .attr("width", 5.5)
        .attr("height", 18.32);
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", fieldWidth - 5.5)
        .attr("y", fieldHeight / 2 - 9.16)
        .attr("width", 5.5)
        .attr("height", 18.32);

      // Penalty areas
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", 0)
        .attr("y", fieldHeight / 2 - 20.16)
        .attr("width", 16.5)
        .attr("height", 40.32);
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .style("fill", "none")
        .attr("x", fieldWidth - 16.5)
        .attr("y", fieldHeight / 2 - 20.16)
        .attr("width", 16.5)
        .attr("height", 40.32);

      // Penalty marks
      lines
        .append("circle")
        .style("stroke-width", 0)
        .attr("cx", 11)
        .attr("cy", fieldHeight / 2)
        .attr("r", pitchstrokewidth);
      lines
        .append("circle")
        .style("stroke-width", 0)
        .attr("cx", fieldWidth - 11)
        .attr("cy", fieldHeight / 2)
        .attr("r", pitchstrokewidth);

      // Pitch boundaries
      lines
        .append("rect")
        .style("stroke-width", pitchstrokewidth)
        .attr("fill", "none")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", fieldWidth)
        .attr("height", fieldHeight);

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
            .attr("height", fieldHeight);
        });
      }

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
        .attr("cx", (d) => d.coords.x)
        .attr("cy", (d) => fieldHeight - d.coords.y)
        .attr("r", 2.2)
        .attr("fill", (d) => (d.team === "player" ? colorTeam1 : colorTeam2))
        .attr("class", (d) => (d.team === "player" ? "player" : "opponent"));

      playerGroups
        .append("text")
        .attr("x", (d) =>  d.coords.x)
        .attr("y", (d) => fieldHeight - d.coords.y)
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
        .attr("cx", (d) => fieldWidth - d.coords.x)
        .attr("cy", (d) => d.coords.y)
        .attr("r", 2.2)
        .attr("fill", (d) => (d.team === "player" ? colorTeam1 : colorTeam2))
        .attr("class", (d) => (d.team === "player" ? "player" : "opponent"));
      playerGroupsOponent
        .append("text")
        .attr("x", (d) => fieldWidth - d.coords.x)
        .attr("y", (d) => d.coords.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("class", "player-number")
        .text((d) => d.positionNumber);
    });
  }
  function showTooltip(event:MouseEvent, d:PlayerInformation) {
    // @ts-ignore
    const playerGroup = d3.select(this); // Obtén el grupo actual que se está haciendo hover
    playerGroup
      .selectAll(".player,.opponent") // Aplica el hover al círculo y al número
      .classed("player-hover", true);

    d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("color", "black")
      .style("padding", "3px")
      .style("border-radius", "3px")
      .style("border", "1px solid black")
      .style("pointer-events", "none")
      .style("left", event.pageX + "px")
      .style("top", event.pageY + 16 + "px")
      .text(`[${d.positionNumber}] ${d.name}`);
  }

  function hideTooltip() {
    // @ts-ignore
    const playerGroup = d3.select(this); // Obtén el grupo actual que se hizo hover
    playerGroup
      .selectAll(".player,.opponent") // Elimina el hover del círculo y el número
      .classed("player-hover", false);
    d3.select(".tooltip").remove();
  }
  chart.height = function (_: number) {
    if (!arguments.length) return height;
    height = +_;
    width = ((-clip.left + clip.right) / (-clip.top + clip.bottom)) * height;
    return chart;
  };
  chart.colors= function (colorTeam:string,colorTeamOponnent:string) {
    colorTeam1=colorTeam;
    colorTeam2=colorTeamOponnent;
    return chart;
  }
  chart.clip = function (_:number[][]) {
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
