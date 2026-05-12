import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface IRatingChipsProps {
  value?: number;
  onChange?: (newValue?: number) => void;
  error?: boolean;
}
function RatingChips({ value, onChange, error }: IRatingChipsProps) {
  return (
    <Field data-invalid={error}>
      <FieldLabel htmlFor="rating">Rating</FieldLabel>
      <ToggleGroup
        id="rating"
        type="single"
        size="lg"
        spacing={2}
        value={String(value)}
        onValueChange={(newVal) =>
          newVal ? onChange?.(Number(newVal)) : onChange?.()
        }
        aria-invalid={error}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <ToggleGroupItem key={i} value={String(i)} variant="outline">
            {i}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {error && <FieldError>Choose a rating</FieldError>}
    </Field>
  );
}

export { RatingChips };
