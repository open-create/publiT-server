export class CreatePubbleInput {
  title: string;
  content: string;
  fileNames: string | null;
  pubbleCategoryId: string;
  pubblesTags: string[];
}
