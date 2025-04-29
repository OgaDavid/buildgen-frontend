"use client";

import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  spaceAtom,
  vibeAtom,
  timeAtom,
  stepAtom,
  isStepCompleteAtom,
  generateProductIdeaAtom,
} from "@/lib/store";

export default function Generator() {
  const [step, setStep] = useAtom(stepAtom);
  const [space, setSpace] = useAtom(spaceAtom);
  const [vibe, setVibe] = useAtom(vibeAtom);
  const [time, setTime] = useAtom(timeAtom);
  const [isStepComplete] = useAtom(isStepCompleteAtom);
  const [, generateProductIdea] = useAtom(generateProductIdeaAtom);

  const router = useRouter();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Generate a product idea based on the current inputs
      generateProductIdea();
      router.push("/results");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">BuildGen</h1>
            <p className="mt-2 text-gray-400">Tell us about your project</p>
          </div>

          <div className="flex justify-between items-center mb-8 ml-[120px]">
            <StepIndicator currentStep={step} totalSteps={3} />
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              {step === 1 && (
                <StepContent
                  title="What space are you in?"
                  options={[
                    "Fintech",
                    "Education",
                    "Productivity",
                    "Health",
                    "AI",
                    "Creator Tools",
                    "Food",
                    "Logistics",
                  ]}
                  value={space}
                  onChange={setSpace}
                />
              )}

              {step === 2 && (
                <StepContent
                  title="What's your vibe?"
                  options={[
                    "Solo Builder",
                    "Student Team",
                    "Early-stage Startup",
                  ]}
                  value={vibe}
                  onChange={setVibe}
                />
              )}

              {step === 3 && (
                <StepContent
                  title="How much time do you have?"
                  options={["24 hours", "A Weekend", "A Month"]}
                  value={time}
                  onChange={setTime}
                />
              )}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isStepComplete}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {step === 3 ? "Generate Idea" : "Next"}{" "}
                  {step === 3 ? (
                    <Check className="ml-2 h-4 w-4" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="w-full flex items-center justify-between">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center w-full">
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              index + 1 === currentStep
                ? "bg-purple-600 text-white"
                : index + 1 < currentStep
                ? "bg-purple-900 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {index + 1 < currentStep ? (
              <Check className="h-5 w-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`h-1 flex-grow mx-2 ${
                index + 1 < currentStep ? "bg-purple-600" : "bg-gray-800"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StepContent({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">{title}</h2>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="hover:bg-gray-700 focus:bg-gray-700"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
