import { ToolWorkspace } from "@/components/tools/tool-workspace"

export default function JsonToolPage() {
  return (
    <ToolWorkspace
      title="JSON Formatter"
      description="Format and validate JSON locally in your browser. Your input is not sent to a server."
      inputLabel="JSON input"
      outputLabel="Formatted JSON"
      inputPlaceholder={'{"name":"DevToolkit","version":1}'}
      tool="json"
      downloadName="formatted.json"
    />
  )
}
