export type Document = {
  id: string;
  command: string;
  tags: string[];
  description: string;
  stringForSearch: string;
  createUserId: string;
  addStarUsers: string[];
};
