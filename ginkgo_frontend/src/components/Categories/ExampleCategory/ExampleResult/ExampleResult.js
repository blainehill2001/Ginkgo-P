import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ExampleResult = ({ data }) => {
  // Copyright 2021 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/force-directed-graph
  function ForceGraph(
    {
      nodes, // an iterable of node objects (typically [{id}, …])
      links // an iterable of link objects (typically [{source, target}, …])
    },
    {
      nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
      nodeGroup, // given d in nodes, returns an (ordinal) value for color
      nodeGroups, // an array of ordinal values representing the node groups
      nodeTitle, // given d in nodes, a title string
      edgeLabel, // link edge label
      nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
      nodeStroke = "#fff", // node stroke color
      nodeStrokeWidth = 2, // node stroke width, in pixels
      nodeStrokeOpacity = 1, // node stroke opacity
      nodeRadius = 12, // node radius, in pixels
      nodeStrength,
      linkSource = ({ source }) => source, // given d in links, returns a node identifier string
      linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
      linkStroke = "#999", // link stroke color
      linkStrokeOpacity = 0.8, // link stroke opacity
      linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
      linkStrokeLinecap = "round", // link stroke linecap
      linkStrength,
      //   colors = d3.schemeTableau10, // an array of color strings, for the node groups
      colors = ["#CBC3E3"], // an array of color strings, for the node groups
      width = 640, // outer width, in pixels
      height = 400, // outer height, in pixels
      invalidation // when this promise resolves, stop the simulation
    } = {}
  ) {
    // Compute values.
    const N = d3.map(nodes, nodeId).map(intern);
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
    const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
    const EL = edgeLabel == null ? null : d3.map(links, edgeLabel);
    const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
    const W =
      typeof linkStrokeWidth !== "function"
        ? null
        : d3.map(links, linkStrokeWidth);
    const L =
      typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
    links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }));

    // Compute default domains.
    if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

    // Construct the scales.
    const color =
      nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3
      .forceLink(links)
      .id(({ index: i }) => N[i])
      .distance(250);
    // if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
    // if (linkStrength !== undefined) forceLink.strength(linkStrength);
    if (nodeStrength !== undefined)
      forceNode.strength(-5000).distanceMax(200).distanceMin(100);
    if (linkStrength !== undefined) forceLink.strength(linkStrength);

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("charge", d3.forceCollide().radius(50))
      .force("center", d3.forceCenter())
      .on("tick", ticked);

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const link = svg
      .append("g")
      .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
      .attr("stroke-opacity", linkStrokeOpacity)
      .attr(
        "stroke-width",
        typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
      )
      .attr("stroke-linecap", linkStrokeLinecap)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .attr("fill", nodeFill)
      .attr("stroke", nodeStroke)
      .attr("stroke-opacity", nodeStrokeOpacity)
      .attr("stroke-width", nodeStrokeWidth)
      // SM: change
      // .selectAll("circle")
      .selectAll("g")
      .data(nodes)
      // SM: change
      // .join("circle")
      .join("g")
      // SM: change
      // .attr("r", nodeRadius)
      .call(drag(simulation));

    // SM: change
    // append circle and text to node <g> (selection of all <g> elements corresponding to each node)
    node.append("circle").attr("r", nodeRadius);
    node
      .append("text")
      .text(({ index: i }) => {
        return T[i];
      })
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("font-size", "0.85em");

    const edgepaths = svg
      .selectAll(".edgepath")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "edgepath")
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .attr("id", function (d, i) {
        return "edgepath" + i;
      })
      .style("pointer-events", "none");

    const edgelabels = svg
      .selectAll(".edgelabel")
      .data(links)
      .enter()
      .append("text")
      .style("pointer-events", "none")
      .attr("class", "edgelabel")
      .attr("id", function (d, i) {
        return "edgelabel" + i;
      })
      .attr("font-size", 15)
      .attr("fill", "#9c28b0")
      .append("textPath")
      .attr("xlink:href", function (d, i) {
        return "#edgepath" + i;
      })
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("startOffset", "50%")
      .text(({ index: i }) => {
        return EL[i];
      });

    if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
    if (L) link.attr("stroke", ({ index: i }) => L[i]);
    if (G) node.attr("fill", ({ index: i }) => color(G[i]));
    if (T) node.append("title").text(({ index: i }) => T[i]);
    if (EL) edgelabels.append("title").text(({ index: i }) => EL[i]);
    if (invalidation != null) invalidation.then(() => simulation.stop());

    function intern(value) {
      return value !== null && typeof value === "object"
        ? value.valueOf()
        : value;
    }

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x} ${d.y})`);
      // SM: change
      // instead of moving the circle centers we transform the whole <g>
      // .attr("cx", d => d.x)
      // .attr("cy", d => d.y);
      edgepaths.attr("d", function (d) {
        return (
          "M " +
          d.source.x +
          " " +
          d.source.y +
          " L " +
          d.target.x +
          " " +
          d.target.y
        );
      });
      edgelabels.attr("transform", function (d) {
        if (d.target.x < d.source.x) {
          var bbox = this.getBBox();
          let rx = bbox.x + bbox.width / 2;
          let ry = bbox.y + bbox.height / 2;
          return "rotate(180 " + rx + " " + ry + ")";
        } else {
          return "rotate(0)";
        }
      });
    }

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return Object.assign(svg.node(), { scales: { color } });
  }
  var parsed_data = JSON.parse(data);
  var chart = ForceGraph(parsed_data.graph, {
    nodeId: (d) => d.id,
    nodeGroup: (d) => d.group,
    nodeTitle: (d) => `${d.name}`,
    edgeLabel: (e) => `${e.type}`,
    linkStrokeWidth: (l) => Math.sqrt(l.value),
    width: 960,
    height: 600,
    invalidation: null // a promise to stop the simulation when the cell is re-run
  });

  const svg = useRef(null);
  useEffect(() => {
    if (svg.current) {
      svg.current.appendChild(chart);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex-col">
        <div className="justify-center">
          <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] py-0.5 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
            <div
              className="relative rounded-[15px] p-6 text-purple-500"
              data-theme="mytheme"
            >
              <h5>This is Example Result</h5>
              <div ref={svg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleResult;
