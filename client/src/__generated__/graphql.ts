/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type AcceptInvitationInput = {
  roomId: Scalars['Int']['input'];
};

export type BlockUserInput = {
  userId: Scalars['Int']['input'];
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  thumbnailUrl: Scalars['String']['input'];
  usersInvitedIds: Array<Scalars['Int']['input']>;
};

export type EditMyEmailInput = {
  newEmail: Scalars['String']['input'];
};

export type EditMyPasswordInput = {
  newPassword: Scalars['String']['input'];
  newPasswordRepeat: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type GetUserInvitationsInput = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Invitation = {
  __typename?: 'Invitation';
  createdAt: Scalars['String']['output'];
  invitedUser: User;
  inviter: User;
  inviterId: Scalars['Int']['output'];
  room: Room;
  roomId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type LeaveRoomInput = {
  roomId: Scalars['Int']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String']['output'];
  user: User;
};

export type MeIsBlockedStatusResult = {
  __typename?: 'MeIsBlockedStatusResult';
  isBlocked: Scalars['Boolean']['output'];
  userId: Scalars['Int']['output'];
};

export type MeIsInvitedToRoomResult = {
  __typename?: 'MeIsInvitedToRoomResult';
  invitation: Invitation;
  room: Room;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int']['output'];
  images: Array<MessageImage>;
  isViewedByMe: Scalars['Boolean']['output'];
  room: Room;
  roomId: Scalars['Int']['output'];
  scheduledAt?: Maybe<Scalars['String']['output']>;
  sender: User;
  senderId: Scalars['Int']['output'];
  sentAt?: Maybe<Scalars['String']['output']>;
  sessionId: Scalars['String']['output'];
  text?: Maybe<Scalars['String']['output']>;
  viewers: Array<User>;
  viewsCount: Scalars['Int']['output'];
};

export type MessageImage = {
  __typename?: 'MessageImage';
  id: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type MessageViewedEvent = {
  __typename?: 'MessageViewedEvent';
  message: Message;
  viewer: User;
};

export type MessagesDeletedEvent = {
  __typename?: 'MessagesDeletedEvent';
  messageIds: Array<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation: Scalars['Boolean']['output'];
  blockUser: User;
  createRoom: Room;
  deleteMessages: Scalars['Boolean']['output'];
  editMyEmail: User;
  editMyPassword: User;
  excludeUserFromRoom: Room;
  inviteUsersToRoom: Scalars['Boolean']['output'];
  leaveRoom: Scalars['Boolean']['output'];
  login: LoginResult;
  markMessageAsViewedByMe: Message;
  notifyMeOnlineStatusChange: User;
  notifyMeTypingStatusChange: Scalars['Boolean']['output'];
  register: RegisterResult;
  rejectInvitation: Scalars['Boolean']['output'];
  removeMyAvatar: User;
  scheduleMessage: Message;
  sendMessage: Message;
  sendScheduledMessagesNow: Scalars['Boolean']['output'];
  startSession: StartSessionResult;
  test: TestResult;
  unblockUser: User;
  uploadProfilePicture: User;
  userUpdateFirstName: User;
  userUpdateLastName: User;
};


export type MutationAcceptInvitationArgs = {
  input: AcceptInvitationInput;
};


export type MutationBlockUserArgs = {
  input: BlockUserInput;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationDeleteMessagesArgs = {
  messageIds: Array<Scalars['Int']['input']>;
  roomId: Scalars['Int']['input'];
};


export type MutationEditMyEmailArgs = {
  input: EditMyEmailInput;
};


export type MutationEditMyPasswordArgs = {
  input: EditMyPasswordInput;
};


export type MutationExcludeUserFromRoomArgs = {
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationInviteUsersToRoomArgs = {
  invitedUsersIds: Array<Scalars['Int']['input']>;
  roomId: Scalars['Int']['input'];
};


export type MutationLeaveRoomArgs = {
  input: LeaveRoomInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkMessageAsViewedByMeArgs = {
  messageId: Scalars['Int']['input'];
};


export type MutationNotifyMeOnlineStatusChangeArgs = {
  status: Scalars['String']['input'];
};


export type MutationNotifyMeTypingStatusChangeArgs = {
  isTyping?: InputMaybe<Scalars['Boolean']['input']>;
  roomId: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRejectInvitationArgs = {
  input: RejectInvitationInput;
};


export type MutationScheduleMessageArgs = {
  input: ScheduleMessage;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationSendScheduledMessagesNowArgs = {
  messageIds: Array<Scalars['Int']['input']>;
};


export type MutationTestArgs = {
  input: TestInput;
};


export type MutationUnblockUserArgs = {
  input: UnblockUserInput;
};


export type MutationUploadProfilePictureArgs = {
  input: UploadProfilePictureInput;
};


export type MutationUserUpdateFirstNameArgs = {
  newFirstName: Scalars['String']['input'];
};


export type MutationUserUpdateLastNameArgs = {
  newLastName: Scalars['String']['input'];
};

export type NewMessageEvent = {
  __typename?: 'NewMessageEvent';
  message: Message;
  room: Room;
};

export type Query = {
  __typename?: 'Query';
  checkEmailAvailability: Scalars['Boolean']['output'];
  me: User;
  message: Message;
  room: Room;
  searchUsers: SearchUsersResult;
  users: Array<User>;
};


export type QueryCheckEmailAvailabilityArgs = {
  email: Scalars['String']['input'];
};


export type QueryMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySearchUsersArgs = {
  input: SearchUsersInput;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
  profilePictureUrl?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  token: Scalars['String']['output'];
  user: User;
};

export type RejectInvitationInput = {
  roomId: Scalars['Int']['input'];
};

export type RejectedMyInvitationSubscriptionResult = {
  __typename?: 'RejectedMyInvitationSubscriptionResult';
  inviterId: Scalars['Int']['output'];
  room: Room;
  roomId: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type ReplyToInvitation = {
  __typename?: 'ReplyToInvitation';
  accepted: Scalars['Boolean']['output'];
  invitation: Invitation;
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastMessage?: Maybe<Message>;
  messages: RoomMessagesList;
  myScheduledMessagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participants: Array<User>;
  participantsCount: Scalars['Int']['output'];
  participantsOnlineCount: Scalars['Int']['output'];
  participantsTyping: Array<User>;
  pendingInvitations: Array<Invitation>;
  pendingInvitationsCount: Scalars['Int']['output'];
  scheduledMessages: RoomMessagesList;
  thumbnailUrl: Scalars['String']['output'];
  unreadMessagesCount: Scalars['Int']['output'];
};


export type RoomMessagesArgs = {
  offset: Scalars['Int']['input'];
};


export type RoomScheduledMessagesArgs = {
  offset: Scalars['Int']['input'];
};

export type RoomMessagesList = {
  __typename?: 'RoomMessagesList';
  data: Array<Message>;
  hasMore: Scalars['Boolean']['output'];
};

export type RoomParticipantLeftEvent = {
  __typename?: 'RoomParticipantLeftEvent';
  userId: Scalars['Int']['output'];
};

export type RoomParticipantLeftSubscriptionInput = {
  roomId: Scalars['Int']['input'];
};

export enum RoomsSortBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  JoinedAtAsc = 'JOINED_AT_ASC',
  JoinedAtDesc = 'JOINED_AT_DESC'
}

export type ScheduleMessage = {
  imageUrls: Array<Scalars['String']['input']>;
  roomId: Scalars['Int']['input'];
  scheduleAt: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUsersInput = {
  excludeMe: Scalars['Boolean']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  q: Scalars['String']['input'];
};

export type SearchUsersResult = {
  __typename?: 'SearchUsersResult';
  hasMore: Scalars['Boolean']['output'];
  users: Array<User>;
};

export type SendMessageInput = {
  imageUrls: Array<Scalars['String']['input']>;
  roomId: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type StartSessionResult = {
  __typename?: 'StartSessionResult';
  sessionToken: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  meIsBlockedStatus: MeIsBlockedStatusResult;
  meIsExcludedFromRoom: Room;
  meIsInvitedToRoom: MeIsInvitedToRoomResult;
  messageViewed: MessageViewedEvent;
  messagesDeleted: MessagesDeletedEvent;
  newMessage: NewMessageEvent;
  repliedToMyInvitation: ReplyToInvitation;
  roomParticipantJoined: User;
  roomParticipantLeft: User;
  roomPendingInvitationsCountChange: Room;
  userOnlineStatusChange: UserOnlineStatusChangeSubscriptionResult;
  userTypingStatusChange: UserTypingStatusChangeEvent;
  usersOnlineStatusChange: User;
};


export type SubscriptionMessageViewedArgs = {
  messageId: Scalars['Int']['input'];
};


export type SubscriptionMessagesDeletedArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionNewMessageArgs = {
  skipFromCurrentSession: Scalars['Boolean']['input'];
};


export type SubscriptionRoomParticipantJoinedArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomParticipantLeftArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomPendingInvitationsCountChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionUserOnlineStatusChangeArgs = {
  input: UserOnlineStatusChangeSubscriptionInput;
};


export type SubscriptionUserTypingStatusChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionUsersOnlineStatusChangeArgs = {
  userIds: Array<Scalars['Int']['input']>;
};

export type TestInput = {
  bar: Scalars['Int']['input'];
  foo: Scalars['String']['input'];
};

export type TestResult = {
  __typename?: 'TestResult';
  result?: Maybe<Scalars['String']['output']>;
};

export type UnblockUserInput = {
  userId: Scalars['Int']['input'];
};

export type UploadProfilePictureInput = {
  profilePictureUrl: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  invitations: Array<Invitation>;
  invitationsCount: Scalars['Int']['output'];
  isAdmin: Scalars['Boolean']['output'];
  isBlocked: Scalars['Boolean']['output'];
  isOnline: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  passwordLength: Scalars['Int']['output'];
  profilePictureUrl?: Maybe<Scalars['String']['output']>;
  rooms: Array<Room>;
};

export type UserOnlineStatusChangeSubscriptionInput = {
  userId: Scalars['Int']['input'];
};

export type UserOnlineStatusChangeSubscriptionResult = {
  __typename?: 'UserOnlineStatusChangeSubscriptionResult';
  isOnline: Scalars['Boolean']['output'];
};

export type UserTypingStatusChangeEvent = {
  __typename?: 'UserTypingStatusChangeEvent';
  isTyping: Scalars['Boolean']['output'];
  user: User;
};

export type MeBlockedStatusSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MeBlockedStatusSubscription = { __typename?: 'Subscription', meIsBlockedStatus: { __typename?: 'MeIsBlockedStatusResult', isBlocked: boolean } };

export type AppGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AppGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number } };

export type StartSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type StartSessionMutation = { __typename?: 'Mutation', startSession: { __typename?: 'StartSessionResult', sessionToken: string } };

export type GetMeIdOnlyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeIdOnlyQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number } };

export type GetMeTempQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeTempQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string } };

export type BlockUserMutationVariables = Exact<{
  input: BlockUserInput;
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: { __typename?: 'User', id: number, email: string, isBlocked: boolean } };

export type SearchUsersQueryVariables = Exact<{
  input: SearchUsersInput;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'SearchUsersResult', hasMore: boolean, users: Array<{ __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null }> } };

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', id: number, name: string, thumbnailUrl: string, participantsCount: number, unreadMessagesCount: number, lastMessage?: { __typename?: 'Message', id: number, text?: string | null, sender: { __typename?: 'User', id: number, email: string } } | null } };

export type SubscribeToUserOnlineStatusChangeSubscriptionVariables = Exact<{
  input: UserOnlineStatusChangeSubscriptionInput;
}>;


export type SubscribeToUserOnlineStatusChangeSubscription = { __typename?: 'Subscription', userOnlineStatusChange: { __typename?: 'UserOnlineStatusChangeSubscriptionResult', isOnline: boolean } };

export type EmailFormGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type EmailFormGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string } };

export type EditMyEmailMutationVariables = Exact<{
  input: EditMyEmailInput;
}>;


export type EditMyEmailMutation = { __typename?: 'Mutation', editMyEmail: { __typename?: 'User', id: number, email: string } };

export type EditMyProfilePictureGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type EditMyProfilePictureGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, profilePictureUrl?: string | null } };

