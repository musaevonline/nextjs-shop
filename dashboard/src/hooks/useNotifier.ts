import { IMessageContext, MessageContext } from "@temp/components/messages";
import { useContext } from "react";

export type UseNotifierResult = IMessageContext;
function useNotifier(): UseNotifierResult {
  const notify = useContext(MessageContext);
  return notify;
}
export default useNotifier;
