import { v4 as uuidv4 } from "uuid";

export function getAnonId(): string {
  let anonId = localStorage.getItem("anon_id");

  if (!anonId) {
    anonId = uuidv4();
    localStorage.setItem("anon_id", anonId);
  }

  return anonId;
}