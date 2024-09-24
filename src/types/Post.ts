import type { EntrySkeletonType } from "contentful";

export interface PostSkeleton extends EntrySkeletonType {
  fields: {
    title: string;
    body: string;
    description: string;
    image: string;
    createdAt: string;
  };
}