export default async function AnimeRelationsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return <div>{id}: relation</div>;
}
