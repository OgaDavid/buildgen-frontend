"use client"

import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Share2,
  ArrowLeft,
  Code,
  BarChart,
  Database,
  Globe,
  FileText,
  DollarSign,
  TrendingUp,
  Lightbulb,
  Heart,
  Cpu,
  Video,
  Utensils,
  Package,
  BookOpen,
  Box,
} from "lucide-react"
import { useRouter } from "next/navigation" 
import Link from "next/link"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { formDataAtom, isLoadingAtom, productIdeaAtom, generateProductIdeaAtom, activeTabAtom, resetFormAtom } from "@/lib/store"

// Dynamically import Mermaid component with SSR disabled
const MermaidChart = dynamic(() => import("@/components/mermaid-chart"), { ssr: false })

// Icon mapping for dynamic icon selection
const IconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="h-6 w-6 text-purple-400" />,
  Heart: <Heart className="h-6 w-6 text-purple-400" />,
  Cpu: <Cpu className="h-6 w-6 text-purple-400" />,
  Video: <Video className="h-6 w-6 text-purple-400" />,
  Utensils: <Utensils className="h-6 w-6 text-purple-400" />,
  Package: <Package className="h-6 w-6 text-purple-400" />,
  BookOpen: <BookOpen className="h-6 w-6 text-purple-400" />,
  DollarSign: <DollarSign className="h-6 w-6 text-purple-400" />,
  Box: <Box className="h-6 w-6 text-purple-400" />,
}

