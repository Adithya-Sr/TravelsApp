import { Users, userModel } from "../users/users.model";
import { AgentDetails, agentsModel } from "../agents/agents.model";
export const createUser = async (user: Omit<Users, "comparePassword">) => {
  return userModel.create(user);
};

export const findUser = async (email: Users["email"]) => {
  return userModel.findOne({ email });
};
export const createPackage = async (agentpkg: AgentDetails) => {
  return agentsModel.create(agentpkg);
};

export const findPackages = async () => {
  return agentsModel.find();
};
