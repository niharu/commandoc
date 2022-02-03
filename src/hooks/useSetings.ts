import { useContext } from "react";
import { UserSettingsContext } from "../provider/UserSettingsProvider";

export const useSettings = () => {
  const settings = useContext(UserSettingsContext);

  if (settings === null)
    throw new Error("UserSettingsProvider でラップしてください");

  return settings;
};
