import { useStateProvider } from "@/components/state-provider";
import { Separator } from "@/components/ui/separator";

function SummaryPanel() {
  const { sentiments } = useStateProvider();
  return (
    <>
      <Separator />
      <h2 className="text-2xl">Summary</h2>
      <div>
        <p>Total submissions: {sentiments.length}</p>
        <p>
          Average rating:{" "}
          {sentiments.length === 0
            ? "0.0"
            : Number(
                sentiments.reduce((acc, cur) => acc + cur.rating, 0) /
                  sentiments.length,
              ).toFixed(1)}
        </p>
      </div>
      <Separator />
      <ul className="list-disc pl-4">
        {[...sentiments]
          .reverse()
          .slice(0, 3)
          .map((i, index) => (
            <li key={index}>{`"${i.comment}"`}</li>
          ))}
      </ul>
    </>
  );
}

export { SummaryPanel };
