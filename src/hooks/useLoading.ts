import { useContext } from "react";
import { UserContext } from "../provider/UserProvider";

export function useLoading(): boolean {
  const user = useContext(UserContext);

  if (user === null) throw new Error("UserProviderでラップしてください");

  return user.loading;
}
