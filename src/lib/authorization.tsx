import AuthorizationCard from "@/components/authorization-card";
import { Role, useAuthorization } from "./use-authorization";

type AuthorizationProps = {
  allowRoles: Role[];
  children: React.ReactNode;
};

export const Authorization = ({ allowRoles, children }: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();
  let access = false;
  if (allowRoles) {
    access = checkAccess({ allowRoles });
    return <>{access ? children : <><AuthorizationCard allowRoles={allowRoles} /></>}</>;
  }
  return children;
};
