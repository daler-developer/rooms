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
    "\n  subscription MeBlockedStatus {\n    meIsBlockedStatus {\n      isBlocked\n    }\n  }\n": types.MeBlockedStatusDocument,
    "\n  query AppGetMe {\n    me {\n      id\n    }\n  }\n": types.AppGetMeDocument,
    "\n  mutation StartSession {\n    startSession {\n      sessionToken\n    }\n  }\n": types.StartSessionDocument,
    "\n  query GetMeIdOnly {\n    me {\n      id\n    }\n  }\n": types.GetMeIdOnlyDocument,
    "\n  query GetMeTemp {\n    me {\n      id\n      email\n    }\n  }\n": types.GetMeTempDocument,
    "\n  mutation BlockUser($input: BlockUserInput!) {\n    blockUser(input: $input) {\n      id\n      email\n      isBlocked\n    }\n  }\n": types.BlockUserDocument,
    "\n  query SearchUsers($input: SearchUsersInput!) {\n    searchUsers(input: $input) {\n      users {\n        id\n        email\n        profilePictureUrl\n      }\n      hasMore\n    }\n  }\n": types.SearchUsersDocument,
    "\n  mutation CreateRoom($input: CreateRoomInput!) {\n    createRoom(input: $input) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          email\n        }\n      }\n    }\n  }\n": types.CreateRoomDocument,
    "\n  subscription SubscribeToUserOnlineStatusChange($input: UserOnlineStatusChangeSubscriptionInput!) {\n    userOnlineStatusChange(input: $input) {\n      isOnline\n    }\n  }\n": types.SubscribeToUserOnlineStatusChangeDocument,
    "\n  query EmailFormGetMe {\n    me {\n      id\n      email\n    }\n  }\n": types.EmailFormGetMeDocument,
    "\n  mutation EditMyEmail($input: EditMyEmailInput!) {\n    editMyEmail(input: $input) {\n      id\n      email\n    }\n  }\n": types.EditMyEmailDocument,
    "\n  query EditMyProfilePictureGetMe {\n    me {\n      id\n      profilePictureUrl\n    }\n  }\n": types.EditMyProfilePictureGetMeDocument,
    "\n  mutation RemoveMyAvatar {\n    removeMyAvatar {\n      id\n      profilePictureUrl\n    }\n  }\n": types.RemoveMyAvatarDocument,
    "\n  mutation UploadProfilePictureInput($input: UploadProfilePictureInput!) {\n    uploadProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n": types.UploadProfilePictureInputDocument,
    "\n  mutation LeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n": types.LeaveRoomDocument,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query RoomGetPendingInvitations($roomId: Int!) {\n    room(id: $roomId) {\n      id\n      pendingInvitations {\n        userId\n        roomId\n      }\n    }\n  }\n": types.RoomGetPendingInvitationsDocument,
    "\n  mutation InviteUsersToRoom($roomId: Int!, $invitedUsersIds: [Int!]!) {\n    inviteUsersToRoom(roomId: $roomId, invitedUsersIds: $invitedUsersIds)\n  }\n": types.InviteUsersToRoomDocument,
    "\n  subscription MeIsInvitedToRoom {\n    meIsInvitedToRoom {\n      room {\n        id\n        name\n      }\n    }\n  }\n": types.MeIsInvitedToRoomDocument,
    "\n          query PrevMeInvitationsCount {\n            me {\n              id\n              invitationsCount\n            }\n          }\n        ": types.PrevMeInvitationsCountDocument,
    "\n          query UpdateMeInvitationsCount {\n            me {\n              id\n              invitationsCount\n            }\n          }\n        ": types.UpdateMeInvitationsCountDocument,
    "\n  subscription NewMessageSubscription {\n    newMessage {\n      message {\n        id\n        text\n        roomId\n        senderId\n      }\n    }\n  }\n": types.NewMessageSubscriptionDocument,
    "\n  subscription RepliedToMyInvitation {\n    repliedToMyInvitation {\n      accepted\n      invitation {\n        userId\n        roomId\n        invitedUser {\n          id\n          email\n        }\n        room {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.RepliedToMyInvitationDocument,
    "\n  mutation UnblockUser($input: UnblockUserInput!) {\n    unblockUser(input: $input) {\n      id\n      isBlocked\n    }\n  }\n": types.UnblockUserDocument,
    "\n  query GetMe {\n    me {\n      id\n      email\n      password\n      profilePictureUrl\n      invitationsCount\n    }\n  }\n": types.GetMeDocument,
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      token\n    }\n  }\n": types.RegisterDocument,
    "\n  query InvitationsButtonGetMe {\n    me {\n      id\n      invitationsCount\n    }\n  }\n": types.InvitationsButtonGetMeDocument,
    "\n  subscription InvitationsButtonMeInvitedToRoomSub {\n    meIsInvitedToRoom {\n      invitation {\n        userId\n        roomId\n      }\n    }\n  }\n": types.InvitationsButtonMeInvitedToRoomSubDocument,
    "\n  query InvitationsList {\n    me {\n      id\n      invitations {\n        userId\n        roomId\n        room {\n          id\n          name\n          thumbnailUrl\n        }\n        inviter {\n          id\n          firstName\n          lastName\n        }\n        createdAt\n      }\n    }\n  }\n": types.InvitationsListDocument,
    "\n  mutation AcceptInvitation($input: AcceptInvitationInput!) {\n    acceptInvitation(input: $input)\n  }\n": types.AcceptInvitationDocument,
    "\n  mutation RejectInvitation($input: RejectInvitationInput!) {\n    rejectInvitation(input: $input)\n  }\n": types.RejectInvitationDocument,
    "\n  subscription MeIsInvitedToRoom2 {\n    meIsInvitedToRoom {\n      invitation {\n        userId\n        roomId\n        room {\n          id\n          name\n          thumbnailUrl\n        }\n        inviter {\n          id\n          firstName\n          lastName\n        }\n        createdAt\n      }\n    }\n  }\n": types.MeIsInvitedToRoom2Document,
    "\n  query EditProfileGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n      passwordLength\n    }\n  }\n": types.EditProfileGetMeDocument,
    "\n  mutation EditProfileEditFirstName($firstName: String!) {\n    userUpdateFirstName(newFirstName: $firstName) {\n      id\n      firstName\n    }\n  }\n": types.EditProfileEditFirstNameDocument,
    "\n  mutation EditProfileEditLastName($lastName: String!) {\n    userUpdateLastName(newLastName: $lastName) {\n      id\n      lastName\n    }\n  }\n": types.EditProfileEditLastNameDocument,
    "\n  mutation EditProfileRemoveMyAvatar {\n    removeMyAvatar {\n      id\n      profilePictureUrl\n    }\n  }\n": types.EditProfileRemoveMyAvatarDocument,
    "\n  mutation EditProfileUploadProfilePicture($input: UploadProfilePictureInput!) {\n    uploadProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n": types.EditProfileUploadProfilePictureDocument,
    "\n  mutation AuthResetPassword($input: EditMyPasswordInput!) {\n    editMyPassword(input: $input) {\n      id\n      passwordLength\n    }\n  }\n": types.AuthResetPasswordDocument,
    "\n  query ProfileCardGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n": types.ProfileCardGetMeDocument,
    "\n  query GetMyRooms {\n    me {\n      id\n      rooms {\n        id\n        name\n        thumbnailUrl\n        participantsCount\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n  }\n": types.GetMyRoomsDocument,
    "\n  subscription RoomParticipantLeft($roomId: Int!) {\n    roomParticipantLeft(roomId: $roomId) {\n      id\n      email\n    }\n  }\n": types.RoomParticipantLeftDocument,
    "\n  subscription RoomParticipantJoined($roomId: Int!) {\n    roomParticipantJoined(roomId: $roomId) {\n      id\n      email\n      profilePictureUrl\n    }\n  }\n": types.RoomParticipantJoinedDocument,
    "\n    subscription MyRooms_MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n": types.MyRooms_MeIsExcludedFromRoomSubDocument,
    "\n  subscription MyRoomsNewMessageSub {\n    newMessage {\n      message {\n        id\n        text\n        roomId\n        sender {\n          id\n          email\n        }\n      }\n      room {\n        id\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            email\n          }\n        }\n      }\n    }\n  }\n": types.MyRoomsNewMessageSubDocument,
    "\n  mutation SendMessage($input: SendMessageInput!) {\n    sendMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      isViewedByMe\n      sentAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n      images {\n        id\n        url\n      }\n      viewsCount\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation ScheduleMessage($input: ScheduleMessage!) {\n    scheduleMessage(input: $input) {\n      id\n      text\n      senderId\n      roomId\n      scheduledAt\n      sender {\n        id\n        email\n        profilePictureUrl\n        isOnline\n      }\n    }\n  }\n": types.ScheduleMessageDocument,
    "\n  mutation DeleteMessages($roomId: Int!, $messageIds: [Int!]!) {\n    deleteMessages(roomId: $roomId, messageIds: $messageIds)\n  }\n": types.DeleteMessagesDocument,
    "\n    query GetRoomParticipants($id: Int!) {\n      room(id: $id) {\n        id\n        participants {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n": types.GetRoomParticipantsDocument,
    "\n  mutation MarkMessageAsViewedByMe($messageId: Int!) {\n    markMessageAsViewedByMe(messageId: $messageId) {\n      id\n      viewsCount\n      isViewedByMe\n    }\n  }\n": types.MarkMessageAsViewedByMeDocument,
    "\n  query RoomChatMe {\n    me {\n      id\n      email\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n": types.RoomChatMeDocument,
    "\n  query GetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n": types.GetRoomDocument,
    "\n  query RoomChatGetMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      messages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          isViewedByMe\n          sentAt\n          sender {\n            id\n            firstName\n            lastName\n            email\n            profilePictureUrl\n            isOnline\n          }\n          images {\n            id\n            url\n          }\n          viewsCount\n        }\n        hasMore\n      }\n    }\n  }\n": types.RoomChatGetMessagesDocument,
    "\n    query GetMessageViewers($messageId: Int!) {\n      message(id: $messageId) {\n        id\n        viewers {\n          id\n          email\n          profilePictureUrl\n        }\n      }\n    }\n": types.GetMessageViewersDocument,
    "\n    mutation NotifyMeIsTyping($roomId: Int!, $isTyping: Boolean!) {\n      notifyMeTypingStatusChange(roomId: $roomId, isTyping: $isTyping)\n    }\n": types.NotifyMeIsTypingDocument,
    "\n    mutation ExcludeUserFromRoom($roomId: Int!, $userId: Int!) {\n      excludeUserFromRoom(roomId: $roomId, userId: $userId) {\n        id\n        name\n      }\n    }\n": types.ExcludeUserFromRoomDocument,
    "\n  mutation RoomChatSendScheduledMessagesNow($messageIds: [Int!]!) {\n    sendScheduledMessagesNow(messageIds: $messageIds)\n  }\n": types.RoomChatSendScheduledMessagesNowDocument,
    "\n    subscription UserTypingStatusChange($roomId: Int!) {\n      userTypingStatusChange(roomId: $roomId) {\n        isTyping\n        user {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n": types.UserTypingStatusChangeDocument,
    "\n    subscription MeIsExcludedFromRoomSub {\n      meIsExcludedFromRoom {\n        id\n        name\n      }\n    }\n": types.MeIsExcludedFromRoomSubDocument,
    "\n  subscription NewMessageSub {\n    newMessage {\n      message {\n        id\n        text\n        senderId\n        roomId\n        isViewedByMe\n        sentAt\n        sender {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n        images {\n          id\n          url\n        }\n        viewsCount\n      }\n    }\n  }\n": types.NewMessageSubDocument,
    "\n  subscription MessageViewedSub($messageId: Int!) {\n    messageViewed(messageId: $messageId) {\n      viewer {\n        id\n        email\n        profilePictureUrl\n      }\n      message {\n        id\n        viewsCount\n      }\n    }\n  }\n": types.MessageViewedSubDocument,
    "\n  subscription RoomPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n": types.RoomPendingInvitationsCountChangeDocument,
    "\n  subscription UsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n": types.UsersOnlineStatusChangeDocument,
    "\n  subscription MessagesDeleted($roomId: Int!) {\n    messagesDeleted(roomId: $roomId) {\n      messageIds\n    }\n  }\n": types.MessagesDeletedDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      isBlocked\n    }\n  }\n": types.GetUsersDocument,
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
export function gql(source: "\n  subscription MeBlockedStatus {\n    meIsBlockedStatus {\n      isBlocked\n    }\n  }\n"): (typeof documents)["\n  subscription MeBlockedStatus {\n    meIsBlockedStatus {\n      isBlocked\n    }\n  }\n"];
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
export function gql(source: "\n  query SearchUsers($input: SearchUsersInput!) {\n    searchUsers(input: $input) {\n      users {\n        id\n        email\n        profilePictureUrl\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($input: SearchUsersInput!) {\n    searchUsers(input: $input) {\n      users {\n        id\n        email\n        profilePictureUrl\n      }\n      hasMore\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateRoom($input: CreateRoomInput!) {\n    createRoom(input: $input) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRoom($input: CreateRoomInput!) {\n    createRoom(input: $input) {\n      id\n      name\n      thumbnailUrl\n      participantsCount\n      unreadMessagesCount\n      lastMessage {\n        id\n        text\n        sender {\n          id\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription SubscribeToUserOnlineStatusChange($input: UserOnlineStatusChangeSubscriptionInput!) {\n    userOnlineStatusChange(input: $input) {\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  subscription SubscribeToUserOnlineStatusChange($input: UserOnlineStatusChangeSubscriptionInput!) {\n    userOnlineStatusChange(input: $input) {\n      isOnline\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query EmailFormGetMe {\n    me {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query EmailFormGetMe {\n    me {\n      id\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditMyEmail($input: EditMyEmailInput!) {\n    editMyEmail(input: $input) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation EditMyEmail($input: EditMyEmailInput!) {\n    editMyEmail(input: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query EditMyProfilePictureGetMe {\n    me {\n      id\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  query EditMyProfilePictureGetMe {\n    me {\n      id\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveMyAvatar {\n    removeMyAvatar {\n      id\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveMyAvatar {\n    removeMyAvatar {\n      id\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UploadProfilePictureInput($input: UploadProfilePictureInput!) {\n    uploadProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UploadProfilePictureInput($input: UploadProfilePictureInput!) {\n    uploadProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n"): (typeof documents)["\n  mutation LeaveRoom($input: LeaveRoomInput!) {\n    leaveRoom(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n      }\n      token\n    }\n  }\n"];
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
export function gql(source: "\n  subscription MeIsInvitedToRoom {\n    meIsInvitedToRoom {\n      room {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription MeIsInvitedToRoom {\n    meIsInvitedToRoom {\n      room {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n          query PrevMeInvitationsCount {\n            me {\n              id\n              invitationsCount\n            }\n          }\n        "): (typeof documents)["\n          query PrevMeInvitationsCount {\n            me {\n              id\n              invitationsCount\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n          query UpdateMeInvitationsCount {\n            me {\n              id\n              invitationsCount\n            }\n          }\n        "): (typeof documents)["\n          query UpdateMeInvitationsCount {\n            me {\n              id\n              invitationsCount\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription NewMessageSubscription {\n    newMessage {\n      message {\n        id\n        text\n        roomId\n        senderId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NewMessageSubscription {\n    newMessage {\n      message {\n        id\n        text\n        roomId\n        senderId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RepliedToMyInvitation {\n    repliedToMyInvitation {\n      accepted\n      invitation {\n        userId\n        roomId\n        invitedUser {\n          id\n          email\n        }\n        room {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription RepliedToMyInvitation {\n    repliedToMyInvitation {\n      accepted\n      invitation {\n        userId\n        roomId\n        invitedUser {\n          id\n          email\n        }\n        room {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      user {\n        id\n        email\n        firstName\n        lastName\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query InvitationsButtonGetMe {\n    me {\n      id\n      invitationsCount\n    }\n  }\n"): (typeof documents)["\n  query InvitationsButtonGetMe {\n    me {\n      id\n      invitationsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription InvitationsButtonMeInvitedToRoomSub {\n    meIsInvitedToRoom {\n      invitation {\n        userId\n        roomId\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription InvitationsButtonMeInvitedToRoomSub {\n    meIsInvitedToRoom {\n      invitation {\n        userId\n        roomId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query InvitationsList {\n    me {\n      id\n      invitations {\n        userId\n        roomId\n        room {\n          id\n          name\n          thumbnailUrl\n        }\n        inviter {\n          id\n          firstName\n          lastName\n        }\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query InvitationsList {\n    me {\n      id\n      invitations {\n        userId\n        roomId\n        room {\n          id\n          name\n          thumbnailUrl\n        }\n        inviter {\n          id\n          firstName\n          lastName\n        }\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AcceptInvitation($input: AcceptInvitationInput!) {\n    acceptInvitation(input: $input)\n  }\n"): (typeof documents)["\n  mutation AcceptInvitation($input: AcceptInvitationInput!) {\n    acceptInvitation(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RejectInvitation($input: RejectInvitationInput!) {\n    rejectInvitation(input: $input)\n  }\n"): (typeof documents)["\n  mutation RejectInvitation($input: RejectInvitationInput!) {\n    rejectInvitation(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription MeIsInvitedToRoom2 {\n    meIsInvitedToRoom {\n      invitation {\n        userId\n        roomId\n        room {\n          id\n          name\n          thumbnailUrl\n        }\n        inviter {\n          id\n          firstName\n          lastName\n        }\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription MeIsInvitedToRoom2 {\n    meIsInvitedToRoom {\n      invitation {\n        userId\n        roomId\n        room {\n          id\n          name\n          thumbnailUrl\n        }\n        inviter {\n          id\n          firstName\n          lastName\n        }\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query EditProfileGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n      passwordLength\n    }\n  }\n"): (typeof documents)["\n  query EditProfileGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n      passwordLength\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditProfileEditFirstName($firstName: String!) {\n    userUpdateFirstName(newFirstName: $firstName) {\n      id\n      firstName\n    }\n  }\n"): (typeof documents)["\n  mutation EditProfileEditFirstName($firstName: String!) {\n    userUpdateFirstName(newFirstName: $firstName) {\n      id\n      firstName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditProfileEditLastName($lastName: String!) {\n    userUpdateLastName(newLastName: $lastName) {\n      id\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation EditProfileEditLastName($lastName: String!) {\n    userUpdateLastName(newLastName: $lastName) {\n      id\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditProfileRemoveMyAvatar {\n    removeMyAvatar {\n      id\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  mutation EditProfileRemoveMyAvatar {\n    removeMyAvatar {\n      id\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditProfileUploadProfilePicture($input: UploadProfilePictureInput!) {\n    uploadProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  mutation EditProfileUploadProfilePicture($input: UploadProfilePictureInput!) {\n    uploadProfilePicture(input: $input) {\n      id\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthResetPassword($input: EditMyPasswordInput!) {\n    editMyPassword(input: $input) {\n      id\n      passwordLength\n    }\n  }\n"): (typeof documents)["\n  mutation AuthResetPassword($input: EditMyPasswordInput!) {\n    editMyPassword(input: $input) {\n      id\n      passwordLength\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProfileCardGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n"): (typeof documents)["\n  query ProfileCardGetMe {\n    me {\n      id\n      firstName\n      lastName\n      profilePictureUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMyRooms {\n    me {\n      id\n      rooms {\n        id\n        name\n        thumbnailUrl\n        participantsCount\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMyRooms {\n    me {\n      id\n      rooms {\n        id\n        name\n        thumbnailUrl\n        participantsCount\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomParticipantLeft($roomId: Int!) {\n    roomParticipantLeft(roomId: $roomId) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  subscription RoomParticipantLeft($roomId: Int!) {\n    roomParticipantLeft(roomId: $roomId) {\n      id\n      email\n    }\n  }\n"];
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
export function gql(source: "\n  subscription MyRoomsNewMessageSub {\n    newMessage {\n      message {\n        id\n        text\n        roomId\n        sender {\n          id\n          email\n        }\n      }\n      room {\n        id\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            email\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription MyRoomsNewMessageSub {\n    newMessage {\n      message {\n        id\n        text\n        roomId\n        sender {\n          id\n          email\n        }\n      }\n      room {\n        id\n        unreadMessagesCount\n        lastMessage {\n          id\n          text\n          sender {\n            id\n            email\n          }\n        }\n      }\n    }\n  }\n"];
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
export function gql(source: "\n    query GetRoomParticipants($id: Int!) {\n      room(id: $id) {\n        id\n        participants {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n"): (typeof documents)["\n    query GetRoomParticipants($id: Int!) {\n      room(id: $id) {\n        id\n        participants {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n      }\n    }\n"];
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
export function gql(source: "\n  query GetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetRoom($roomId: Int!, $scheduledMessagesOffset: Int!) {\n    room(id: $roomId) {\n      id\n      name\n      thumbnailUrl\n      pendingInvitationsCount\n      participantsOnlineCount\n      myScheduledMessagesCount\n      scheduledMessages(offset: $scheduledMessagesOffset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          scheduledAt\n          sender {\n            id\n            email\n            profilePictureUrl\n            isOnline\n          }\n        }\n        hasMore\n      }\n      participantsTyping {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RoomChatGetMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      messages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          isViewedByMe\n          sentAt\n          sender {\n            id\n            firstName\n            lastName\n            email\n            profilePictureUrl\n            isOnline\n          }\n          images {\n            id\n            url\n          }\n          viewsCount\n        }\n        hasMore\n      }\n    }\n  }\n"): (typeof documents)["\n  query RoomChatGetMessages($roomId: Int!, $offset: Int!) {\n    room(id: $roomId) {\n      id\n      messages(offset: $offset) {\n        data {\n          id\n          text\n          senderId\n          roomId\n          isViewedByMe\n          sentAt\n          sender {\n            id\n            firstName\n            lastName\n            email\n            profilePictureUrl\n            isOnline\n          }\n          images {\n            id\n            url\n          }\n          viewsCount\n        }\n        hasMore\n      }\n    }\n  }\n"];
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
export function gql(source: "\n    mutation ExcludeUserFromRoom($roomId: Int!, $userId: Int!) {\n      excludeUserFromRoom(roomId: $roomId, userId: $userId) {\n        id\n        name\n      }\n    }\n"): (typeof documents)["\n    mutation ExcludeUserFromRoom($roomId: Int!, $userId: Int!) {\n      excludeUserFromRoom(roomId: $roomId, userId: $userId) {\n        id\n        name\n      }\n    }\n"];
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
export function gql(source: "\n  subscription NewMessageSub {\n    newMessage {\n      message {\n        id\n        text\n        senderId\n        roomId\n        isViewedByMe\n        sentAt\n        sender {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n        images {\n          id\n          url\n        }\n        viewsCount\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NewMessageSub {\n    newMessage {\n      message {\n        id\n        text\n        senderId\n        roomId\n        isViewedByMe\n        sentAt\n        sender {\n          id\n          email\n          profilePictureUrl\n          isOnline\n        }\n        images {\n          id\n          url\n        }\n        viewsCount\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription MessageViewedSub($messageId: Int!) {\n    messageViewed(messageId: $messageId) {\n      viewer {\n        id\n        email\n        profilePictureUrl\n      }\n      message {\n        id\n        viewsCount\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription MessageViewedSub($messageId: Int!) {\n    messageViewed(messageId: $messageId) {\n      viewer {\n        id\n        email\n        profilePictureUrl\n      }\n      message {\n        id\n        viewsCount\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription RoomPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n"): (typeof documents)["\n  subscription RoomPendingInvitationsCountChange($roomId: Int!) {\n    roomPendingInvitationsCountChange(roomId: $roomId) {\n      id\n      pendingInvitationsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription UsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"): (typeof documents)["\n  subscription UsersOnlineStatusChange($userIds: [Int!]!) {\n    usersOnlineStatusChange(userIds: $userIds) {\n      id\n      isOnline\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription MessagesDeleted($roomId: Int!) {\n    messagesDeleted(roomId: $roomId) {\n      messageIds\n    }\n  }\n"): (typeof documents)["\n  subscription MessagesDeleted($roomId: Int!) {\n    messagesDeleted(roomId: $roomId) {\n      messageIds\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers {\n    users {\n      id\n      email\n      isBlocked\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      email\n      isBlocked\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;