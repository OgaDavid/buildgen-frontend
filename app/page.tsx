import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Zap, Lightbulb, Rocket } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Image
              src="/logo.svg"
              alt="BuildGen Logo"
              width={150}
              height={200}
              className="mx-auto mb-4 rounded-full shadow-lg"
            />

            <p className="mt-4 text-base text-gray-300">
              Generate tailored product ideas for your next build!
            </p>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <Link href="/generator">
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Generating Ideas
                </Button>
              </Link>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  icon="Zap"
                  title="3-Step Process"
                  description="Answer three simple questions to get a tailored product idea"
                />
                <FeatureCard
                  icon="Lightbulb"
                  title="AI-Powered"
                  description="Leverages GPT to generate unique, viable product concepts"
                />
                <FeatureCard
                  icon="Rocket"
                  title="Complete Blueprint"
                  description="Get stack recommendations, build tasks, and growth ideas"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800/50">
      <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
        {icon === "Zap" && <Zap className="h-6 w-6 text-purple-400" />}
        {icon === "Lightbulb" && (
          <Lightbulb className="h-6 w-6 text-purple-400" />
        )}
        {icon === "Rocket" && <Rocket className="h-6 w-6 text-purple-400" />}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