export type RemoveMyAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveMyAvatarMutation = { __typename?: 'Mutation', removeMyAvatar: { __typename?: 'User', id: number, profilePictureUrl?: string | null } };

export type UploadProfilePictureInputMutationVariables = Exact<{
  input: UploadProfilePictureInput;
}>;


export type UploadProfilePictureInputMutation = { __typename?: 'Mutation', uploadProfilePicture: { __typename?: 'User', id: number, profilePictureUrl?: string | null } };

export type LeaveRoomMutationVariables = Exact<{
  input: LeaveRoomInput;
}>;


export type LeaveRoomMutation = { __typename?: 'Mutation', leaveRoom: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', token: string, user: { __typename?: 'User', id: number } } };

export type RoomGetPendingInvitationsQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomGetPendingInvitationsQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, pendingInvitations: Array<{ __typename?: 'Invitation', userId: number, roomId: number }> } };

export type InviteUsersToRoomMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  invitedUsersIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type InviteUsersToRoomMutation = { __typename?: 'Mutation', inviteUsersToRoom: boolean };

export type MeIsInvitedToRoomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MeIsInvitedToRoomSubscription = { __typename?: 'Subscription', meIsInvitedToRoom: { __typename?: 'MeIsInvitedToRoomResult', room: { __typename?: 'Room', id: number, name: string } } };

