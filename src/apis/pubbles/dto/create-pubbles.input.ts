export class CreatePubbleInput {
  title: string;
  content: string;
  fileNames: string | null;
  isDraft: boolean;
  pubbleCategoryId: string;
  pubblesTags: string[];
}
