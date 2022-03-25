class Peer {
  ipAndPort: string;
  publciKey: string;
}

type TaggedState<T extends string> = { tag: T };

export type OuterAuthorized = TaggedState<'OuterAuthorized'> & {
  uname: string;
};

export type KeyRetrieved = TaggedState<'KeysRetrieved'> & {
  uname: string;
  publicKey: string;
  privateKey: string;
};

export type IPUpdated = TaggedState<'IPUpdated'> & {
  uname: string;
  publicKey: string;
  privateKey: string;
  ip: string;
};

export type WebsocketServerCreated = TaggedState<'WebsocketCreated'> & {
  uname: string;
  publicKey: string;
  privateKey: string;
  ipAndPort: string;
};

export type InnerAuthorized = TaggedState<'InnerAuthorized'> & {
  uname: string;
  publicKey: string;
  privateKey: string;
  ipAndPort: string;
  peers: Peer[];
};

export type SyncingDatabase = TaggedState<'SyncingDatabase'> & {
  uname: string;
  publicKey: string;
  privateKey: string;
  ipAndPort: string;
  peers: Peer[];
};

export type WaitingForUpdate = TaggedState<'WaitingForUpdate'> & {
  uname: string;
  publicKey: string;
  privateKey: string;
  ipAndPort: string;
  peers: Peer[];
};

export type State =
  | OuterAuthorized
  | KeyRetrieved
  | IPUpdated
  | InnerAuthorized
  | WebsocketServerCreated
  | SyncingDatabase
  | WaitingForUpdate;