export type PrevMeInvitationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type PrevMeInvitationsCountQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, invitationsCount: number } };

export type UpdateMeInvitationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UpdateMeInvitationsCountQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, invitationsCount: number } };

export type NewMessageSubscriptionSubscriptionVariables = Exact<{
  skipFromCurrentSession: Scalars['Boolean']['input'];
}>;


export type NewMessageSubscriptionSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'NewMessageEvent', message: { __typename?: 'Message', id: number, text?: string | null, roomId: number, senderId: number } } };

export type RepliedToMyInvitationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RepliedToMyInvitationSubscription = { __typename?: 'Subscription', repliedToMyInvitation: { __typename?: 'ReplyToInvitation', accepted: boolean, invitation: { __typename?: 'Invitation', userId: number, roomId: number, invitedUser: { __typename?: 'User', id: number, email: string }, room: { __typename?: 'Room', id: number, name: string } } } };

export type UnblockUserMutationVariables = Exact<{
  input: UnblockUserInput;
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: { __typename?: 'User', id: number, isBlocked: boolean } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, password: string, profilePictureUrl?: string | null, invitationsCount: number } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResult', token: string, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string } } };

export type CheckEmailAvailabilityQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckEmailAvailabilityQuery = { __typename?: 'Query', checkEmailAvailability: boolean };

