import type { Comment } from "../../types/communities";

import CommentCard from "./CommentCard";

type Props = {
  comments: Comment[];

  onReply: (
    comment: Comment
  ) => void;
};

export default function CommentList({
  comments,
  onReply,
}: Props) {

  return (

    <div className="px-4 py-4">

      <div className="mb-4 text-sm text-gray-500">
        {comments.length} Replies
      </div>

      <div className="space-y-4">

        {comments.map((comment) => (

          <CommentCard
            key={comment.id}
            comment={comment}
            onReply={onReply}
          />

        ))}

      </div>

    </div>

  );
}