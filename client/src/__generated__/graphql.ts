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
};

export type AcceptInvitationInput = {
  roomId: Scalars['Int']['input'];
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  usersInvitedIds: Array<Scalars['Int']['input']>;
};

export type EditFirstNameInput = {
  newFirstName: Scalars['String']['input'];
};

export type EditLastNameInput = {
  newLastName: Scalars['String']['input'];
};

export type EditMyEmailInput = {
  newEmail: Scalars['String']['input'];
};

export type EditProfilePictureInput = {
  profilePictureUrl?: InputMaybe<Scalars['String']['input']>;
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
  text: Scalars['String']['output'];
  viewsCount: Scalars['Int']['output'];
};

export type MessageImage = {
  __typename?: 'MessageImage';
  id: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type MessagesDeletedEvent = {
  __typename?: 'MessagesDeletedEvent';
  messageIds: Array<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation: Invitation;
  createRoom: Room;
  deleteMessages: Scalars['Boolean']['output'];
  deleteScheduledMessages: Scalars['Boolean']['output'];
  editEmail: User;
  editFirstName: User;
  editLastName: User;
  editProfilePicture: User;
  excludeUserFromRoom: Room;
  inviteUsersToRoom: Scalars['Boolean']['output'];
  leaveRoom: Scalars['Boolean']['output'];
  login: LoginResult;
  markMessageAsViewed: Message;
  notifyMeTypingStatusChange: Scalars['Boolean']['output'];
  notifyTypingStart: Scalars['Boolean']['output'];
  notifyTypingStop: Scalars['Boolean']['output'];
  register: RegisterResult;
  rejectInvitation: Invitation;
  resetPassword: User;
  scheduleMessage: Message;
  sendMessage: Message;
  sendScheduledMessagesNow: Scalars['Boolean']['output'];
  startSession: StartSessionResult;
};


export type MutationAcceptInvitationArgs = {
  input: AcceptInvitationInput;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationDeleteMessagesArgs = {
  messageIds: Array<Scalars['Int']['input']>;
  roomId: Scalars['Int']['input'];
};


export type MutationDeleteScheduledMessagesArgs = {
  messageIds: Array<Scalars['Int']['input']>;
};


export type MutationEditEmailArgs = {
  input: EditMyEmailInput;
};


export type MutationEditFirstNameArgs = {
  input: EditFirstNameInput;
};


export type MutationEditLastNameArgs = {
  input: EditLastNameInput;
};


export type MutationEditProfilePictureArgs = {
  input: EditProfilePictureInput;
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


export type MutationMarkMessageAsViewedArgs = {
  messageId: Scalars['Int']['input'];
};


export type MutationNotifyMeTypingStatusChangeArgs = {
  isTyping?: InputMaybe<Scalars['Boolean']['input']>;
  roomId: Scalars['Int']['input'];
};


export type MutationNotifyTypingStartArgs = {
  roomId: Scalars['Int']['input'];
};


export type MutationNotifyTypingStopArgs = {
  roomId: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRejectInvitationArgs = {
  input: RejectInvitationInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
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

export type NewInvitationSub = {
  __typename?: 'NewInvitationSub';
  invitation: Invitation;
};

export type Query = {
  __typename?: 'Query';
  checkEmailAvailability: Scalars['Boolean']['output'];
  invitations: Array<Invitation>;
  invitationsCount: Scalars['Int']['output'];
  me: User;
  message?: Maybe<Message>;
  room: Room;
  rooms: Array<Room>;
  searchUsers: SearchUsersResult;
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
  filter: SearchUsersFilterInput;
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

export type ReplyToInvitation = {
  __typename?: 'ReplyToInvitation';
  accepted: Scalars['Boolean']['output'];
  invitation: Invitation;
};

export type ResetPasswordInput = {
  newPassword: Scalars['String']['input'];
  newPasswordRepeat: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String']['output'];
  creatorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  invitedUsers: Array<User>;
  lastMessage?: Maybe<Message>;
  messages: RoomMessagesList;
  name: Scalars['String']['output'];
  newMessagesCount: Scalars['Int']['output'];
  participants: Array<User>;
  participantsCount: Scalars['Int']['output'];
  participantsOnlineCount: Scalars['Int']['output'];
  participantsTyping: Array<User>;
  pendingInvitations: Array<Invitation>;
  pendingInvitationsCount: Scalars['Int']['output'];
  scheduledMessages: RoomMessagesList;
  scheduledMessagesCount: Scalars['Int']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
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

export type ScheduleMessage = {
  imageUrls: Array<Scalars['String']['input']>;
  roomId: Scalars['Int']['input'];
  scheduleAt: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUsersFilterInput = {
  excludeIds: Array<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  q: Scalars['String']['input'];
};

export type SearchUsersResult = {
  __typename?: 'SearchUsersResult';
  data: Array<User>;
  hasMore: Scalars['Boolean']['output'];
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
  invitationAccepted: Invitation;
  invitationCountUpdated: Scalars['Int']['output'];
  invitationRejected: Invitation;
  meIsExcludedFromRoom: Room;
  messageViewsCountChange: Scalars['Int']['output'];
  messagesDeleted: MessagesDeletedEvent;
  newInvitation: Invitation;
  newMessage: Message;
  newRoom: Room;
  newScheduledMessage: Array<Message>;
  roomCreated: Room;
  roomLastMessageChange?: Maybe<Message>;
  roomNewMessagesCountChange: Scalars['Int']['output'];
  roomParticipantJoined: User;
  roomParticipantLeft: User;
  roomParticipantTypingStart: User;
  roomParticipantTypingStop: User;
  roomParticipantsOnlineCountChange: Scalars['Int']['output'];
  roomPendingInvitationsCountChange: Scalars['Int']['output'];
  roomScheduledMessagesCountChange: Scalars['Int']['output'];
  scheduledMessagesDeleted: Array<Scalars['Int']['output']>;
  userProfileUpdated: User;
  userTypingStatusChange: UserTypingStatusChangeEvent;
  usersOnlineStatusChange: User;
};


export type SubscriptionMessageViewsCountChangeArgs = {
  messageId: Scalars['Int']['input'];
};


export type SubscriptionMessagesDeletedArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionNewMessageArgs = {
  skipFromCurrentSession: Scalars['Boolean']['input'];
};


export type SubscriptionNewScheduledMessageArgs = {
  skipFromCurrentSession: Scalars['Boolean']['input'];
};


export type SubscriptionRoomCreatedArgs = {
  skipFromCurrentSession: Scalars['Boolean']['input'];
};


export type SubscriptionRoomLastMessageChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomNewMessagesCountChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomParticipantJoinedArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomParticipantLeftArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomParticipantTypingStartArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomParticipantTypingStopArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomParticipantsOnlineCountChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomPendingInvitationsCountChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionRoomScheduledMessagesCountChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionScheduledMessagesDeletedArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionUserProfileUpdatedArgs = {
  userId: Scalars['Int']['input'];
};


export type SubscriptionUserTypingStatusChangeArgs = {
  roomId: Scalars['Int']['input'];
};


export type SubscriptionUsersOnlineStatusChangeArgs = {
  userIds: Array<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isOnline: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  passwordLength: Scalars['Int']['output'];
  profilePictureUrl?: Maybe<Scalars['String']['output']>;
};

export type UserTypingStatusChangeEvent = {
  __typename?: 'UserTypingStatusChangeEvent';
  isTyping: Scalars['Boolean']['output'];
  user: User;
};

export type AppGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AppGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number } };

export type StartSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type StartSessionMutation = { __typename?: 'Mutation', startSession: { __typename?: 'StartSessionResult', sessionToken: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', token: string, user: { __typename?: 'User', id: number } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResult', token: string, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string } } };

export type CheckEmailAvailabilityQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckEmailAvailabilityQuery = { __typename?: 'Query', checkEmailAvailability: boolean };

export type InvitationsButtonGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitationsButtonGetMeQuery = { __typename?: 'Query', invitationsCount: number };

export type InvitationsCountUpdatedSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type InvitationsCountUpdatedSubSubscription = { __typename?: 'Subscription', invitationCountUpdated: number };

export type InvitationsListQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitationsListQuery = { __typename?: 'Query', invitations: Array<{ __typename?: 'Invitation', userId: number, roomId: number, createdAt: string, room: { __typename?: 'Room', id: number, name: string, thumbnailUrl?: string | null }, inviter: { __typename?: 'User', id: number, firstName: string, lastName: string } }> };

export type InvitationsListAcceptInvitationMutationVariables = Exact<{
  input: AcceptInvitationInput;
}>;


export type InvitationsListAcceptInvitationMutation = { __typename?: 'Mutation', acceptInvitation: { __typename?: 'Invitation', userId: number, roomId: number } };

export type InvitationsListRejectInvitationMutationVariables = Exact<{
  input: RejectInvitationInput;
}>;


export type InvitationsListRejectInvitationMutation = { __typename?: 'Mutation', rejectInvitation: { __typename?: 'Invitation', userId: number, roomId: number } };

export type InvitationsNewInvitationSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type InvitationsNewInvitationSubSubscription = { __typename?: 'Subscription', newInvitation: { __typename?: 'Invitation', userId: number, roomId: number, createdAt: string, room: { __typename?: 'Room', id: number, name: string, thumbnailUrl?: string | null }, inviter: { __typename?: 'User', id: number, firstName: string, lastName: string } } };

export type RoomInviteMembersGetParticipantsQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomInviteMembersGetParticipantsQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, participants: Array<{ __typename?: 'User', id: number }> } };

export type RoomInviteMembersGetInvitedUsersQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomInviteMembersGetInvitedUsersQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, invitedUsers: Array<{ __typename?: 'User', id: number }> } };

export type InviteUsersToRoomMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  invitedUsersIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type InviteUsersToRoomMutation = { __typename?: 'Mutation', inviteUsersToRoom: boolean };

export type ProfileEditGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileEditGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, firstName: string, lastName: string, profilePictureUrl?: string | null, passwordLength: number } };