export type InvitationsButtonGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitationsButtonGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, invitationsCount: number } };

export type InvitationsButtonMeInvitedToRoomSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type InvitationsButtonMeInvitedToRoomSubSubscription = { __typename?: 'Subscription', meIsInvitedToRoom: { __typename?: 'MeIsInvitedToRoomResult', invitation: { __typename?: 'Invitation', userId: number, roomId: number } } };

export type InvitationsListQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitationsListQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, invitations: Array<{ __typename?: 'Invitation', userId: number, roomId: number, createdAt: string, room: { __typename?: 'Room', id: number, name: string, thumbnailUrl: string }, inviter: { __typename?: 'User', id: number, firstName: string, lastName: string } }> } };

export type AcceptInvitationMutationVariables = Exact<{
  input: AcceptInvitationInput;
}>;


export type AcceptInvitationMutation = { __typename?: 'Mutation', acceptInvitation: boolean };

export type RejectInvitationMutationVariables = Exact<{
  input: RejectInvitationInput;
}>;


export type RejectInvitationMutation = { __typename?: 'Mutation', rejectInvitation: boolean };

export type MeIsInvitedToRoom2SubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MeIsInvitedToRoom2Subscription = { __typename?: 'Subscription', meIsInvitedToRoom: { __typename?: 'MeIsInvitedToRoomResult', invitation: { __typename?: 'Invitation', userId: number, roomId: number, createdAt: string, room: { __typename?: 'Room', id: number, name: string, thumbnailUrl: string }, inviter: { __typename?: 'User', id: number, firstName: string, lastName: string } } } };

export type EditProfileGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type EditProfileGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, firstName: string, lastName: string, profilePictureUrl?: string | null, passwordLength: number } };

export type EditProfileEditFirstNameMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
}>;


export type EditProfileEditFirstNameMutation = { __typename?: 'Mutation', userUpdateFirstName: { __typename?: 'User', id: number, firstName: string } };

export type EditProfileEditLastNameMutationVariables = Exact<{
  lastName: Scalars['String']['input'];
}>;


export type EditProfileEditLastNameMutation = { __typename?: 'Mutation', userUpdateLastName: { __typename?: 'User', id: number, lastName: string } };

export type EditProfileRemoveMyAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type EditProfileRemoveMyAvatarMutation = { __typename?: 'Mutation', removeMyAvatar: { __typename?: 'User', id: number, profilePictureUrl?: string | null } };

export type EditProfileUploadProfilePictureMutationVariables = Exact<{
  input: UploadProfilePictureInput;
}>;


export type EditProfileUploadProfilePictureMutation = { __typename?: 'Mutation', uploadProfilePicture: { __typename?: 'User', id: number, profilePictureUrl?: string | null } };

export type AuthResetPasswordMutationVariables = Exact<{
  input: EditMyPasswordInput;
}>;


