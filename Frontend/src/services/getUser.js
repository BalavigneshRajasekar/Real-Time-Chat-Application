/* eslint-disable no-unused-vars */

const userService = {
  getUserData: async () => {
    try {
      const response = await fetch("https://dumyjson.com/users");
      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default userService;
