"use server";

import { db } from "@/src/lib/prisma";

export const findEmail = async (emailInput: string) => {
  const user = await db.user.findUnique({
    where: {
      email: emailInput,
    },
  });
  return user;
};
