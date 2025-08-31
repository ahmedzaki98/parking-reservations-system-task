import { create } from "zustand";

export type WSMessage = {
  type: string;
  payload: Record<string, string>;
};

type WebSocketStore = {
  socket: WebSocket | null;
  messages: WSMessage[];
  subscribedGates: string[];
  isConnected: boolean;
  refreshKey: number;
  connect: () => void;
  triggerZonesRefresh: () => void;
  subscribeToGate: (gateId: string) => void;
  send: (msg: WSMessage) => void;
};
const WEBSOCKET_URL = import.meta.env.VITE_APP_WEBSOCKET_URL;
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  messages: [],
  subscribedGates: [],
  isConnected: false,
  refreshKey: 0,

  connect: () => {
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
        if (msg?.type === "zone-update") {
          get().triggerZonesRefresh();
        }
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
  triggerZonesRefresh: () => {
    if (refreshTimeout) return;

    refreshTimeout = setTimeout(() => {
      set((state) => ({ refreshKey: state.refreshKey + 1 }));
      refreshTimeout = null;
      console.log("Zones refetched");
    }, 1000);
  },
}));
