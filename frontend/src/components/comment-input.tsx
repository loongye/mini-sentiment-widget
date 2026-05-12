import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";

interface ICommentInputProps {
  value?: string;
  onChange?: (value: string) => void;
}
function CommentInput({ value, onChange }: ICommentInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor="comment">Comment</FieldLabel>
      <Textarea
        id="comment"
        placeholder="Enter your comment"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Field>
  );
}

export { CommentInput };
