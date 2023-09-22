import { sendMessageToSantaHandler } from "@/backend/route-handlers/SantaHandler"
import { NextRequest } from "next/server"

export async function POST(
  req: NextRequest
  ) {
  
 return sendMessageToSantaHandler(req)
}