export type ProfileEditFirstNameMutationVariables = Exact<{
  input: EditFirstNameInput;
}>;


export type ProfileEditFirstNameMutation = { __typename?: 'Mutation', editFirstName: { __typename?: 'User', id: number, firstName: string } };

export type ProfileEditLastNameMutationVariables = Exact<{
  input: EditLastNameInput;
}>;


export type ProfileEditLastNameMutation = { __typename?: 'Mutation', editLastName: { __typename?: 'User', id: number, lastName: string } };

export type ProfileEditProfilePictureMutationVariables = Exact<{
  input: EditProfilePictureInput;
}>;


export type ProfileEditProfilePictureMutation = { __typename?: 'Mutation', editProfilePicture: { __typename?: 'User', id: number, profilePictureUrl?: string | null } };

export type ProfileEditResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ProfileEditResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'User', id: number, passwordLength: number } };

export type ProfileCardGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileCardGetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, firstName: string, lastName: string, profilePictureUrl?: string | null } };

export type UserProfileUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserProfileUpdatedSubscription = { __typename?: 'Subscription', userProfileUpdated: { __typename?: 'User', id: number, firstName: string, lastName: string, profilePictureUrl?: string | null } };

export type RoomChatSendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type RoomChatSendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, text: string, senderId: number, roomId: number, isViewedByMe: boolean, sentAt?: string | null, viewsCount: number, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean }, images: Array<{ __typename?: 'MessageImage', id: number, url: string }> } };

