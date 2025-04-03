
import { createContext } from "react";
import { type usePopover } from "./usePopover";

type ContextType =
  | ReturnType<typeof usePopover>
  | null;

export const PopoverContext = createContext<ContextType>(null);