export type AuthResetPasswordMutation = { __typename?: 'Mutation', editMyPassword: { __typename?: 'User', id: number, passwordLength: number } };

export type ProfileCardGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileCardGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, firstName: string, lastName: string, profilePictureUrl?: string | null } };

export type GetMyRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyRoomsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, rooms: Array<{ __typename?: 'Room', id: number, name: string, thumbnailUrl: string, participantsCount: number, unreadMessagesCount: number, lastMessage?: { __typename?: 'Message', id: number, text?: string | null, sender: { __typename?: 'User', id: number, firstName: string, lastName: string } } | null }> } };

export type RoomParticipantLeftSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomParticipantLeftSubscription = { __typename?: 'Subscription', roomParticipantLeft: { __typename?: 'User', id: number, email: string } };

export type RoomParticipantJoinedSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomParticipantJoinedSubscription = { __typename?: 'Subscription', roomParticipantJoined: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null } };

export type MyRooms_MeIsExcludedFromRoomSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MyRooms_MeIsExcludedFromRoomSubSubscription = { __typename?: 'Subscription', meIsExcludedFromRoom: { __typename?: 'Room', id: number, name: string } };

export type MyRoomsNewMessageSubSubscriptionVariables = Exact<{
  skipFromCurrentSession: Scalars['Boolean']['input'];
}>;


export type MyRoomsNewMessageSubSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'NewMessageEvent', message: { __typename?: 'Message', id: number, text?: string | null, roomId: number, sender: { __typename?: 'User', id: number, email: string } }, room: { __typename?: 'Room', id: number, unreadMessagesCount: number, lastMessage?: { __typename?: 'Message', id: number, text?: string | null, sender: { __typename?: 'User', id: number, email: string } } | null } } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, text?: string | null, senderId: number, roomId: number, isViewedByMe: boolean, sentAt?: string | null, viewsCount: number, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean }, images: Array<{ __typename?: 'MessageImage', id: number, url: string }> } };

export type ScheduleMessageMutationVariables = Exact<{
  input: ScheduleMessage;
}>;


export type ScheduleMessageMutation = { __typename?: 'Mutation', scheduleMessage: { __typename?: 'Message', id: number, text?: string | null, senderId: number, roomId: number, scheduledAt?: string | null, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean } } };

export type DeleteMessagesMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  messageIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteMessagesMutation = { __typename?: 'Mutation', deleteMessages: boolean };

export type GetRoomParticipantsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetRoomParticipantsQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, participants: Array<{ __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean }> } };

export type MarkMessageAsViewedByMeMutationVariables = Exact<{
  messageId: Scalars['Int']['input'];
}>;


export type MarkMessageAsViewedByMeMutation = { __typename?: 'Mutation', markMessageAsViewedByMe: { __typename?: 'Message', id: number, viewsCount: number, isViewedByMe: boolean } };

export type RoomChatMeQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomChatMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, profilePictureUrl?: string | null } };

export type GetRoomQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
  scheduledMessagesOffset: Scalars['Int']['input'];
}>;


export type GetRoomQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, name: string, thumbnailUrl: string, pendingInvitationsCount: number, participantsOnlineCount: number, myScheduledMessagesCount: number, scheduledMessages: { __typename?: 'RoomMessagesList', hasMore: boolean, data: Array<{ __typename?: 'Message', id: number, text?: string | null, senderId: number, roomId: number, scheduledAt?: string | null, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean } }> }, participantsTyping: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> } };

export type RoomChatGetMessagesQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type RoomChatGetMessagesQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, messages: { __typename?: 'RoomMessagesList', hasMore: boolean, data: Array<{ __typename?: 'Message', id: number, text?: string | null, senderId: number, roomId: number, isViewedByMe: boolean, sentAt?: string | null, viewsCount: number, sender: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, profilePictureUrl?: string | null, isOnline: boolean }, images: Array<{ __typename?: 'MessageImage', id: number, url: string }> }> } } };

export type RoomChatGetScheduledMessagesQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type RoomChatGetScheduledMessagesQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, scheduledMessages: { __typename?: 'RoomMessagesList', hasMore: boolean, data: Array<{ __typename?: 'Message', id: number, text?: string | null, senderId: number, roomId: number, scheduledAt?: string | null, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean } }> } } };

export type GetMessageViewersQueryVariables = Exact<{
  messageId: Scalars['Int']['input'];
}>;


