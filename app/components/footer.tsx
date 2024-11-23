import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Linkedin, MessageSquare } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="container flex flex-col md:flex-row items-center mx-auto  max-w-7xl justify-between py-8 px-4 md:px-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🤖</span>
          </Link>
          <span className="text-sm text-gray-600">
            © A product by Instant Assistant - All rights reserved.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center space-x-4">
          <Link
            href="/status"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Status
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <Link
              href="https://twitter.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://discord.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-xs text-gray-600">Backed by</span>
              <Image
                src="/placeholder.svg"
                alt="Y Combinator"
                width={20}
                height={20}
                className="ml-1"
              />
            </div>
            <Image
              src="/placeholder.svg"
              alt="SOC2 Type 2 Certified"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
