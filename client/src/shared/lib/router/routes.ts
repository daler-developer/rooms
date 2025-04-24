export const ROUTE_NAME = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  HOME: "HOME",
} as const;

export const ROUTE_PATH = {
  [ROUTE_NAME.HOME]: "/home",
  [ROUTE_NAME.LOGIN]: "/login",
  [ROUTE_NAME.REGISTER]: "/register",
};

export const buildRoutePath = {
  [ROUTE_NAME.HOME]({ roomId }: { roomId?: number } = {}) {
    const searchParams = new URLSearchParams();
    if (roomId) {
      searchParams.set("roomId", String(roomId));
    }
    return ROUTE_PATH.HOME + "?" + searchParams.toString();
  },
  [ROUTE_NAME.LOGIN]() {
    return ROUTE_PATH[ROUTE_NAME.LOGIN];
  },
  [ROUTE_NAME.REGISTER]() {
    return ROUTE_PATH[ROUTE_NAME.REGISTER];
  },
};
