import { userSelectors } from "@/entities/user";
import { ROUTES } from "@/shared/constants/routes";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
    roles?: string[]
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const {children, roles} = props

    const user = useSelector(userSelectors.getUser)

    if (!user) {
      return <Navigate to={ROUTES.AUTH} />;
    }

    if(roles && roles.length > 0) {
        const isForbidden = !(roles.every((role) => user.roles.includes(role)))
  
        if(isForbidden) {
            return <Navigate to={ROUTES.FORBIDDEN}/>
        }
    
    }

    return <>{children}</>;
};