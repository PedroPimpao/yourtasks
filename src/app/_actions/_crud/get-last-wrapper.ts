"use client"

import { getLastTaskCreated } from "./getLastTaskCreated"

export const getLastTaskClient = async () => {
    return await getLastTaskCreated()
}