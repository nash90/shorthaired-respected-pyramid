import { SantaMessageApiRequest } from "@/type/SantaMessageApiRequest";
import { SantaMessageApiResponse } from "@/type/SantaMessageApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, getUserProfiles } from "../services/UserService";
import { validateSantaMessageReq } from "../services/SantaMessageService";

export const sendMessageToSantaHandler = async (req: NextRequest) => {
  const messageReq = await req.json() as SantaMessageApiRequest;

  // Fetch users and user profiles
  const usersResponse = await getAllUsers();
  const userProfilesResponse = await getUserProfiles();

  if (!usersResponse.ok || !userProfilesResponse.ok) {
    // Handle API fetch errors here
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch user data.",
    }, { status: 500 });
  }

  const users = await usersResponse.json();
  const userProfiles = await userProfilesResponse.json();

  // Validate the request
  const validationResult = validateSantaMessageReq(messageReq, users, userProfiles);

  if (!validationResult.isValid) {
    // Return a 400 error with the validation error message
    return NextResponse.json({
      status: "error",
      message: validationResult.error,
    }, { status: 400 });
  }

  // If validation passes, proceed with sending the message
  // Your message sending logic here

  return NextResponse.json({
    status: "success",
    message: "Message to Santa sent",
  } as SantaMessageApiResponse, { status: 200 });
};





