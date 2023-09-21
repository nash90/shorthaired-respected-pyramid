import { sendMessageToSantaHandler } from "@/backend/route-handlers/santaHandler"
import { NextRequest } from "next/server"

export async function POST(
  req: NextRequest
  ) {
  
 return sendMessageToSantaHandler(req)
}