export type GetMessageViewersQuery = { __typename?: 'Query', message: { __typename?: 'Message', id: number, viewers: Array<{ __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null }> } };

export type NotifyMeIsTypingMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  isTyping: Scalars['Boolean']['input'];
}>;


export type NotifyMeIsTypingMutation = { __typename?: 'Mutation', notifyMeTypingStatusChange: boolean };

export type ExcludeUserFromRoomMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type ExcludeUserFromRoomMutation = { __typename?: 'Mutation', excludeUserFromRoom: { __typename?: 'Room', id: number, name: string } };

export type RoomChatSendScheduledMessagesNowMutationVariables = Exact<{
  messageIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RoomChatSendScheduledMessagesNowMutation = { __typename?: 'Mutation', sendScheduledMessagesNow: boolean };

export type UserTypingStatusChangeSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type UserTypingStatusChangeSubscription = { __typename?: 'Subscription', userTypingStatusChange: { __typename?: 'UserTypingStatusChangeEvent', isTyping: boolean, user: { __typename?: 'User', id: number, firstName: string, lastName: string } } };

export type MeIsExcludedFromRoomSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MeIsExcludedFromRoomSubSubscription = { __typename?: 'Subscription', meIsExcludedFromRoom: { __typename?: 'Room', id: number, name: string } };

export type NewMessageSubSubscriptionVariables = Exact<{
  skipFromCurrentSession: Scalars['Boolean']['input'];
}>;


export type NewMessageSubSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'NewMessageEvent', message: { __typename?: 'Message', id: number, text?: string | null, senderId: number, roomId: number, scheduledAt?: string | null, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean } } } };

export type MessageViewedSubSubscriptionVariables = Exact<{
  messageId: Scalars['Int']['input'];
}>;


export type MessageViewedSubSubscription = { __typename?: 'Subscription', messageViewed: { __typename?: 'MessageViewedEvent', viewer: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null }, message: { __typename?: 'Message', id: number, viewsCount: number } } };

export type RoomPendingInvitationsCountChangeSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomPendingInvitationsCountChangeSubscription = { __typename?: 'Subscription', roomPendingInvitationsCountChange: { __typename?: 'Room', id: number, pendingInvitationsCount: number } };

