import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryPanel } from "@/components/summary-panel";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { StateProvider } from "@/components/state-provider";
import { SubmissionForm } from "@/components/submission-form";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="bg-secondary w-screen h-screen flex items-center justify-center">
        <Card className="w-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl">Mini Sentiment Widget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StateProvider>
              <SubmissionForm />
              <SummaryPanel />
            </StateProvider>
          </CardContent>
        </Card>
      </div>
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
