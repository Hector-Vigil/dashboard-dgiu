import API_URL from "../../config/config.utils";

const getUsersFromDirectory = async () => {
  const users = await fetch(`${API_URL}/getData.php?f=json&t=SIGENU`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return users;
};

export default getUsersFromDirectory;