export type UsersOnlineStatusChangeSubscriptionVariables = Exact<{
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type UsersOnlineStatusChangeSubscription = { __typename?: 'Subscription', usersOnlineStatusChange: { __typename?: 'User', id: number, isOnline: boolean } };

export type MessagesDeletedSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type MessagesDeletedSubscription = { __typename?: 'Subscription', messagesDeleted: { __typename?: 'MessagesDeletedEvent', messageIds: Array<number> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, isBlocked: boolean }> };


export const MeBlockedStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MeBlockedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsBlockedStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}}]}}]}}]} as unknown as DocumentNode<MeBlockedStatusSubscription, MeBlockedStatusSubscriptionVariables>;
export const AppGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AppGetMeQuery, AppGetMeQueryVariables>;
export const StartSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionToken"}}]}}]}}]} as unknown as DocumentNode<StartSessionMutation, StartSessionMutationVariables>;
export const GetMeIdOnlyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeIdOnly"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetMeIdOnlyQuery, GetMeIdOnlyQueryVariables>;
export const GetMeTempDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMeTemp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetMeTempQuery, GetMeTempQueryVariables>;
export const BlockUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BlockUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BlockUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}}]}}]}}]} as unknown as DocumentNode<BlockUserMutation, BlockUserMutationVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchUsersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const SubscribeToUserOnlineStatusChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubscribeToUserOnlineStatusChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserOnlineStatusChangeSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userOnlineStatusChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<SubscribeToUserOnlineStatusChangeSubscription, SubscribeToUserOnlineStatusChangeSubscriptionVariables>;
export const EmailFormGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailFormGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<EmailFormGetMeQuery, EmailFormGetMeQueryVariables>;
export const EditMyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditMyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditMyEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editMyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<EditMyEmailMutation, EditMyEmailMutationVariables>;
export const EditMyProfilePictureGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditMyProfilePictureGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<EditMyProfilePictureGetMeQuery, EditMyProfilePictureGetMeQueryVariables>;
export const RemoveMyAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMyAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMyAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<RemoveMyAvatarMutation, RemoveMyAvatarMutationVariables>;
export const UploadProfilePictureInputDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadProfilePictureInput"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadProfilePictureInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadProfilePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<UploadProfilePictureInputMutation, UploadProfilePictureInputMutationVariables>;
export const LeaveRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeaveRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<LeaveRoomMutation, LeaveRoomMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RoomGetPendingInvitationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomGetPendingInvitations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pendingInvitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]}}]} as unknown as DocumentNode<RoomGetPendingInvitationsQuery, RoomGetPendingInvitationsQueryVariables>;
export const InviteUsersToRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteUsersToRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitedUsersIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteUsersToRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"invitedUsersIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitedUsersIds"}}}]}]}}]} as unknown as DocumentNode<InviteUsersToRoomMutation, InviteUsersToRoomMutationVariables>;
export const MeIsInvitedToRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MeIsInvitedToRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsInvitedToRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeIsInvitedToRoomSubscription, MeIsInvitedToRoomSubscriptionVariables>;
export const PrevMeInvitationsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PrevMeInvitationsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitationsCount"}}]}}]}}]} as unknown as DocumentNode<PrevMeInvitationsCountQuery, PrevMeInvitationsCountQueryVariables>;
export const UpdateMeInvitationsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpdateMeInvitationsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitationsCount"}}]}}]}}]} as unknown as DocumentNode<UpdateMeInvitationsCountQuery, UpdateMeInvitationsCountQueryVariables>;
export const NewMessageSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewMessageSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skipFromCurrentSession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}}]}}]}}]}}]} as unknown as DocumentNode<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>;
export const RepliedToMyInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RepliedToMyInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repliedToMyInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"invitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"invitedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RepliedToMyInvitationSubscription, RepliedToMyInvitationSubscriptionVariables>;
export const UnblockUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnblockUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnblockUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unblockUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}}]}}]}}]} as unknown as DocumentNode<UnblockUserMutation, UnblockUserMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"invitationsCount"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const CheckEmailAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckEmailAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkEmailAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<CheckEmailAvailabilityQuery, CheckEmailAvailabilityQueryVariables>;
export const InvitationsButtonGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InvitationsButtonGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitationsCount"}}]}}]}}]} as unknown as DocumentNode<InvitationsButtonGetMeQuery, InvitationsButtonGetMeQueryVariables>;
export const InvitationsButtonMeInvitedToRoomSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"InvitationsButtonMeInvitedToRoomSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsInvitedToRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]}}]} as unknown as DocumentNode<InvitationsButtonMeInvitedToRoomSubSubscription, InvitationsButtonMeInvitedToRoomSubSubscriptionVariables>;
export const InvitationsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InvitationsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<InvitationsListQuery, InvitationsListQueryVariables>;
export const AcceptInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptInvitationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AcceptInvitationMutation, AcceptInvitationMutationVariables>;
export const RejectInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RejectInvitationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RejectInvitationMutation, RejectInvitationMutationVariables>;
export const MeIsInvitedToRoom2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MeIsInvitedToRoom2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsInvitedToRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<MeIsInvitedToRoom2Subscription, MeIsInvitedToRoom2SubscriptionVariables>;
export const EditProfileGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditProfileGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"passwordLength"}}]}}]}}]} as unknown as DocumentNode<EditProfileGetMeQuery, EditProfileGetMeQueryVariables>;
export const EditProfileEditFirstNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditProfileEditFirstName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userUpdateFirstName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newFirstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<EditProfileEditFirstNameMutation, EditProfileEditFirstNameMutationVariables>;
export const EditProfileEditLastNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditProfileEditLastName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userUpdateLastName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newLastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<EditProfileEditLastNameMutation, EditProfileEditLastNameMutationVariables>;
export const EditProfileRemoveMyAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditProfileRemoveMyAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMyAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<EditProfileRemoveMyAvatarMutation, EditProfileRemoveMyAvatarMutationVariables>;
export const EditProfileUploadProfilePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditProfileUploadProfilePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadProfilePictureInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadProfilePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<EditProfileUploadProfilePictureMutation, EditProfileUploadProfilePictureMutationVariables>;
export const AuthResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditMyPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editMyPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"passwordLength"}}]}}]}}]} as unknown as DocumentNode<AuthResetPasswordMutation, AuthResetPasswordMutationVariables>;
export const ProfileCardGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileCardGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<ProfileCardGetMeQuery, ProfileCardGetMeQueryVariables>;
export const GetMyRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyRoomsQuery, GetMyRoomsQueryVariables>;
export const RoomParticipantLeftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomParticipantLeft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomParticipantLeft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<RoomParticipantLeftSubscription, RoomParticipantLeftSubscriptionVariables>;
export const RoomParticipantJoinedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomParticipantJoined"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomParticipantJoined"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<RoomParticipantJoinedSubscription, RoomParticipantJoinedSubscriptionVariables>;
export const MyRooms_MeIsExcludedFromRoomSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MyRooms_MeIsExcludedFromRoomSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsExcludedFromRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MyRooms_MeIsExcludedFromRoomSubSubscription, MyRooms_MeIsExcludedFromRoomSubSubscriptionVariables>;
export const MyRoomsNewMessageSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MyRoomsNewMessageSub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skipFromCurrentSession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyRoomsNewMessageSubSubscription, MyRoomsNewMessageSubSubscriptionVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"isViewedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const ScheduleMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ScheduleMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleMessage"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleMessageMutation, ScheduleMessageMutationVariables>;
export const DeleteMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}}}]}]}}]} as unknown as DocumentNode<DeleteMessagesMutation, DeleteMessagesMutationVariables>;
export const GetRoomParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoomParticipants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoomParticipantsQuery, GetRoomParticipantsQueryVariables>;
export const MarkMessageAsViewedByMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkMessageAsViewedByMe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markMessageAsViewedByMe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isViewedByMe"}}]}}]}}]} as unknown as DocumentNode<MarkMessageAsViewedByMeMutation, MarkMessageAsViewedByMeMutationVariables>;
export const RoomChatMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<RoomChatMeQuery, RoomChatMeQueryVariables>;
export const GetRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scheduledMessagesOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"pendingInvitationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"participantsOnlineCount"}},{"kind":"Field","name":{"kind":"Name","value":"myScheduledMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scheduledMessagesOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}},{"kind":"Field","name":{"kind":"Name","value":"participantsTyping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoomQuery, GetRoomQueryVariables>;
export const RoomChatGetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatGetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"isViewedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<RoomChatGetMessagesQuery, RoomChatGetMessagesQueryVariables>;
export const RoomChatGetScheduledMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatGetScheduledMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<RoomChatGetScheduledMessagesQuery, RoomChatGetScheduledMessagesQueryVariables>;
export const GetMessageViewersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessageViewers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessageViewersQuery, GetMessageViewersQueryVariables>;
export const NotifyMeIsTypingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotifyMeIsTyping"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isTyping"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifyMeTypingStatusChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isTyping"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isTyping"}}}]}]}}]} as unknown as DocumentNode<NotifyMeIsTypingMutation, NotifyMeIsTypingMutationVariables>;
export const ExcludeUserFromRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExcludeUserFromRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excludeUserFromRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ExcludeUserFromRoomMutation, ExcludeUserFromRoomMutationVariables>;
export const RoomChatSendScheduledMessagesNowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatSendScheduledMessagesNow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendScheduledMessagesNow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}}}]}]}}]} as unknown as DocumentNode<RoomChatSendScheduledMessagesNowMutation, RoomChatSendScheduledMessagesNowMutationVariables>;
export const UserTypingStatusChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UserTypingStatusChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userTypingStatusChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isTyping"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<UserTypingStatusChangeSubscription, UserTypingStatusChangeSubscriptionVariables>;
export const MeIsExcludedFromRoomSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MeIsExcludedFromRoomSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsExcludedFromRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MeIsExcludedFromRoomSubSubscription, MeIsExcludedFromRoomSubSubscriptionVariables>;
export const NewMessageSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewMessageSub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skipFromCurrentSession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]}}]}}]} as unknown as DocumentNode<NewMessageSubSubscription, NewMessageSubSubscriptionVariables>;
export const MessageViewedSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageViewedSub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageViewed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}}]}}]}}]}}]} as unknown as DocumentNode<MessageViewedSubSubscription, MessageViewedSubSubscriptionVariables>;
export const RoomPendingInvitationsCountChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomPendingInvitationsCountChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomPendingInvitationsCountChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pendingInvitationsCount"}}]}}]}}]} as unknown as DocumentNode<RoomPendingInvitationsCountChangeSubscription, RoomPendingInvitationsCountChangeSubscriptionVariables>;
export const UsersOnlineStatusChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UsersOnlineStatusChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersOnlineStatusChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<UsersOnlineStatusChangeSubscription, UsersOnlineStatusChangeSubscriptionVariables>;
export const MessagesDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessagesDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messagesDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageIds"}}]}}]}}]} as unknown as DocumentNode<MessagesDeletedSubscription, MessagesDeletedSubscriptionVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;