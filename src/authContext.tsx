import React from "react";

interface IAuthContext {
  user: { name: string; email: string };
  onSignOut: () => void;
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: "",
    email: "",
  },
  onSignOut: () => {},
});
