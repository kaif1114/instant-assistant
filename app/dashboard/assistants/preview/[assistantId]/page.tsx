import AssistantPage from "./AssistantPage";

interface Props {
  params: Promise<{
    assistantId: string;
  }>;
}

export default async function page({ params }: Props) {
  const resolvedParams = await params;
  return <AssistantPage assistantId={resolvedParams.assistantId} />;
}
