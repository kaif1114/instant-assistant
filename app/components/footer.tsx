import Link from "next/link";
import { Flame, Linkedin, Twitter, Youtube } from "lucide-react";

function Footer() {
 

  return (
    <footer className="w-full border-t border-gray-100 bg-white pt-16 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo Column */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-semibold">Instant Assistant</span>
            </Link>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-4">
            <h3 className="font-semibold mb-4">Instant Assistant</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="#videos"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  href="#guides"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#faqs"
                  className="text-gray-600 hover:text-gray-900"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#extension"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Chrome Extension
                </Link>
              </li>
              <li>
                <Link
                  href="#tutorials"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Software Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hello@instantassistant.ai"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact us: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link
              href="https://linkedin.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://twitter.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://youtube.com"
              className="text-gray-600 hover:text-gray-900"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
            <span>© 2024 - Instant Assistant</span>
            <div className="flex items-center space-x-4">
              <Link href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/privacy-policy`} className="hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/cookie-policy`} className="hover:text-gray-900">
                Cookie Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