export type RoomChatScheduleMessageMutationVariables = Exact<{
  input: ScheduleMessage;
}>;


export type RoomChatScheduleMessageMutation = { __typename?: 'Mutation', scheduleMessage: { __typename?: 'Message', id: number, text: string, senderId: number, roomId: number, scheduledAt?: string | null, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean }, images: Array<{ __typename?: 'MessageImage', id: number, url: string }> } };

export type RoomChatDeleteMessagesMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  messageIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RoomChatDeleteMessagesMutation = { __typename?: 'Mutation', deleteMessages: boolean };

export type RoomChatDeleteScheduledMessagesMutationVariables = Exact<{
  messageIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RoomChatDeleteScheduledMessagesMutation = { __typename?: 'Mutation', deleteScheduledMessages: boolean };

export type RoomChatNotifyTypingStartMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatNotifyTypingStartMutation = { __typename?: 'Mutation', notifyTypingStart: boolean };

export type RoomChatNotifyTypingStopMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatNotifyTypingStopMutation = { __typename?: 'Mutation', notifyTypingStop: boolean };

export type RoomChatGetRoomParticipantsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RoomChatGetRoomParticipantsQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, participants: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, profilePictureUrl?: string | null, isOnline: boolean }> } };

export type RoomChatMarkMessageAsViewedMutationVariables = Exact<{
  messageId: Scalars['Int']['input'];
}>;


