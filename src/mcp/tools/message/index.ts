import { deleteMessageTool } from "./delete_message";
import { getAllMessagesTool } from "./get_all_messages";
import { getMessageTool } from "./get_message";
import { sendMessageTool } from "./send_message";
import { waitMessageTool } from "./wait_message";

export const MessageTools = [deleteMessageTool, getAllMessagesTool, getMessageTool, sendMessageTool, waitMessageTool];
