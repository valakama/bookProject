
export type PageInfo =
  | { id: string; type: "text"; content: string }
  | { id: string; type: "image"; content: string };

export interface BookState {
  id: string;
  pages: PageInfo[];
  title: string;
  currentPage: number;
}