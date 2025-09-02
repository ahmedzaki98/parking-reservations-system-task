import { create } from "zustand";

export type WSMessage = {
  type: string;
  id?: string;
  payload: Record<string, string>;
};
import { QueryClient } from "@tanstack/react-query";
import { websocketRefetchZones } from "./websocket-refetch";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/local-storage";
import { equal } from "@/utils/helper";
import { uuidv4 } from "zod";

type WebSocketStore = {
  socket: WebSocket | null;
  messages: WSMessage[];
  subscribedGates: string[];
  isConnected: boolean;
  setMessages: (messages: WSMessage[]) => void;
  connect: (queryClient: QueryClient) => void;
  subscribeToGate: (gateId: string) => void;
  send: (msg: WSMessage) => void;
};
const WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL;
const LOCAL_STORAGE_KEY = "ws_messages";

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  messages: loadFromLocalStorage<WSMessage[]>(LOCAL_STORAGE_KEY) || [],
  subscribedGates: [],
  isConnected: false,

  connect: (queryClient) => {
    if (get().socket) return; // avoid multiple connections
    if (get().isConnected) return;
    const socket = new WebSocket(WEBSOCKET_URL);
    if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    ) {
      console.log("WebSocket already connected or connecting");
      set({ isConnected: true });
    }

    if (!get().isConnected) {
      socket.onopen = () => {
        console.log("WS connected");
      };
    }

    socket.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data);
        websocketRefetchZones({ queryClient, msg });
        set((state) => {
          const foundMessage = get().messages.find(
            (m) => m.type === msg.type && equal(m.payload, msg.payload)
          );
          if (foundMessage) return {};
          const newMessage = { ...msg, id: crypto.randomUUID?.() ?? uuidv4() };
          const updatedMessages = [...state.messages, newMessage];
          const filteredMessages = updatedMessages.filter(
            (msg) => msg.type !== "admin-update"
          );

          saveToLocalStorage(LOCAL_STORAGE_KEY, filteredMessages);

          return { messages: filteredMessages };
        });
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    socket.onclose = () => {
      console.log("WS disconnected");
      set({ socket: null });
      set({ isConnected: false });
    };

    set({ socket });
  },

  subscribeToGate: (gateId) => {
    if (get().subscribedGates.includes(gateId)) return; // already subscribed
    get().send({ type: "subscribe", payload: { gateId } });
    set((state) => ({
      subscribedGates: [...state.subscribedGates, gateId],
    }));
  },

  send: (msg) => {
    const socket = get().socket;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  },
  setMessages: (messages: WSMessage[]) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set({ messages });
    saveToLocalStorage(LOCAL_STORAGE_KEY, messages);
  },
}));
