"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type DefaultEdgeOptions,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AnimeRelationsNode from "./anime-relations-node";
import { AnimeWithRelationsResponse } from "@/utils/schema";
import mapRelationsToReactFlow from "@/utils/react-flow";

export default function AnimeRelationFlow({
  animeWithRelations,
  height = 90,
  scrollIntoView = true,
}: {
  animeWithRelations: AnimeWithRelationsResponse;
  scrollIntoView?: boolean;
  height?: number;
}) {
  const nodeTypes = {
    animeRelationsNode: AnimeRelationsNode,
  };

  const { nodes: initialNodes, edges: initialEdges } = mapRelationsToReactFlow(
    animeWithRelations,
    "animeRelationsNode",
  );

  useEffect(() => {
    if (!scrollIntoView) return;

    document.getElementById("anime-relations")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [animeWithRelations.id]);

  const fitViewOptions: FitViewOptions = {
    nodes: [{ id: animeWithRelations.id.toString() }],
    maxZoom: 1,
    minZoom: 0.7,
    padding: 0.5,
  };

  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
    type: "smoothstep",
  };

  const onNodeDrag: OnNodeDrag = (_, node) => {
    console.log("drag event", node.data);
  };

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  return (
    <div
      style={{ width: "100%", height: `${height}vh` }}
      className="bg-white shadow rounded-md"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        zoomActivationKeyCode="Control"
        preventScrolling={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDrag={onNodeDrag}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
