"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, RefreshCw, Users } from "lucide-react";

export default function DashboardCards() {
  return (
    <div className="p-6 min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900/90 to-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - 4 cards */}
        <div className="space-y-6">
          {/* Blazing Fast Ingestion Card */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Unlock the Power of Diverse Data
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Easily train your AI assistant using a variety of data sources,
                including PDF, DOCX, TXT files, or even websites. Our platform
                enables instant integration of data so your assistant can
                respond intelligently to your customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Database className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="relative h-24">
                <div className="absolute bottom-0 left-0 right-0">
                  <svg
                    viewBox="0 0 200 40"
                    className="w-full h-24 text-blue-500/20"
                  >
                    <path
                      d="M0 40 C 40 20, 60 30, 100 10 C 140 -10, 160 20, 200 0 L 200 40 L 0 40"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SQL Pipes Card */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                AI that Delivers Precision
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Say goodbye to generic, unreliable responses. Our assistant
                provides highly accurate answers by learning from the data you
                provide, ensuring your customers always get the best
                information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900/50 p-4 rounded-lg text-sm font-mono">
                <code>
                  <span className="text-purple-400">SELECT</span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-300">date,</span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-300">pipe_name,</span>
                  {"\n"}
                  {"  "}
                  <span className="text-blue-400">sum</span>
                  <span className="text-slate-300">
                    (view_count) view_count,
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-300">
                    avgMerge(avg_duration_state) avg_duration_state,
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-300">quantilesTimingMerge(</span>
                  <span className="text-green-400">0.9</span>
                  <span className="text-slate-300">, </span>
                  <span className="text-green-400">0.95</span>
                  <span className="text-slate-300">, </span>
                  <span className="text-green-400">0.99</span>
                  <span className="text-slate-300">)</span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-300">
                    (quantile_timing_state) quantile_timing_state
                  </span>
                  {"\n"}
                  <span className="text-purple-400">FROM</span>
                  <span className="text-pink-400"> tinybird.pipe_stats</span>
                  {"\n"}
                  <span className="text-purple-400">GROUP BY</span>{" "}
                  <span className="text-slate-300">date, pipe_name</span>
                </code>
              </pre>
            </CardContent>
          </Card>

          {/* Tokens Card */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Make Your Assistant Your Own
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                With easy-to-use customization options, tailor the look and feel
                of your AI assistant to match your brand. From appearance to
                tone of voice, you have full control over the experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <code className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                      rw
                    </code>
                    <span className="text-sm">admin you@tinybird.co</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <code className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                      rw
                    </code>
                    <span className="text-sm">CLI telemetry</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <code className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                      rw
                    </code>
                    <span className="text-sm">admin token</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personalized Conversations Card */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Personalized Conversations & Lead Generation
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Gather user data to enable personalized conversations, improving
                user engagement while generating valuable leads for your
                business through targeted interactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-slate-400">
                      User Engagement
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                    <span className="text-sm text-slate-400">
                      Lead Generation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                    <span className="text-sm text-slate-400">
                      Personalization
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 4 cards */}
        <div className="space-y-6">
          {/* API Endpoints Card */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Create Your Assistant in Minutes
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                No more waiting days or weeks. With Instant Assistant, simply
                provide your assistant&apos;s details, customize its appearance,
                and upload your data to create your own AI chatbot in a matter
                of minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">REQUESTS</span>
                    <span className="text-white">18.8 KB</span>
                  </div>
                  <div className="h-8 bg-slate-800/50 rounded-lg overflow-hidden">
                    <div className="h-full w-full bg-[url('/graph.svg')] bg-contain" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">AVG. PROCESSED DATA</span>
                    <span className="text-white">18.8 KB</span>
                  </div>
                  <div className="h-8 bg-slate-800/50 rounded-lg overflow-hidden">
                    <div className="h-full w-full bg-[url('/graph.svg')] bg-contain" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">AVG. DURATION</span>
                    <span className="text-white">150.00ms</span>
                  </div>
                  <div className="h-8 bg-slate-800/50 rounded-lg overflow-hidden">
                    <div className="h-full w-full bg-[url('/graph.svg')] bg-contain" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Branching Card */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-white">
                  Effortless Interactions, Faster Solutions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">
                    Your customers will never have to wait. The Instant
                    Assistant AI responds instantly, improving the user
                    experience and ensuring that your customers&apos; questions
                    are answered on time, every time.
                  </span>
                  <span className="text-green-400">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CI/CD Card */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Data Security Guaranteed
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Your Data, Always Safe We take data security seriously. Rest
                assured that your information and customer data are protected
                with state-of-the-art encryption and security protocols,
                allowing you to focus on delivering value to your customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <code>
                  <span className="text-blue-400">&lt;script&gt;</span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-300">(</span>
                  <span className="text-purple-400">function</span>
                  <span className="text-slate-300">(d,t) {"{"} </span>
                  {"\n"}
                  {"    "}
                  <span className="text-slate-300">window.</span>
                  <span className="text-green-400">chatwithSettings</span>
                  <span className="text-white">=</span>
                  <span className="text-slate-300">{"{"}</span>
                  {"\n"}
                  {"      "}
                  <span className="text-green-400">baseUrl</span>
                  <span className="text-white">:</span>
                  <span className="text-orange-400">BASE_URL</span>
                  <span className="text-slate-300">,</span>
                  {"\n"}
                  {"      "}
                  <span className="text-green-400">chatbotId</span>
                  <span className="text-white">:</span>
                  <span className="text-orange-400">
                    &quot;YOUR_CHATBOT_ID&quot;
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="text-slate-300">{"}"}</span>
                  <span className="text-slate-300">;</span>
                  {"\n"}
                  {"    "}
                  <span className="text-slate-300">window.</span>
                  <span className="text-green-400">chatwithSDK</span>
                  <span className="text-slate-300">.</span>
                  <span className="text-blue-400">run</span>
                  <span className="text-slate-300">
                    (window.chatwithSettings);
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="text-slate-300">{"}"}</span>
                  <span className="text-slate-300">)</span>
                  <span className="text-slate-300">
                    (document,&quot;script&quot;);
                  </span>
                  {"\n"}
                  <span className="text-blue-400">&lt;/script&gt;</span>
                </code>
              </pre>
            </CardContent>
          </Card>

          {/* Move Retrain Assistant Card to right column */}
          <Card className="relative bg-slate-900/30 border border-slate-600/30 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                Retrain Your Assistant with the Latest Data
              </CardTitle>
              <CardDescription className="text-slate-400 text-base">
                Keep your AI assistant up-to-date by automatically retraining it
                with the latest data, ensuring it provides the most relevant and
                accurate responses based on current information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="p-3 rounded-full bg-cyan-500/10">
                  <RefreshCw className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="relative h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse delay-100"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse delay-200"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                  <svg
                    viewBox="0 0 200 40"
                    className="w-full h-24 text-cyan-500/20"
                  >
                    <path
                      d="M0 40 C 40 20, 60 30, 100 10 C 140 -10, 160 20, 200 0 L 200 40 L 0 40"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
