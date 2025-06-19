export interface Post {
  subscribe(arg0: (post: any) => void): unknown;
  userId: number;
  id: number;
  title: string;
  body: string;
}
