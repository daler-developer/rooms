import mitt from "mitt";

type Events = {
  MESSAGE_INSERTED: {
    isMessageSentByCurrentUser: boolean;
  };
};

const emitter = mitt<Events>();

export type EventCallback<K extends keyof Events> = (payload: Events[K]) => void;

export default emitter;
