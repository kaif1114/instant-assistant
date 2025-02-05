import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const assistantId = searchParams.get("assistantId");

  if (!assistantId) {
    return NextResponse.json(
      { error: "Assistant ID is required" },
      { status: 400 }
    );
  }

  const embedCode = `
<!-- AI Chat Widget -->
<script src="${process.env.NEXT_PUBLIC_DOMAIN}/embed.js"></script>
<script>
  window.addEventListener('load', function() {
    window.initAIChat({
      assistantId: '${assistantId}'
    });
  });
</script>
`;

  return NextResponse.json({ embedCode });
}
