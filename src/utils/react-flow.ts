import { AnimeWithRelationsResponse, RelatedAnimeItem } from "./schema";
import { type Node, type Edge } from "@xyflow/react";

type RelationType = RelatedAnimeItem["relation_type"];

const SKIP_RELATIONS = new Set<RelationType>(["character", "other"]);

const RELATION_COLUMN: Partial<Record<RelationType, number>> = {
  adaptation: -3,
  prequel: -2,
  parent_story: -1,
  sequel: 1,
  side_story: 2,
  spin_off: 4,
  summary: 3,
  alternative_version: 5,
  alternative_setting: 6,
  full_story: -1,
};

const SOURCE_RELATIONS = new Set<RelationType>(
  Object.entries(RELATION_COLUMN)
    .filter(([, column]) => column < 0)
    .map(([type]) => type as RelationType),
);

const NODE_WIDTH = 220;
const NODE_HEIGHT = 80;
const GAP_X = 50;
const GAP_Y = 300;

function toAnimeNode(
  id: number,
  title: string,
  picture: string,
  nodeTypes: string,
  position: { x: number; y: number },
  relationType?: RelationType,
  relationTypeFormatted?: string,
): Node {
  return {
    id: id.toString(),
    data: {
      anime: {
        id,
        title,
        picture,
      },
      relationType,
      relationTypeFormatted,
    },
    position,
    type: nodeTypes,
  };
}

function stackPositions(count: number, x: number) {
  const totalHeight = count * NODE_HEIGHT + Math.max(0, count - 1) * GAP_Y;
  const startY = -totalHeight / 2 + NODE_HEIGHT / 2;

  return Array.from({ length: count }, (_, i) => ({
    x,
    y: startY + i * (NODE_HEIGHT + GAP_Y),
  }));
}

export default function mapRelationsToReactFlow(
  animeWithRelations: AnimeWithRelationsResponse,
  nodeTypes: string,
) {
  const { id, title, main_picture, related_anime } = animeWithRelations;
  const currentId = id.toString();

  const byColumn = new Map<number, RelatedAnimeItem[]>();

  for (const relation of related_anime) {
    if (SKIP_RELATIONS.has(relation.relation_type)) continue;

    const column = RELATION_COLUMN[relation.relation_type];
    if (column === undefined) continue;

    const group = byColumn.get(column) ?? [];
    group.push(relation);
    byColumn.set(column, group);
  }

  const nodes: Node[] = [
    toAnimeNode(
      id,
      title,
      main_picture?.large || main_picture?.medium || "",
      nodeTypes,
      { x: 0, y: 0 },
    ),
  ];
  const edges: Edge[] = [];

  for (const [column, relations] of byColumn) {
    const x = column * (NODE_WIDTH + GAP_X);
    const positions = stackPositions(relations.length, x);

    relations.forEach((relation, i) => {
      const { node, relation_type, relation_type_formatted } = relation;
      const relatedId = node.id.toString();
      const isSourceRelation = SOURCE_RELATIONS.has(relation_type);

      nodes.push(
        toAnimeNode(
          node.id,
          node.title,
          node.main_picture?.large ?? node.main_picture?.medium ?? "",
          nodeTypes,
          positions[i],
          relation_type,
          relation_type_formatted,
        ),
      );

      edges.push({
        id: isSourceRelation
          ? `${relatedId}-${currentId}`
          : `${currentId}-${relatedId}`,
        source: isSourceRelation ? relatedId : currentId,
        target: isSourceRelation ? currentId : relatedId,
      });
    });
  }

  return { nodes, edges };
}
