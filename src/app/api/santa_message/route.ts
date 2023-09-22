import { NextRequest } from "next/server"
import { sendMessageToSantaHandler } from "../../../backend/route-handlers/SantaHandler"

export async function POST(
  req: NextRequest
  ) {
  
 return sendMessageToSantaHandler(req)
}