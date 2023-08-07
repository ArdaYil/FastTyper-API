import UserModel, { User } from "../../src/models/user";

interface OptionalUser extends Partial<User> {}

export const getMockUserSync = (data?: OptionalUser) => {
  const username = "a";
  const email = "test@email.com";
  const password = "12345678";

  const user = new UserModel({ ...(data || {}), username, email, password });

  return user;
};

const getMockUser = async (data?: OptionalUser) => {
  const user = getMockUserSync(data);
  await user.save();

  return user;
};

export default getMockUser;
