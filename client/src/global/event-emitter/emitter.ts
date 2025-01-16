import mitt from "mitt";

type Events = {
  MESSAGES_IS_VIEWED: {
    roomId: number;
  };
};

const emitter = mitt<Events>();

export type EventCallback<K extends keyof Events> = (payload: Events[K]) => void;

export default emitter;