export default function Results() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [formData] = useAtom(formDataAtom)
  const [productIdea] = useAtom(productIdeaAtom)
  const [, generateProductIdea] = useAtom(generateProductIdeaAtom)
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const [isTabLoading, setIsTabLoading] = useState(false)
  const [, resetForm] = useAtom(resetFormAtom)
  const router = useRouter()

  // Handle tab change with loading indicator
  const handleTabChange = (value: string) => {
    setIsTabLoading(true)
    setActiveTab(value)
    
    // Simulate loading time (between 800-1500ms)
    setTimeout(() => {
      setIsTabLoading(false)
    }, Math.floor(Math.random() * 700) + 800)
  }

  // Handle back to generator with form reset
  const handleBackToGenerator = () => {
    resetForm()
    router.push("/generator")
  }

  useEffect(() => {
    // If there's no product idea yet, generate one based on form data
    if (!productIdea && formData.space && formData.vibe && formData.time) {
      generateProductIdea()
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [setIsLoading, productIdea, formData, generateProductIdea])

  if (isLoading || !productIdea) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl text-white font-medium">Generating your product idea...</h2>
          <p className="text-gray-400 mt-2">
            Analyzing {formData.space} + {formData.vibe} + {formData.time}
          </p>
        </div>
      </div>
    )
  }

  // Tab content loading indicator component
  const TabLoading = () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-400">Loading data...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-950 text-white pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              className="bg-gray-900 border-gray-800 hover:bg-gray-800"
              onClick={handleBackToGenerator}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Generator
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-gray-900 border-gray-800 hover:bg-gray-800">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  {IconMap[productIdea.icon] || <Box className="h-6 w-6 text-purple-400" />}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{productIdea.name}</h1>
                  <p className="text-gray-400 italic">"{productIdea.tagline}"</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-purple-600">{formData.space}</Badge>
                <Badge className="bg-blue-600">{formData.vibe}</Badge>
                <Badge className="bg-green-600">{formData.time}</Badge>
              </div>

              <p className="text-gray-300 text-lg">{productIdea.description}</p>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 bg-gray-900 border-gray-800 p-0 mb-8">
              <TabsTrigger value="stack" className="data-[state=active]:bg-gray-800">
                <Code className="h-4 w-4 mr-2" /> Stack
              </TabsTrigger>
              <TabsTrigger value="flow" className="data-[state=active]:bg-gray-800">
                <BarChart className="h-4 w-4 mr-2" /> Flow
              </TabsTrigger>
              <TabsTrigger value="erd" className="data-[state=active]:bg-gray-800">
                <Database className="h-4 w-4 mr-2" /> ERD
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-gray-800">
                <FileText className="h-4 w-4 mr-2" /> Tasks
              </TabsTrigger>
              <TabsTrigger value="competitors" className="data-[state=active]:bg-gray-800">
                <TrendingUp className="h-4 w-4 mr-2" /> Competitors
              </TabsTrigger>
              <TabsTrigger value="domains" className="data-[state=active]:bg-gray-800">
                <Globe className="h-4 w-4 mr-2" /> Domains
              </TabsTrigger>
              <TabsTrigger value="legal" className="data-[state=active]:bg-gray-800">
                <FileText className="h-4 w-4 mr-2" /> Legal
              </TabsTrigger>
              <TabsTrigger value="monetization" className="data-[state=active]:bg-gray-800">
                <DollarSign className="h-4 w-4 mr-2" /> Monetization
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stack">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "stack" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">🛠️ Stack Recommendation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StackItem title="Frontend" value={productIdea.stack.frontend} />
                        <StackItem title="Backend" value={productIdea.stack.backend} />
                        <StackItem title="Auth" value={productIdea.stack.auth} />
                        {productIdea.stack.ai && <StackItem title="AI" value={productIdea.stack.ai} />}
                        <StackItem title="Deployment" value={productIdea.stack.deployment} />
                        {productIdea.stack.other && <StackItem title="Other" value={productIdea.stack.other} />}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flow">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "flow" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">🧠 Flow Diagram</h2>
                      <div className="bg-gray-800 p-4 rounded-lg overflow-auto">
                        <MermaidChart chart={productIdea.flowDiagram} />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="erd">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "erd" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">🧾 ERD</h2>
                      <div className="bg-gray-800 p-4 rounded-lg overflow-auto">
                        <MermaidChart chart={productIdea.erdDiagram} />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "tasks" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">✅ Build Tasks</h2>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-800 hover:bg-gray-800/50">
                            <TableHead className="text-gray-300">Task</TableHead>
                            <TableHead className="text-gray-300">Tool</TableHead>
                            <TableHead className="text-gray-300">Est. Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {productIdea.tasks.map((task, index) => (
                            <TableRow key={index} className="border-gray-800 hover:bg-gray-800/50">
                              <TableCell>{task.name}</TableCell>
                              <TableCell>{task.tool}</TableCell>
                              <TableCell>{task.time}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "competitors" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">🕵️‍♂️ Competitor Snapshot</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {productIdea.competitors.map((competitor, index) => (
                          <CompetitorCard key={index} name={competitor} />
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="domains">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "domains" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">🌐 Domain Availability</h2>
                      <div className="space-y-4">
                        {productIdea.domains.map((domain, index) => (
                          <DomainItem key={index} domain={domain.name} available={domain.available} />
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "legal" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">🧾 Legal / Infra Checklist</h2>
                      <div className="space-y-3">
                        {productIdea.legal.map((item, index) => (
                          <ChecklistItem key={index} label={item} />
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monetization">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {isTabLoading && activeTab === "monetization" ? (
                    <TabLoading />
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">💸 Monetization Ideas</h2>
                      <div className="space-y-3">
                        {productIdea.monetization.map((item, index) => (
                          <MonetizationItem key={index} text={item} />
                        ))}
                      </div>

                      <h2 className="text-xl font-bold mt-8 mb-4">🚀 Growth Experiments</h2>
                      <div className="space-y-3">
                        {productIdea.growth.map((item, index) => (
                          <GrowthItem key={index} text={item} />
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

function StackItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-white font-medium">{value}</p>
    </div>
  )
}

function CompetitorCard({ name }: { name: string }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
      <div className="h-10 w-10 rounded bg-gray-700 flex items-center justify-center">
        <span className="text-lg font-bold">{name.charAt(0)}</span>
      </div>
      <span className="font-medium">{name}</span>
    </div>
  )
}

function DomainItem({ domain, available }: { domain: string; available: boolean }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
      <span className="font-mono">{domain}</span>
      <Badge className={available ? "bg-green-600" : "bg-red-600"}>
        {available ? "✅ Available" : "❌ Taken"}
      </Badge>
    </div>
  )
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} defaultChecked />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

function MonetizationItem({ text }: { text: string }) {
  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <p>{text}</p>
    </div>
  )
}

function GrowthItem({ text }: { text: string }) {
  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <p>{text}</p>
    </div>
  )
}
