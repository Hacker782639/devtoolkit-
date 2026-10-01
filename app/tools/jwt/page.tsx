"use client"

import { ToolWorkspace } from "@/components/tools/tool-workspace"


export default function JwtToolPage() {
  return (
    <ToolWorkspace
      title="JWT Decoder"
      description="Decode and inspect JWT headers and payloads locally in your browser. Your token is never sent to a server."
      inputLabel="JWT token"
      outputLabel="Decoded token"
      inputPlaceholder="Paste your JWT token here..."
      tool="jwt"
      downloadName="decoded-jwt.json"
    />
  )
}
