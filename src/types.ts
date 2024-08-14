export interface Event {
  kind: number;
  tags: string[][];
  content: string;
  created_at: number;
  pubkey: string;
  id: string;
  sig: string;
}

export type Metadata = {
  name?: string;
  pubkey?: string;
  picture?: string;
  nip05?: string;
  banner?: string;
  website?: string;
  about?: string;
  display_name?: string;
};
