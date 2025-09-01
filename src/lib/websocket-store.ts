import { create } from "zustand";

export type WSMessage = {
  type: string;
  payload: Record<string, string>;
};
import { QueryClient } from "@tanstack/react-query";
import { websocketRefetch, websocketRefetchZones } from "./websocket-refetch";

type WebSocketStore = {
  socket: WebSocket | null;
  messages: WSMessage[];
  subscribedGates: string[];
  isConnected: boolean;
  // refreshKey: number;
  connect: (queryClient: QueryClient) => void;
  // triggerZonesRefresh: () => void;
  subscribeToGate: (gateId: string) => void;
  send: (msg: WSMessage) => void;
};
const WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL;

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  messages: [],
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
console.log('msg: ', msg);
        websocketRefetchZones({ queryClient, msg });
        // if (msg.type === "admin-update") {
        //   websocketRefetch({ queryClient, msg });
        // }
        // if (msg?.type === "zone-update") {
        // }
        set((state) => ({ messages: [...state.messages, msg] }));
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
  // triggerZonesRefresh: () => {
  //   if (refreshTimeout) return;

  //   refreshTimeout = setTimeout(() => {
  //     set((state) => ({ refreshKey: state.refreshKey + 1 }));
  //     refreshTimeout = null;
  //   }, 1000);
  // },
}));
