const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  RoomRepository: Symbol.for("RoomRepository"),
  InvitationRepository: Symbol.for("InvitationRepository"),
  UserToRoomParticipationRepository: Symbol.for("UserToRoomParticipationRepository"),
  MessageRepository: Symbol.for("MessageRepository"),
  MessageImageRepository: Symbol.for("MessageImageRepository"),
  MessageViewRepository: Symbol.for("MessageViewRepository"),
  ScheduledMessagesCountRepository: Symbol.for("ScheduledMessagesCountRepository"),
  UserRoomNewMessagesCountRepository: Symbol.for("UserRoomNewMessagesCountRepository"),

  UserService: Symbol.for("UserService"),
  AuthService: Symbol.for("AuthService"),
  RoomService: Symbol.for("RoomService"),
  InvitationService: Symbol.for("InvitationService"),
  MessageService: Symbol.for("MessageService"),
  MessageImageService: Symbol.for("MessageImageService"),
};

export { TYPES };
