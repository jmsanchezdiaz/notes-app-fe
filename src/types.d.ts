export interface INoteValues {
  body: string;
  author: string;
  isActive?: boolean;
}

export interface INote extends INoteValues {
  _id: string;
  isActive: boolean;
}
