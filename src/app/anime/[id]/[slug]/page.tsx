export default async function AnimeOverviewPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;
  return <div>{id}: overview</div>;
}