export type RoomChatMarkMessageAsViewedMutation = { __typename?: 'Mutation', markMessageAsViewed: { __typename?: 'Message', id: number, viewsCount: number, isViewedByMe: boolean } };

export type RoomChatMeQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomChatMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, profilePictureUrl?: string | null } };

export type RoomChatGetRoomQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatGetRoomQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, name: string, creatorId: number, thumbnailUrl?: string | null, pendingInvitationsCount: number, participantsOnlineCount: number, scheduledMessagesCount: number, participantsTyping: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> } };

export type RoomChatGetMessagesQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type RoomChatGetMessagesQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, messages: { __typename?: 'RoomMessagesList', hasMore: boolean, data: Array<{ __typename?: 'Message', id: number, text: string, senderId: number, roomId: number, isViewedByMe: boolean, sentAt?: string | null, viewsCount: number, sender: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, profilePictureUrl?: string | null, isOnline: boolean }, images: Array<{ __typename?: 'MessageImage', id: number, url: string }> }> } } };

export type RoomChatGetScheduledMessagesQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type RoomChatGetScheduledMessagesQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, scheduledMessages: { __typename?: 'RoomMessagesList', hasMore: boolean, data: Array<{ __typename?: 'Message', id: number, text: string, senderId: number, roomId: number, scheduledAt?: string | null, sender: { __typename?: 'User', id: number, email: string, profilePictureUrl?: string | null, isOnline: boolean }, images: Array<{ __typename?: 'MessageImage', id: number, url: string }> }> } } };

export type RoomChatExcludeFromMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type RoomChatExcludeFromMutation = { __typename?: 'Mutation', excludeUserFromRoom: { __typename?: 'Room', id: number, name: string } };

export type RoomChatSendScheduledMessagesNowMutationVariables = Exact<{
  messageIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RoomChatSendScheduledMessagesNowMutation = { __typename?: 'Mutation', sendScheduledMessagesNow: boolean };

export type MeIsExcludedFromRoomSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MeIsExcludedFromRoomSubSubscription = { __typename?: 'Subscription', meIsExcludedFromRoom: { __typename?: 'Room', id: number, name: string } };

export type RoomChatNewMessageSubscriptionVariables = Exact<{
  skipFromCurrentSession: Scalars['Boolean']['input'];
}>;


export type RoomChatNewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, text: string, senderId: number, roomId: number, isViewedByMe: boolean, sentAt?: string | null, viewsCount: number, sender: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, profilePictureUrl?: string | null, isOnline: boolean }, images: Array<{ __typename?: 'MessageImage', id: number, url: string }> } };

export type RoomChatUsersOnlineStatusChangeSubscriptionVariables = Exact<{
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type RoomChatUsersOnlineStatusChangeSubscription = { __typename?: 'Subscription', usersOnlineStatusChange: { __typename?: 'User', id: number, isOnline: boolean } };

export type MessagesDeletedSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type MessagesDeletedSubscription = { __typename?: 'Subscription', messagesDeleted: { __typename?: 'MessagesDeletedEvent', messageIds: Array<number> } };

export type RoomChatScheduledMessagesDeletedSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatScheduledMessagesDeletedSubscription = { __typename?: 'Subscription', scheduledMessagesDeleted: Array<number> };

export type RoomParticipantsOnlineCountChangeSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomParticipantsOnlineCountChangeSubscription = { __typename?: 'Subscription', roomParticipantsOnlineCountChange: number };

export type RoomChatPendingInvitationsCountChange2SubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatPendingInvitationsCountChange2Subscription = { __typename?: 'Subscription', roomPendingInvitationsCountChange: number };

export type RoomChatParticipantTypingStartSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatParticipantTypingStartSubscription = { __typename?: 'Subscription', roomParticipantTypingStart: { __typename?: 'User', id: number, firstName: string, lastName: string } };

export type RoomChatParticipantTypingStopSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatParticipantTypingStopSubscription = { __typename?: 'Subscription', roomParticipantTypingStop: { __typename?: 'User', id: number } };

export type RoomChatMessageViewsCountChangeSubscriptionVariables = Exact<{
  messageId: Scalars['Int']['input'];
}>;


export type RoomChatMessageViewsCountChangeSubscription = { __typename?: 'Subscription', messageViewsCountChange: number };

export type RoomChatScheduledMessagesCountChangeSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatScheduledMessagesCountChangeSubscription = { __typename?: 'Subscription', roomScheduledMessagesCountChange: number };

export type RoomChatLeaveRoomMutationVariables = Exact<{
  input: LeaveRoomInput;
}>;


export type RoomChatLeaveRoomMutation = { __typename?: 'Mutation', leaveRoom: boolean };

export type RoomChatExcludeUserFromRoomMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type RoomChatExcludeUserFromRoomMutation = { __typename?: 'Mutation', excludeUserFromRoom: { __typename?: 'Room', id: number, name: string } };

export type RoomChatParticipantJoinedSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatParticipantJoinedSubscription = { __typename?: 'Subscription', roomParticipantJoined: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, profilePictureUrl?: string | null, isOnline: boolean } };

export type RoomChatParticipantLeftSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomChatParticipantLeftSubscription = { __typename?: 'Subscription', roomParticipantLeft: { __typename?: 'User', id: number } };

export type CreateRoomSearchUsersQueryVariables = Exact<{
  filter: SearchUsersFilterInput;
}>;


export type CreateRoomSearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'SearchUsersResult', hasMore: boolean, data: Array<{ __typename?: 'User', id: number, email: string, firstName: string, lastName: string, profilePictureUrl?: string | null, isOnline: boolean }> } };

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', id: number, name: string, thumbnailUrl?: string | null, participantsCount: number, newMessagesCount: number, lastMessage?: { __typename?: 'Message', id: number, text: string, sender: { __typename?: 'User', id: number, firstName: string, lastName: string } } | null } };

export type CreateRoomUsersOnlineStatusChangeSubscriptionVariables = Exact<{
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CreateRoomUsersOnlineStatusChangeSubscription = { __typename?: 'Subscription', usersOnlineStatusChange: { __typename?: 'User', id: number, isOnline: boolean } };

export type RoomsListQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsListQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'Room', id: number, name: string, thumbnailUrl?: string | null, participantsCount: number, newMessagesCount: number, lastMessage?: { __typename?: 'Message', id: number, text: string, sender: { __typename?: 'User', id: number, firstName: string, lastName: string } } | null }> };

export type MyRooms_MeIsExcludedFromRoomSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MyRooms_MeIsExcludedFromRoomSubSubscription = { __typename?: 'Subscription', meIsExcludedFromRoom: { __typename?: 'Room', id: number, name: string } };

export type RoomsListLastMessageChangeSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomsListLastMessageChangeSubscription = { __typename?: 'Subscription', roomLastMessageChange?: { __typename?: 'Message', id: number, text: string, sender: { __typename?: 'User', id: number, firstName: string, lastName: string } } | null };

export type RoomsListNewRoomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoomsListNewRoomSubscription = { __typename?: 'Subscription', newRoom: { __typename?: 'Room', id: number, name: string, thumbnailUrl?: string | null, participantsCount: number, newMessagesCount: number, lastMessage?: { __typename?: 'Message', id: number, text: string, sender: { __typename?: 'User', id: number, firstName: string, lastName: string } } | null } };

export type RoomsListNewMessagesCountChangeSubscriptionVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type RoomsListNewMessagesCountChangeSubscription = { __typename?: 'Subscription', roomNewMessagesCountChange: number };

export type HomeNewInvitationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type HomeNewInvitationSubscription = { __typename?: 'Subscription', newInvitation: { __typename?: 'Invitation', userId: number, roomId: number } };

export type HomeUserRejectedInvitationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type HomeUserRejectedInvitationSubscription = { __typename?: 'Subscription', invitationRejected: { __typename?: 'Invitation', userId: number, roomId: number, room: { __typename?: 'Room', id: number, name: string }, invitedUser: { __typename?: 'User', id: number, firstName: string, lastName: string } } };

export type HomeUserAcceptedInvitationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type HomeUserAcceptedInvitationSubscription = { __typename?: 'Subscription', invitationAccepted: { __typename?: 'Invitation', userId: number, roomId: number, room: { __typename?: 'Room', id: number, name: string }, invitedUser: { __typename?: 'User', id: number, firstName: string, lastName: string } } };

export type UsersSelectorSearchUsersQueryVariables = Exact<{
  filter: SearchUsersFilterInput;
}>;


