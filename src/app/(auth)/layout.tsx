import { Package } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 text-white">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Procuro</span>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Intelligent Procurement,{" "}
            <span className="text-blue-200">Automated.</span>
          </h2>
          <p className="max-w-md text-lg text-blue-100">
            Let AI agents handle supplier discovery, quote comparison, and
            procurement optimization while you focus on strategic decisions.
          </p>
          <div className="space-y-3">
            {[
              "AI-powered supplier research",
              "Automated quote comparison",
              "Smart approval workflows",
              "Real-time procurement tracking",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-blue-200">
          &copy; {new Date().getFullYear()} Procuro. All rights reserved.
        </p>
      </div>

      {/* Right side - auth form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
