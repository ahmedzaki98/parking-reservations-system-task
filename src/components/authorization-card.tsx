import { Role } from "@/lib/use-authorization";

const AuthorizationCard = ({ allowRoles }: { allowRoles: Role[] }) => {
  return (
    <div className="h-full flex items-center justify-center text-2xl text-primary gap-2">
      <span >This Section is Available only to </span>
      <span className="underline">{allowRoles && allowRoles.join(", ")}</span>
    </div>
  );
};

export default AuthorizationCard;
