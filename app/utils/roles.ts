import { auth } from "@clerk/nextjs/server";
import { Roles } from "../types/globals";
//doesn't support privateMetaData
export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  console.log("checkRole called with role:", role);
  //console.log("Session claims:", sessionClaims);

  return sessionClaims?.metadata.role === role ?? false;
};
