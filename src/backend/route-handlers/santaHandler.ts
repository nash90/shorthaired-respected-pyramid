import { SantaMessageApiRequest } from "@/type/SantaMessageApiRequest";
import { SantaMessageApiResponse } from "@/type/SantaMessageApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, getUserProfiles } from "../services/UserService";
import { getUserAndProfile, validateSantaMessageReq } from "../services/SantaMessageService";

export const sendMessageToSantaHandler = async (req: NextRequest) => {
  const messageReq = await req.json() as SantaMessageApiRequest;

  // Fetch users and user profiles from api
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

  // find user and profile info for user request
  const {user, userProfile} = getUserAndProfile(messageReq, users, userProfiles)

  // Validate the user and profile
  const validationResult = validateSantaMessageReq(user, userProfile);

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





