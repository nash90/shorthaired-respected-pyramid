const userAPIUrl = process.env.USER_SERVICE_API;

export const getAllUsers = () => {
  const url = `${userAPIUrl}/alj-devops/santa-data/master/users.json`;
  return fetch(url)
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error getAllUsers:", err);
      throw Error(err);
    });
};


export const getUserProfiles = () => {
  const url = `${userAPIUrl}/alj-devops/santa-data/master/userProfiles.json`;
  return fetch(url)
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error getUserProfiles:", err);
      throw Error(err);
    });
};

