import { SantaMessageApiRequest } from "@/type/SantaMessageApiRequest";
import { UserModel } from "@/type/UserModel";
import { UserProfileModel } from "@/type/UserProfileModel";

export const validateSantaMessageReq = (
  req: SantaMessageApiRequest,
  users: UserModel[],
  userProfiles: UserProfileModel[],
) => {
  const { username } = req;

  // Check if the user is registered
  const userExists = users.some((user) => user.username === username);

  if (!userExists) {
    return {
      isValid: false,
      error: "User is not registered.",
    };
  }

  // Find the user's uid based on the username
  const user = users.find((user) => user.username === username);

  if (!user) {
    return {
      isValid: false,
      error: "User profile not found.",
    };
  }

  // Find the user's birthdate using the user's uid
  const userProfile = userProfiles.find((profile) => profile.userUid === user.uid);

  if (!userProfile) {
    return {
      isValid: false,
      error: "User profile not found.",
    };
  }

  // const userBirthdate = new Date(userProfile.birthdate); // will not parse correct for  "username": "bugs.bunny", "birthdate": "2010/23/01"
  // const currentYear = new Date().getFullYear();
  // const userAge = currentYear - userBirthdate.getFullYear();

  // assuming test data for "username": "bugs.bunny", "birthdate": "2010/23/01", is in correct format of "YYYY/DD/MM" instead
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


export const sendMessage = (req: SantaMessageApiRequest) => {

}