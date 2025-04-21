const currentUser = () => {
  const userString = localStorage.getItem('user');
  return parseUser(userString);
};

const parseUser = (userString) => {
  if (!userString) {
    return null;
  }

  try {
    const userData = JSON.parse(userString);
    return userData;
  } catch (e) {
    console.error("Invalid user data in localStorage:", e);
    return null;
  }
};

export default currentUser;
