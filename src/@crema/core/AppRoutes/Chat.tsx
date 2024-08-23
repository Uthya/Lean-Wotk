import { RoutePermittedRole } from "@crema/constants/AppEnums";
import ChatApi from "../../../pages/ChatApi";

export const chatConfig=[
    {
   permittedRole: RoutePermittedRole.User,
    path: "/chat",
    element: <ChatApi />,
    }
]