export type UsersSelectorSearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'SearchUsersResult', hasMore: boolean, data: Array<{ __typename?: 'User', id: number, email: string, firstName: string, lastName: string, profilePictureUrl?: string | null, isOnline: boolean }> } };

export type UsersSelectorOnlineStatusChangeSubscriptionVariables = Exact<{
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type UsersSelectorOnlineStatusChangeSubscription = { __typename?: 'Subscription', usersOnlineStatusChange: { __typename?: 'User', id: number, isOnline: boolean } };


export const AppGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AppGetMeQuery, AppGetMeQueryVariables>;
export const StartSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionToken"}}]}}]}}]} as unknown as DocumentNode<StartSessionMutation, StartSessionMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const CheckEmailAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckEmailAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkEmailAvailability"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<CheckEmailAvailabilityQuery, CheckEmailAvailabilityQueryVariables>;
export const InvitationsButtonGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InvitationsButtonGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitationsCount"}}]}}]} as unknown as DocumentNode<InvitationsButtonGetMeQuery, InvitationsButtonGetMeQueryVariables>;
export const InvitationsCountUpdatedSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"InvitationsCountUpdatedSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitationCountUpdated"}}]}}]} as unknown as DocumentNode<InvitationsCountUpdatedSubSubscription, InvitationsCountUpdatedSubSubscriptionVariables>;
export const InvitationsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InvitationsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<InvitationsListQuery, InvitationsListQueryVariables>;
export const InvitationsListAcceptInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InvitationsListAcceptInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptInvitationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]} as unknown as DocumentNode<InvitationsListAcceptInvitationMutation, InvitationsListAcceptInvitationMutationVariables>;
export const InvitationsListRejectInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InvitationsListRejectInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RejectInvitationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]} as unknown as DocumentNode<InvitationsListRejectInvitationMutation, InvitationsListRejectInvitationMutationVariables>;
export const InvitationsNewInvitationSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"InvitationsNewInvitationSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<InvitationsNewInvitationSubSubscription, InvitationsNewInvitationSubSubscriptionVariables>;
export const RoomInviteMembersGetParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomInviteMembersGetParticipants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RoomInviteMembersGetParticipantsQuery, RoomInviteMembersGetParticipantsQueryVariables>;
export const RoomInviteMembersGetInvitedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomInviteMembersGetInvitedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RoomInviteMembersGetInvitedUsersQuery, RoomInviteMembersGetInvitedUsersQueryVariables>;
export const InviteUsersToRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteUsersToRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitedUsersIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteUsersToRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"invitedUsersIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitedUsersIds"}}}]}]}}]} as unknown as DocumentNode<InviteUsersToRoomMutation, InviteUsersToRoomMutationVariables>;
export const ProfileEditGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileEditGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"passwordLength"}}]}}]}}]} as unknown as DocumentNode<ProfileEditGetMeQuery, ProfileEditGetMeQueryVariables>;
export const ProfileEditFirstNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileEditFirstName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditFirstNameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editFirstName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<ProfileEditFirstNameMutation, ProfileEditFirstNameMutationVariables>;
export const ProfileEditLastNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileEditLastName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditLastNameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editLastName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<ProfileEditLastNameMutation, ProfileEditLastNameMutationVariables>;
export const ProfileEditProfilePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileEditProfilePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditProfilePictureInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editProfilePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<ProfileEditProfilePictureMutation, ProfileEditProfilePictureMutationVariables>;
export const ProfileEditResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileEditResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"passwordLength"}}]}}]}}]} as unknown as DocumentNode<ProfileEditResetPasswordMutation, ProfileEditResetPasswordMutationVariables>;
export const ProfileCardGetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileCardGetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<ProfileCardGetMeQuery, ProfileCardGetMeQueryVariables>;
export const UserProfileUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UserProfileUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfileUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<UserProfileUpdatedSubscription, UserProfileUpdatedSubscriptionVariables>;
export const RoomChatSendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatSendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"isViewedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}}]}}]}}]} as unknown as DocumentNode<RoomChatSendMessageMutation, RoomChatSendMessageMutationVariables>;
export const RoomChatScheduleMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatScheduleMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleMessage"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<RoomChatScheduleMessageMutation, RoomChatScheduleMessageMutationVariables>;
export const RoomChatDeleteMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatDeleteMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}}}]}]}}]} as unknown as DocumentNode<RoomChatDeleteMessagesMutation, RoomChatDeleteMessagesMutationVariables>;
export const RoomChatDeleteScheduledMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatDeleteScheduledMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteScheduledMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}}}]}]}}]} as unknown as DocumentNode<RoomChatDeleteScheduledMessagesMutation, RoomChatDeleteScheduledMessagesMutationVariables>;
export const RoomChatNotifyTypingStartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatNotifyTypingStart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifyTypingStart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}]}}]} as unknown as DocumentNode<RoomChatNotifyTypingStartMutation, RoomChatNotifyTypingStartMutationVariables>;
export const RoomChatNotifyTypingStopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatNotifyTypingStop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifyTypingStop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}]}}]} as unknown as DocumentNode<RoomChatNotifyTypingStopMutation, RoomChatNotifyTypingStopMutationVariables>;
export const RoomChatGetRoomParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatGetRoomParticipants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]}}]} as unknown as DocumentNode<RoomChatGetRoomParticipantsQuery, RoomChatGetRoomParticipantsQueryVariables>;
export const RoomChatMarkMessageAsViewedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatMarkMessageAsViewed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markMessageAsViewed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isViewedByMe"}}]}}]}}]} as unknown as DocumentNode<RoomChatMarkMessageAsViewedMutation, RoomChatMarkMessageAsViewedMutationVariables>;
export const RoomChatMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}}]}}]}}]} as unknown as DocumentNode<RoomChatMeQuery, RoomChatMeQueryVariables>;
export const RoomChatGetRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatGetRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"pendingInvitationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"participantsOnlineCount"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"participantsTyping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<RoomChatGetRoomQuery, RoomChatGetRoomQueryVariables>;
export const RoomChatGetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatGetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"isViewedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<RoomChatGetMessagesQuery, RoomChatGetMessagesQueryVariables>;
export const RoomChatGetScheduledMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomChatGetScheduledMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<RoomChatGetScheduledMessagesQuery, RoomChatGetScheduledMessagesQueryVariables>;
export const RoomChatExcludeFromDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatExcludeFrom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excludeUserFromRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RoomChatExcludeFromMutation, RoomChatExcludeFromMutationVariables>;
export const RoomChatSendScheduledMessagesNowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatSendScheduledMessagesNow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendScheduledMessagesNow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}}}]}]}}]} as unknown as DocumentNode<RoomChatSendScheduledMessagesNowMutation, RoomChatSendScheduledMessagesNowMutationVariables>;
export const MeIsExcludedFromRoomSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MeIsExcludedFromRoomSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsExcludedFromRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MeIsExcludedFromRoomSubSubscription, MeIsExcludedFromRoomSubSubscriptionVariables>;
export const RoomChatNewMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatNewMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skipFromCurrentSession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skipFromCurrentSession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"isViewedByMe"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}}]}}]}}]} as unknown as DocumentNode<RoomChatNewMessageSubscription, RoomChatNewMessageSubscriptionVariables>;
export const RoomChatUsersOnlineStatusChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatUsersOnlineStatusChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersOnlineStatusChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<RoomChatUsersOnlineStatusChangeSubscription, RoomChatUsersOnlineStatusChangeSubscriptionVariables>;
export const MessagesDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessagesDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messagesDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageIds"}}]}}]}}]} as unknown as DocumentNode<MessagesDeletedSubscription, MessagesDeletedSubscriptionVariables>;
export const RoomChatScheduledMessagesDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatScheduledMessagesDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledMessagesDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}]}}]} as unknown as DocumentNode<RoomChatScheduledMessagesDeletedSubscription, RoomChatScheduledMessagesDeletedSubscriptionVariables>;
export const RoomParticipantsOnlineCountChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomParticipantsOnlineCountChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomParticipantsOnlineCountChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}]}}]} as unknown as DocumentNode<RoomParticipantsOnlineCountChangeSubscription, RoomParticipantsOnlineCountChangeSubscriptionVariables>;
export const RoomChatPendingInvitationsCountChange2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatPendingInvitationsCountChange2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomPendingInvitationsCountChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}]}}]} as unknown as DocumentNode<RoomChatPendingInvitationsCountChange2Subscription, RoomChatPendingInvitationsCountChange2SubscriptionVariables>;
export const RoomChatParticipantTypingStartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatParticipantTypingStart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomParticipantTypingStart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<RoomChatParticipantTypingStartSubscription, RoomChatParticipantTypingStartSubscriptionVariables>;
export const RoomChatParticipantTypingStopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatParticipantTypingStop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomParticipantTypingStop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RoomChatParticipantTypingStopSubscription, RoomChatParticipantTypingStopSubscriptionVariables>;
export const RoomChatMessageViewsCountChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatMessageViewsCountChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageViewsCountChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}]}]}}]} as unknown as DocumentNode<RoomChatMessageViewsCountChangeSubscription, RoomChatMessageViewsCountChangeSubscriptionVariables>;
export const RoomChatScheduledMessagesCountChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatScheduledMessagesCountChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomScheduledMessagesCountChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}]}}]} as unknown as DocumentNode<RoomChatScheduledMessagesCountChangeSubscription, RoomChatScheduledMessagesCountChangeSubscriptionVariables>;
export const RoomChatLeaveRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatLeaveRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeaveRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RoomChatLeaveRoomMutation, RoomChatLeaveRoomMutationVariables>;
export const RoomChatExcludeUserFromRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RoomChatExcludeUserFromRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"excludeUserFromRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RoomChatExcludeUserFromRoomMutation, RoomChatExcludeUserFromRoomMutationVariables>;
export const RoomChatParticipantJoinedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatParticipantJoined"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomParticipantJoined"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<RoomChatParticipantJoinedSubscription, RoomChatParticipantJoinedSubscriptionVariables>;
export const RoomChatParticipantLeftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomChatParticipantLeft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomParticipantLeft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RoomChatParticipantLeftSubscription, RoomChatParticipantLeftSubscriptionVariables>;
export const CreateRoomSearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreateRoomSearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchUsersFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]} as unknown as DocumentNode<CreateRoomSearchUsersQuery, CreateRoomSearchUsersQueryVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}},{"kind":"Field","name":{"kind":"Name","value":"newMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const CreateRoomUsersOnlineStatusChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CreateRoomUsersOnlineStatusChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersOnlineStatusChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<CreateRoomUsersOnlineStatusChangeSubscription, CreateRoomUsersOnlineStatusChangeSubscriptionVariables>;
export const RoomsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}},{"kind":"Field","name":{"kind":"Name","value":"newMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomsListQuery, RoomsListQueryVariables>;
export const MyRooms_MeIsExcludedFromRoomSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MyRooms_MeIsExcludedFromRoomSub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meIsExcludedFromRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MyRooms_MeIsExcludedFromRoomSubSubscription, MyRooms_MeIsExcludedFromRoomSubSubscriptionVariables>;
export const RoomsListLastMessageChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomsListLastMessageChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomLastMessageChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<RoomsListLastMessageChangeSubscription, RoomsListLastMessageChangeSubscriptionVariables>;
export const RoomsListNewRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomsListNewRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"participantsCount"}},{"kind":"Field","name":{"kind":"Name","value":"newMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RoomsListNewRoomSubscription, RoomsListNewRoomSubscriptionVariables>;
export const RoomsListNewMessagesCountChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RoomsListNewMessagesCountChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNewMessagesCountChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}]}]}}]} as unknown as DocumentNode<RoomsListNewMessagesCountChangeSubscription, RoomsListNewMessagesCountChangeSubscriptionVariables>;
export const HomeNewInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"HomeNewInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}}]}}]} as unknown as DocumentNode<HomeNewInvitationSubscription, HomeNewInvitationSubscriptionVariables>;
export const HomeUserRejectedInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"HomeUserRejectedInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitationRejected"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<HomeUserRejectedInvitationSubscription, HomeUserRejectedInvitationSubscriptionVariables>;
export const HomeUserAcceptedInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"HomeUserAcceptedInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitationAccepted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<HomeUserAcceptedInvitationSubscription, HomeUserAcceptedInvitationSubscriptionVariables>;
export const UsersSelectorSearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsersSelectorSearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchUsersFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePictureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]} as unknown as DocumentNode<UsersSelectorSearchUsersQuery, UsersSelectorSearchUsersQueryVariables>;
export const UsersSelectorOnlineStatusChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UsersSelectorOnlineStatusChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersOnlineStatusChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}}]}}]}}]} as unknown as DocumentNode<UsersSelectorOnlineStatusChangeSubscription, UsersSelectorOnlineStatusChangeSubscriptionVariables>;