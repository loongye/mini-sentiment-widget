import { CommentInput } from "@/components/comment-input";
import { RatingChips } from "@/components/rating-chips";
import { useStateProvider, type ISentiment } from "@/components/state-provider";
import { SubmitButton } from "@/components/submit-button";
import { ThankYouDialog } from "@/components/thank-you-dialog";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { useState } from "react";

const initialState: ISentiment = {
  rating: 0,
  comment: "",
};

function SubmissionForm() {
  const { addSentiment } = useStateProvider();
  const [sentiment, setSentiment] = useState<ISentiment>(initialState);
  const [isValid, setIsValid] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = () => {
    setIsValid(true);
    if (!sentiment.rating) {
      setIsValid(false);
      return;
    }

    addSentiment(sentiment);
    setIsValid(true);
    setSentiment(initialState);
    setShowThankYou(true);

    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  return (
    <>
      <FieldSet disabled={disabled}>
        <FieldGroup>
          <RatingChips
            value={sentiment.rating}
            onChange={(rating = 0) => {
              setIsValid(true); // reset validation
              setSentiment(({ comment }) => ({ rating, comment }));
            }}
            error={!isValid}
          />
          <CommentInput
            value={sentiment.comment}
            onChange={(comment) =>
              setSentiment(({ rating }) => ({ rating, comment }))
            }
          />
          <SubmitButton onClick={handleSubmit} />
        </FieldGroup>
      </FieldSet>
      <ThankYouDialog open={showThankYou} onOpenChange={setShowThankYou} />
    </>
  );
}

export { SubmissionForm };
