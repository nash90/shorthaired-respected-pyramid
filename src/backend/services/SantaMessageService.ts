import { SantaMessageApiRequest } from "../../type/SantaMessageApiRequest";
import { UserModel } from "../../type/UserModel";
import { UserProfileModel } from "../../type/UserProfileModel";
import { EmailQueue, EmailTask } from "./SantaEmailQueue";

export const getUserAndProfile = (
  req: SantaMessageApiRequest,
  users: UserModel[],
  userProfiles: UserProfileModel[],
) => {
  const { username } = req;

  // Get the user based on the username
  const user = users.find((user) => user.username === username);

  // Get the userProfile based on the user's uid
  const userProfile = user ? userProfiles.find((profile) => profile.userUid === user.uid) : undefined;

  return { user, userProfile };
};

export const validateSantaMessageReq = (
  user: UserModel | undefined,
  userProfile: UserProfileModel | undefined,
) => {
  if (!user) {
    return {
      isValid: false,
      error: "User is not registered.",
    };
  }

  if (!userProfile) {
    return {
      isValid: false,
      error: "User profile not found.",
    };
  }

  // Parse the birthdate
  const birthdateParts = userProfile.birthdate.split('/');
  
  if (birthdateParts.length !== 3) {
    return {
      isValid: false,
      error: "Invalid birthdate format.",
    };
  }

  const birthYear = parseInt(birthdateParts[0]);
  const birthMonth = parseInt(birthdateParts[1]);
  const birthDay = parseInt(birthdateParts[2]);

  // Calculate the user's age taking day and month into account
  const today = new Date();
  const birthdate = new Date(birthYear, birthMonth - 1, birthDay); // Subtract 1 from birthMonth to adjust for JavaScript's 0-based month indexing
  let userAge = today.getFullYear() - birthdate.getFullYear();
  
  // Check if the birthday for this year has already occurred
  if (
    today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())
  ) {
    userAge--;
  }

  // Check if the user is over 10 years old
  if (userAge > 10) {
    return {
      isValid: false,
      error: "User is over 10 years old.",
    };
  }

  // If all checks pass, the request is valid
  return {
    isValid: true,
  };
};


export const sendMessage = (
  user: UserModel,
  userProfile: UserProfileModel,
  gift_message: string
) => {
  const emailQueue = new EmailQueue();

  const emailTask: EmailTask = {
    from: "do_not_reply@northpole.com",
    to: "santa@northpole.com",
    username: user?.username,
    address: userProfile.address,
    giftMessage: gift_message,
    subject: "Santa Message'"
  };
  
  emailQueue.enqueue(emailTask);
}