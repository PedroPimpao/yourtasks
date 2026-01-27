"use server";

import { db } from "@/src/lib/prisma";

interface GetUserProps {
    userID: string | undefined
}

export const getUser = async ({ userID } : GetUserProps) => {

  if(!userID){
    return
  }
  
  const user = await db.user.findUnique({
    where: {
      id: userID,
    },
  });
  return user;
};
