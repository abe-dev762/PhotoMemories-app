import { type FirestoreDataConverter, QueryDocumentSnapshot, type SnapshotOptions } from "firebase/firestore";
import { type Post } from "@/types";

export const postConverter: FirestoreDataConverter<Post> = {
    toFirestore(post: Post) {
        return post;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Post {
        const data = snapshot.data(options);
        return {
            ...data,
        } as Post;
    },
};