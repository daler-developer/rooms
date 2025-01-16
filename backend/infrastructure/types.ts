import { Response } from "express";
import UserService from "../core/services/UserService/UserService";
import AuthService from "../core/services/AuthService/AuthService";
import { RoomService } from "../core/services/RoomService/RoomService";
import InvitationService from "../core/services/InvitationService/InvitationService";
import { MessageService } from "../core/services/MessageService/MessageService";
import { MessageImageService } from "../core/services/MessageImageService/MessageImageService";

export type CustomContext = {
  userId?: number;
  sessionId?: string;
  userService: UserService;
  authService: AuthService;
  roomService: RoomService;
  invitationService: InvitationService;
  messageService: MessageService;
  messageImageService: MessageImageService;
  res: Response;
};
