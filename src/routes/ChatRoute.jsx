import { Route } from "react-router-dom";
import Chat from "../pages/Chat/Chat";

const ChatRoute = <Route path={"/chat"} element={<Chat />} exact />;

export default ChatRoute;
