import { Button } from "@/components/ui/button";

interface ISubmitButtonProps {
  onClick?: () => void;
}
function SubmitButton({ onClick }: ISubmitButtonProps) {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="submit"
      onClick={onClick}
    >
      Submit
    </Button>
  );
}

export { SubmitButton };
