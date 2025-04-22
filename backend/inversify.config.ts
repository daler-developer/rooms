import { Container } from "inversify";
import { UserRepository } from "./core/repositories/UserRepository/UserRepository";
import { UserRoomNewMessagesCountRepository } from "./core/repositories/UserRoomNewMessagesCountRepository/UserRoomNewMessagesCountRepository";
import { RoomRepository } from "./core/repositories/RoomRepository/RoomRepository";
import PgUserRepository from "./infrastructure/repository/PgUserRepository/PgUserRepository";
import { PgRoomRepository } from "./infrastructure/repository/PgRoomRepository/PgRoomRepository";
import UserService from "./core/services/UserService/UserService";
import AuthService from "./core/services/AuthService/AuthService";
import { RoomService } from "./core/services/RoomService/RoomService";
import { TYPES } from "./types";
import { InvitationRepository } from "./core/repositories/InvitationRepository/InvitationRepository";
import { PgInvitationRepository } from "./infrastructure/repository/PgInvitationRepository/PgInvitationRepository";
import InvitationService from "./core/services/InvitationService/InvitationService";
import { PgUserToRoomParticipationRepository } from "./infrastructure/repository/PgUserToRoomParticipationRepository/PgUserToRoomParticipationRepository";
import { UserToRoomParticipationRepository } from "./core/repositories/UserToRoomParticipationRepository/UserToRoomParticipationRepository";
import { PgMessageRepository } from "./infrastructure/repository/PgMessageRepository/PgMessageRepository";
import { PgMessageImageRepository } from "./infrastructure/repository/PgMessageImageRepository/PgMessageImageRepository";
import { MessageService } from "./core/services/MessageService/MessageService";
import { MessageRepository } from "./core/repositories/MessageRepository/MessageRepository";
import { MessageImageRepository } from "./core/repositories/MessageImageRepository/MessageImageRepository";
import { MessageImageService } from "./core/services/MessageImageService/MessageImageService";
import { PgMessageViewRepository } from "./infrastructure/repository/PgMessageViewRepository/PgMessageViewRepository";
import { MessageViewRepository } from "./core/repositories/MessageViewRepository/MessageViewRepository";
import { PgScheduledMessagesCountRepository } from "./infrastructure/repository/PgScheduledMessagesCountRepository/PgScheduledMessagesCountRepository";
import { PgUserRoomNewMessagesCountRepository } from "./infrastructure/repository/PgUserRoomNewMessagesCountRepository/PgUserRoomNewMessagesCountRepository";
import { ScheduledMessagesCountRepository } from "./core/repositories/ScheduledMessagesCountRepository/ScheduledMessagesCountRepository";

const iocContainer = new Container();

iocContainer.bind<UserRepository>(TYPES.UserRepository).to(PgUserRepository);
iocContainer.bind<RoomRepository>(TYPES.RoomRepository).to(PgRoomRepository);
iocContainer.bind<InvitationRepository>(TYPES.InvitationRepository).to(PgInvitationRepository);
iocContainer.bind<UserToRoomParticipationRepository>(TYPES.UserToRoomParticipationRepository).to(PgUserToRoomParticipationRepository);
iocContainer.bind<MessageRepository>(TYPES.MessageRepository).to(PgMessageRepository);
iocContainer.bind<MessageImageRepository>(TYPES.MessageImageRepository).to(PgMessageImageRepository);
iocContainer.bind<MessageViewRepository>(TYPES.MessageViewRepository).to(PgMessageViewRepository);
iocContainer.bind<ScheduledMessagesCountRepository>(TYPES.ScheduledMessagesCountRepository).to(PgScheduledMessagesCountRepository);
iocContainer.bind<UserRoomNewMessagesCountRepository>(TYPES.UserRoomNewMessagesCountRepository).to(PgUserRoomNewMessagesCountRepository);

iocContainer.bind<UserService>(TYPES.UserService).to(UserService);
iocContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
iocContainer.bind<RoomService>(TYPES.RoomService).to(RoomService);
iocContainer.bind<InvitationService>(TYPES.InvitationService).to(InvitationService);
iocContainer.bind<MessageService>(TYPES.MessageService).to(MessageService);
iocContainer.bind<MessageImageService>(TYPES.MessageImageService).to(MessageImageService);

export { iocContainer };
