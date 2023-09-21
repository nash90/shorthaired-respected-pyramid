import { SantaMessageApiRequest } from "@/type/SantaMessageApiRequest";
import { SantaMessageApiResponse } from "@/type/SantaMessageApiResponse";
import { NextRequest, NextResponse } from "next/server";

export const sendMessageToSantaHandler = async (
  req: NextRequest,
) => {
  const messageReq = await req.json() as SantaMessageApiRequest
  // console.log("messageReq", messageReq)

  return NextResponse.json({
    status: "success",
    message: "Message to santa sent",
  } as SantaMessageApiResponse, {status: 200});
}
