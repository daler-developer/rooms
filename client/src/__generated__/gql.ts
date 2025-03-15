/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query AppGetMe {\n    me {\n      id\n    }\n  }\n": types.AppGetMeDocument,
    "\n  mutation StartSession {\n    startSession {\n      sessionToken\n    }\n  }\n": types.StartSessionDocument,
    "\n  query GetMeIdOnly {\n    me {\n      id\n    }\n  }\n": types.GetMeIdOnlyDocument,
    "\n  query GetMeTemp {\n    me {\n      id\n      email\n    }\n  }\n": types.GetMeTempDocument,
    "\n  mutation BlockUser($input: BlockUserInput!) {\n    blockUser(input: $input) {\n      id\n      email\n      isBlocked\n    }\n  }\n": types.BlockUserDocument,
    "\n  subscription MeBlockedStatus {\n    meIsBlockedStatus {\n      isBlocked\n    }\n  }\n": types.MeBlockedStatusDocument,
    "\n  mutation LeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n": types.LeaveRoomDocument,
    "\n  subscription NewMessageSubscription($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        roomId\n        senderId\n      }\n    }\n  }\n": types.NewMessageSubscriptionDocument,
    "\n  mutation UnblockUser($input: UnblockUserInput!) {\n    unblockUser(input: $input) {\n      id\n      isBlocked\n    }\n  }\n": types.UnblockUserDocument,
    "\n  query GetMe {\n    me {\n      id\n      email\n      password\n      profilePictureUrl\n      invitationsCount\n    }\n  }\n": types.GetMeDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      token\n    }\n  }\n": types.RegisterDocument,
    "\n  query CheckEmailAvailability($email: String!) {\n    checkEmailAvailability(email: $email)\n  }\n": types.CheckEmailAvailabilityDocument,
    "\n  query InvitationsButtonGetMe {\n    me {\n      id\n      invitationsCount\n    }\n  }\n": types.InvitationsButtonGetMeDocument,
    "\n  subscription InvitationsCountUpdatedSub {\n    invitationCountUpdated {\n      id\n      invitationsCount\n    }\n  }\n": types.InvitationsCountUpdatedSubDocument,
    "\n  query InvitationsList {\n    invitations {\n      userId\n      roomId\n      room {\n        id\n        name\n        thumbnailUrl\n      }\n      inviter {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n": types.InvitationsListDocument,
    "\n  mutation InvitationsListAcceptInvitation($input: AcceptInvitationInput!) {\n    acceptInvitation(input: $input) {\n      userId\n      roomId\n    }\n  }\n": types.InvitationsListAcceptInvitationDocument,
    "\n  mutation InvitationsListRejectInvitation($input: RejectInvitationInput!) {\n    rejectInvitation(input: $input) {\n      userId\n      roomId\n    }\n  }\n": types.InvitationsListRejectInvitationDocument,
    "\n  subscription InvitationsNewInvitationSub {\n    newInvitation {\n      userId\n      roomId\n      room {\n        id\n        name\n        thumbnailUrl\n      }\n      inviter {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n": types.InvitationsNewInvitationSubDocument,
    "\n  query RoomInviteMembersGetParticipants($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      participants {\n        id\n      }\n    }\n  }\n": types.RoomInviteMembersGetParticipantsDocument,
    "\n  query RoomInviteMembersGetInvitedUsers($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      invitedUsers {\n        id\n      }\n    }\n  }\n": types.RoomInviteMembersGetInvitedUsersDocument,
    "\n  query SearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        profilePictureUrl\n      }\n      hasMore\n    }\n  }\n": types.SearchUsersDocument,
    "\n  query RoomGetPendingInvitations($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      pendingInvitations {\n        userId\n        roomId\n      }\n    }\n  }\n": types.RoomGetPendingInvitationsDocument,
    "\n  mutation InviteUsersToRoom($roomId: Int!, $invitedUsersIds: [Int!]!) {\n    inviteUsersToRoom(roomId: $roomId, invitedUsersIds: $invitedUsersIds)\n  }\n": types.InviteUsersToRoomDocument,
    "\n  query ProfileEditGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n      passwordLength\n    }\n  }\n": types.ProfileEditGetMeDocument,
    "\n  mutation ProfileEditFirstName($input: EditFirstNameInput!) {\n    editFirstName(input: $input) {\n      id\n      firstName\n    }\n  }\n": types.ProfileEditFirstNameDocument,
    "\n  mutation ProfileEditLastName($input: EditLastNameInput!) {\n    editLastName(input: $input) {\n      id\n      lastName\n    }\n  }\n": types.ProfileEditLastNameDocument,
    "\n  mutation ProfileEditProfilePicture($input: EditProfilePictureInput!) {\n    editProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n": types.ProfileEditProfilePictureDocument,
    "\n  mutation ProfileEditResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      id\n      passwordLength\n    }\n  }\n": types.ProfileEditResetPasswordDocument,
    "\n  query ProfileCardGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n": types.ProfileCardGetMeDocument,
    "\n  mutation SendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      isViewedByMe\n      sentAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n      images {\n        id\n        url\n      }\n      viewsCount\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation ScheduleMessage($input: ScheduleMessage!) {\n    scheduleMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      scheduledAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n    }\n  }\n": types.ScheduleMessageDocument,
    "\n  mutation DeleteMessages($roomId: Int!, $messageIds: [Int!]!) {\n    deleteMessages(roomId: $roomId, messageIds: $messageIds)\n  }\n": types.DeleteMessagesDocument,
    "\n    query RoomChatGetRoomParticipants($id: Int!) {\n      room(id: $id) {\n        id\n        participants {\n          id\n          firstName\n          lastName\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n": types.RoomChatGetRoomParticipantsDocument,
    "\n  mutation MarkMessageAsViewedByMe($messageId: Int!) {\n    markMessageAsViewedByMe(messageId: $messageId) {\n      id\n      viewsCount\n      isViewedByMe\n    }\n  }\n": types.MarkMessageAsViewedByMeDocument,
    "\n  query RoomChatMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n": types.RoomChatMeDocument,
    "\n  query RoomChatGetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      creatorId\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n": types.RoomChatGetRoomDocument,
    "\n  query RoomChatGetMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      messages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          isViewedByMe\n          sentAt\n          sender {\n            id\n            firstName\n            lastName\n            email\n            profilePictureUrl\n            isOnline\n          }\n          images {\n            id\n            url\n          }\n          viewsCount\n        }\n        hasMore\n      }\n    }\n  }\n": types.RoomChatGetMessagesDocument,
    "\n  query RoomChatGetScheduledMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      scheduledMessages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n    }\n  }\n": types.RoomChatGetScheduledMessagesDocument,
    "\n    query GetMessageViewers($messageId: Int!) {\n      message(id: $messageId) {\n        id\n        viewers {\n          id\n          email\n          profilePictureUrl\n        }\n      }\n    }\n": types.GetMessageViewersDocument,
    "\n    mutation NotifyMeIsTyping($roomId: Int!, $isTyping: Boolean!) {\n      notifyMeTypingStatusChange(roomId: $roomId, isTyping: $isTyping)\n    }\n": types.NotifyMeIsTypingDocument,
    "\n    mutation RoomChatExcludeFrom($roomId: Int!, $userId: Int!) {\n      excludeUserFromRoom(roomId: $roomId, userId: $userId) {\n        id\n        name\n      }\n    }\n": types.RoomChatExcludeFromDocument,
    "\n  mutation RoomChatSendScheduledMessagesNow($messageIds: [Int!]!) {\n    sendScheduledMessagesNow(messageIds: $messageIds)\n  }\n": types.RoomChatSendScheduledMessagesNowDocument,
    "\n    subscription UserTypingStatusChange($roomId: Int!) {\n      userTypingStatusChange(roomId: $roomId) {\n        isTyping\n        user {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n": types.UserTypingStatusChangeDocument,
    "\n    subscription MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n": types.MeIsExcludedFromRoomSubDocument,
    "\n  subscription NewMessageSub($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        senderId\n        roomId\n        scheduledAt\n        sender {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n  }\n": types.NewMessageSubDocument,
    "\n  subscription MessageViewedSub($messageId: Int!) {\n    messageViewed(messageId: $messageId) {\n      viewer {\n        id\n        email\n        profilePictureUrl\n      }\n      message {\n        id\n        viewsCount\n      }\n    }\n  }\n": types.MessageViewedSubDocument,
    "\n  subscription RoomChatUsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n": types.RoomChatUsersOnlineStatusChangeDocument,
    "\n  subscription MessagesDeleted($roomId: Int!) {\n    messagesDeleted(roomId: $roomId) {\n      messageIds\n    }\n  }\n": types.MessagesDeletedDocument,
    "\n  mutation RoomChatLeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n": types.RoomChatLeaveRoomDocument,
    "\n  subscription RoomChatPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n": types.RoomChatPendingInvitationsCountChangeDocument,
    "\n  query CreateRoomSearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        firstName\n        lastName\n        profilePictureUrl\n        isOnline\n      }\n      hasMore\n    }\n  }\n": types.CreateRoomSearchUsersDocument,
    "\n  mutation CreateRoom($input: CreateRoomInput!) {\n    createRoom(input: $input) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.CreateRoomDocument,
    "\n  subscription CreateRoomUsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n": types.CreateRoomUsersOnlineStatusChangeDocument,
    "\n  query RoomsList {\n    rooms {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.RoomsListDocument,
    "\n  subscription RoomsListParticipantLeave($roomId: Int!) {\n    roomParticipantLeave(roomId: $roomId) {\n      id\n      email\n    }\n  }\n": types.RoomsListParticipantLeaveDocument,
    "\n  subscription RoomParticipantJoined($roomId: Int!) {\n    roomParticipantJoined(roomId: $roomId) {\n      id\n      email\n      profilePictureUrl\n    }\n  }\n": types.RoomParticipantJoinedDocument,
    "\n    subscription MyRooms_MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n": types.MyRooms_MeIsExcludedFromRoomSubDocument,
    "\n  subscription RoomsListNewMessageSub($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        roomId\n        sender {\n          id\n          email\n        }\n      }\n      room {\n        id\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n  }\n": types.RoomsListNewMessageSubDocument,
    "\n  subscription RoomsListRoomCreated($skipFromCurrentSession: Boolean!) {\n    roomCreated(skipFromCurrentSession: $skipFromCurrentSession) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.RoomsListRoomCreatedDocument,
    "\n  subscription HomeNewInvitation {\n    newInvitation {\n      userId\n      roomId\n    }\n  }\n": types.HomeNewInvitationDocument,
    "\n  subscription HomeUserRejectedInvitation {\n    invitationRejected {\n      userId\n      roomId\n      room {\n        id\n        name\n      }\n      invitedUser {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n": types.HomeUserRejectedInvitationDocument,
    "\n  subscription HomeUserAcceptedInvitation {\n    invitationAccepted {\n      userId\n      roomId\n      room {\n        id\n        name\n      }\n      invitedUser {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n": types.HomeUserAcceptedInvitationDocument,
    "\n  query GetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      creatorId\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n": types.GetRoomDocument,
    "\n  subscription RoomPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n": types.RoomPendingInvitationsCountChangeDocument,
    "\n  query UsersSelectorSearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        firstName\n        lastName\n        profilePictureUrl\n        isOnline\n      }\n      hasMore\n    }\n  }\n": types.UsersSelectorSearchUsersDocument,
    "\n  subscription UsersSelectorOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n": types.UsersSelectorOnlineStatusChangeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AppGetMe {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query AppGetMe {\n    me {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation StartSession {\n    startSession {\n      sessionToken\n    }\n  }\n"): (typeof documents)["\n  mutation StartSession {\n    startSession {\n      sessionToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMeIdOnly {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetMeIdOnly {\n    me {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMeTemp {\n    me {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetMeTemp {\n    me {\n      id\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation BlockUser($input: BlockUserInput!) {\n    blockUser(input: $input) {\n      id\n      email\n      isBlocked\n    }\n  }\n"): (typeof documents)["\n  mutation BlockUser($input: BlockUserInput!) {\n    blockUser(input: $input) {\n      id\n      email\n      isBlocked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription MeBlockedStatus {\n    meIsBlockedStatus {\n      isBlocked\n    }\n  }\n"): (typeof documents)["\n  subscription MeBlockedStatus {\n    meIsBlockedStatus {\n      isBlocked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n"): (typeof documents)["\n  mutation LeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription NewMessageSubscription($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        roomId\n        senderId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NewMessageSubscription($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        roomId\n        senderId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UnblockUser($input: UnblockUserInput!) {\n    unblockUser(input: $input) {\n      id\n      isBlocked\n    }\n  }\n"): (typeof documents)["\n  mutation UnblockUser($input: UnblockUserInput!) {\n    unblockUser(input: $input) {\n      id\n      isBlocked\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n    me {\n      id\n      email\n      password\n      profilePictureUrl\n      invitationsCount\n    }\n  }\n"): (typeof documents)["\n  query GetMe {\n    me {\n      id\n      email\n      password\n      profilePictureUrl\n      invitationsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CheckEmailAvailability($email: String!) {\n    checkEmailAvailability(email: $email)\n  }\n"): (typeof documents)["\n  query CheckEmailAvailability($email: String!) {\n    checkEmailAvailability(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query InvitationsButtonGetMe {\n    me {\n      id\n      invitationsCount\n    }\n  }\n"): (typeof documents)["\n  query InvitationsButtonGetMe {\n    me {\n      id\n      invitationsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription InvitationsCountUpdatedSub {\n    invitationCountUpdated {\n      id\n      invitationsCount\n    }\n  }\n"): (typeof documents)["\n  subscription InvitationsCountUpdatedSub {\n    invitationCountUpdated {\n      id\n      invitationsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query InvitationsList {\n    invitations {\n      userId\n      roomId\n      room {\n        id\n        name\n        thumbnailUrl\n      }\n      inviter {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query InvitationsList {\n    invitations {\n      userId\n      roomId\n      room {\n        id\n        name\n        thumbnailUrl\n      }\n      inviter {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation InvitationsListAcceptInvitation($input: AcceptInvitationInput!) {\n    acceptInvitation(input: $input) {\n      userId\n      roomId\n    }\n  }\n"): (typeof documents)["\n  mutation InvitationsListAcceptInvitation($input: AcceptInvitationInput!) {\n    acceptInvitation(input: $input) {\n      userId\n      roomId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation InvitationsListRejectInvitation($input: RejectInvitationInput!) {\n    rejectInvitation(input: $input) {\n      userId\n      roomId\n    }\n  }\n"): (typeof documents)["\n  mutation InvitationsListRejectInvitation($input: RejectInvitationInput!) {\n    rejectInvitation(input: $input) {\n      userId\n      roomId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription InvitationsNewInvitationSub {\n    newInvitation {\n      userId\n      roomId\n      room {\n        id\n        name\n        thumbnailUrl\n      }\n      inviter {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription InvitationsNewInvitationSub {\n    newInvitation {\n      userId\n      roomId\n      room {\n        id\n        name\n        thumbnailUrl\n      }\n      inviter {\n        id\n        firstName\n        lastName\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomInviteMembersGetParticipants($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      participants {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomInviteMembersGetParticipants($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      participants {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomInviteMembersGetInvitedUsers($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      invitedUsers {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomInviteMembersGetInvitedUsers($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      invitedUsers {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        profilePictureUrl\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        profilePictureUrl\n      }\n      hasMore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomGetPendingInvitations($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      pendingInvitations {\n        userId\n        roomId\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomGetPendingInvitations($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      pendingInvitations {\n        userId\n        roomId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation InviteUsersToRoom($roomId: Int!, $invitedUsersIds: [Int!]!) {\n    inviteUsersToRoom(roomId: $roomId, invitedUsersIds: $invitedUsersIds)\n  }\n"): (typeof documents)["\n  mutation InviteUsersToRoom($roomId: Int!, $invitedUsersIds: [Int!]!) {\n    inviteUsersToRoom(roomId: $roomId, invitedUsersIds: $invitedUsersIds)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProfileEditGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n      passwordLength\n    }\n  }\n"): (typeof documents)["\n  query ProfileEditGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n      passwordLength\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ProfileEditFirstName($input: EditFirstNameInput!) {\n    editFirstName(input: $input) {\n      id\n      firstName\n    }\n  }\n"): (typeof documents)["\n  mutation ProfileEditFirstName($input: EditFirstNameInput!) {\n    editFirstName(input: $input) {\n      id\n      firstName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ProfileEditLastName($input: EditLastNameInput!) {\n    editLastName(input: $input) {\n      id\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation ProfileEditLastName($input: EditLastNameInput!) {\n    editLastName(input: $input) {\n      id\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ProfileEditProfilePicture($input: EditProfilePictureInput!) {\n    editProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  mutation ProfileEditProfilePicture($input: EditProfilePictureInput!) {\n    editProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ProfileEditResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      id\n      passwordLength\n    }\n  }\n"): (typeof documents)["\n  mutation ProfileEditResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input) {\n      id\n      passwordLength\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProfileCardGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  query ProfileCardGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      isViewedByMe\n      sentAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n      images {\n        id\n        url\n      }\n      viewsCount\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      isViewedByMe\n      sentAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n      images {\n        id\n        url\n      }\n      viewsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ScheduleMessage($input: ScheduleMessage!) {\n    scheduleMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      scheduledAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ScheduleMessage($input: ScheduleMessage!) {\n    scheduleMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      scheduledAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMessages($roomId: Int!, $messageIds: [Int!]!) {\n    deleteMessages(roomId: $roomId, messageIds: $messageIds)\n  }\n"): (typeof documents)["\n  mutation DeleteMessages($roomId: Int!, $messageIds: [Int!]!) {\n    deleteMessages(roomId: $roomId, messageIds: $messageIds)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query RoomChatGetRoomParticipants($id: Int!) {\n      room(id: $id) {\n        id\n        participants {\n          id\n          firstName\n          lastName\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n"): (typeof documents)["\n    query RoomChatGetRoomParticipants($id: Int!) {\n      room(id: $id) {\n        id\n        participants {\n          id\n          firstName\n          lastName\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MarkMessageAsViewedByMe($messageId: Int!) {\n    markMessageAsViewedByMe(messageId: $messageId) {\n      id\n      viewsCount\n      isViewedByMe\n    }\n  }\n"): (typeof documents)["\n  mutation MarkMessageAsViewedByMe($messageId: Int!) {\n    markMessageAsViewedByMe(messageId: $messageId) {\n      id\n      viewsCount\n      isViewedByMe\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomChatMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  query RoomChatMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomChatGetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      creatorId\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomChatGetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      creatorId\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomChatGetMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      messages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          isViewedByMe\n          sentAt\n          sender {\n            id\n            firstName\n            lastName\n            email\n            profilePictureUrl\n            isOnline\n          }\n          images {\n            id\n            url\n          }\n          viewsCount\n        }\n        hasMore\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomChatGetMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      messages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          isViewedByMe\n          sentAt\n          sender {\n            id\n            firstName\n            lastName\n            email\n            profilePictureUrl\n            isOnline\n          }\n          images {\n            id\n            url\n          }\n          viewsCount\n        }\n        hasMore\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomChatGetScheduledMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      scheduledMessages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomChatGetScheduledMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      scheduledMessages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetMessageViewers($messageId: Int!) {\n      message(id: $messageId) {\n        id\n        viewers {\n          id\n          email\n          profilePictureUrl\n        }\n      }\n    }\n"): (typeof documents)["\n    query GetMessageViewers($messageId: Int!) {\n      message(id: $messageId) {\n        id\n        viewers {\n          id\n          email\n          profilePictureUrl\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation NotifyMeIsTyping($roomId: Int!, $isTyping: Boolean!) {\n      notifyMeTypingStatusChange(roomId: $roomId, isTyping: $isTyping)\n    }\n"): (typeof documents)["\n    mutation NotifyMeIsTyping($roomId: Int!, $isTyping: Boolean!) {\n      notifyMeTypingStatusChange(roomId: $roomId, isTyping: $isTyping)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RoomChatExcludeFrom($roomId: Int!, $userId: Int!) {\n      excludeUserFromRoom(roomId: $roomId, userId: $userId) {\n        id\n        name\n      }\n    }\n"): (typeof documents)["\n    mutation RoomChatExcludeFrom($roomId: Int!, $userId: Int!) {\n      excludeUserFromRoom(roomId: $roomId, userId: $userId) {\n        id\n        name\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RoomChatSendScheduledMessagesNow($messageIds: [Int!]!) {\n    sendScheduledMessagesNow(messageIds: $messageIds)\n  }\n"): (typeof documents)["\n  mutation RoomChatSendScheduledMessagesNow($messageIds: [Int!]!) {\n    sendScheduledMessagesNow(messageIds: $messageIds)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription UserTypingStatusChange($roomId: Int!) {\n      userTypingStatusChange(roomId: $roomId) {\n        isTyping\n        user {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n"): (typeof documents)["\n    subscription UserTypingStatusChange($roomId: Int!) {\n      userTypingStatusChange(roomId: $roomId) {\n        isTyping\n        user {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n"): (typeof documents)["\n    subscription MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription NewMessageSub($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        senderId\n        roomId\n        scheduledAt\n        sender {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NewMessageSub($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        senderId\n        roomId\n        scheduledAt\n        sender {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription MessageViewedSub($messageId: Int!) {\n    messageViewed(messageId: $messageId) {\n      viewer {\n        id\n        email\n        profilePictureUrl\n      }\n      message {\n        id\n        viewsCount\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription MessageViewedSub($messageId: Int!) {\n    messageViewed(messageId: $messageId) {\n      viewer {\n        id\n        email\n        profilePictureUrl\n      }\n      message {\n        id\n        viewsCount\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomChatUsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  subscription RoomChatUsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription MessagesDeleted($roomId: Int!) {\n    messagesDeleted(roomId: $roomId) {\n      messageIds\n    }\n  }\n"): (typeof documents)["\n  subscription MessagesDeleted($roomId: Int!) {\n    messagesDeleted(roomId: $roomId) {\n      messageIds\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RoomChatLeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n"): (typeof documents)["\n  mutation RoomChatLeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomChatPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n"): (typeof documents)["\n  subscription RoomChatPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CreateRoomSearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        firstName\n        lastName\n        profilePictureUrl\n        isOnline\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  query CreateRoomSearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        firstName\n        lastName\n        profilePictureUrl\n        isOnline\n      }\n      hasMore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateRoom($input: CreateRoomInput!) {\n    createRoom(input: $input) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRoom($input: CreateRoomInput!) {\n    createRoom(input: $input) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription CreateRoomUsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  subscription CreateRoomUsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomsList {\n    rooms {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomsList {\n    rooms {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomsListParticipantLeave($roomId: Int!) {\n    roomParticipantLeave(roomId: $roomId) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  subscription RoomsListParticipantLeave($roomId: Int!) {\n    roomParticipantLeave(roomId: $roomId) {\n      id\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomParticipantJoined($roomId: Int!) {\n    roomParticipantJoined(roomId: $roomId) {\n      id\n      email\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  subscription RoomParticipantJoined($roomId: Int!) {\n    roomParticipantJoined(roomId: $roomId) {\n      id\n      email\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription MyRooms_MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n"): (typeof documents)["\n    subscription MyRooms_MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomsListNewMessageSub($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        roomId\n        sender {\n          id\n          email\n        }\n      }\n      room {\n        id\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription RoomsListNewMessageSub($skipFromCurrentSession: Boolean!) {\n    newMessage(skipFromCurrentSession: $skipFromCurrentSession) {\n      message {\n        id\n        text\n        roomId\n        sender {\n          id\n          email\n        }\n      }\n      room {\n        id\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomsListRoomCreated($skipFromCurrentSession: Boolean!) {\n    roomCreated(skipFromCurrentSession: $skipFromCurrentSession) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription RoomsListRoomCreated($skipFromCurrentSession: Boolean!) {\n    roomCreated(skipFromCurrentSession: $skipFromCurrentSession) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription HomeNewInvitation {\n    newInvitation {\n      userId\n      roomId\n    }\n  }\n"): (typeof documents)["\n  subscription HomeNewInvitation {\n    newInvitation {\n      userId\n      roomId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription HomeUserRejectedInvitation {\n    invitationRejected {\n      userId\n      roomId\n      room {\n        id\n        name\n      }\n      invitedUser {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription HomeUserRejectedInvitation {\n    invitationRejected {\n      userId\n      roomId\n      room {\n        id\n        name\n      }\n      invitedUser {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription HomeUserAcceptedInvitation {\n    invitationAccepted {\n      userId\n      roomId\n      room {\n        id\n        name\n      }\n      invitedUser {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription HomeUserAcceptedInvitation {\n    invitationAccepted {\n      userId\n      roomId\n      room {\n        id\n        name\n      }\n      invitedUser {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      creatorId\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      creatorId\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n"): (typeof documents)["\n  subscription RoomPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UsersSelectorSearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        firstName\n        lastName\n        profilePictureUrl\n        isOnline\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  query UsersSelectorSearchUsers($filter: SearchUsersFilterInput!) {\n    searchUsers(filter: $filter) {\n      data {\n        id\n        email\n        firstName\n        lastName\n        profilePictureUrl\n        isOnline\n      }\n      hasMore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription UsersSelectorOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  subscription UsersSelectorOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;