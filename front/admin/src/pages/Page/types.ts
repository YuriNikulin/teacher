export interface IPage {
  name: string;
  url: string;
  title: string;
  styles: string;
  id: string;
  blocks?: Array<IBlock>;
}

export type Error = Partial<IPage> | string;

export interface IPageReducer {
  isLoading: boolean;
  isFormLoading: boolean;
  error?: Error;
  pages: Array<IPage>;
  drafts: Record<string, ILayout | undefined>;
}

export interface IAttachment {
  preview?: string;
  linkText?: string;
  linkUrl: string;
}

export interface IBlock {
  id: string;
  name?: string;
  title?: string;
  styles?: string;
  order: number;
  layout: string;
  is_hidden?: boolean;
  isNew?: boolean;
  isTouched?: boolean;
  isDeleted?: boolean;
  attachments?: any;
}

export type ILayout = IBlock[];
