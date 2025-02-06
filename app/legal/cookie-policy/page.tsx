import React from 'react';

const page = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 font-sans leading-relaxed">
      <a href="/" className="inline-block mb-6 text-blue-500">← Back</a>
      <h1 className="text-3xl font-bold mb-4">Cookie Policy for Instant Assistant</h1>
      <p className="italic mb-6">Effective Date: February 6th, 2025</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">What is a Cookie</h2>
      <p className="mb-4">
        Cookies are files with a small amount of data which may include an anonymous unique identifier. They are sent to your browser from a website and stored on your device.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How Instant Assistant Uses Cookies</h2>
      <p className="mb-4">
        Instant Assistant uses cookies and similar technologies like local storage to track activity on our service and hold certain information.
      </p>
      <p className="mb-4">
        We distinguish between two different types of cookies:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Essential:</strong> Cookies that are strictly necessary for basic website or app functionality.</li>
        <li><strong>Marketing:</strong> Cookies that are used to identify users and collect information about their behavior.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">The Cookies We Set</h2>
      <p className="mb-4">
        We use cookies provided by Clerk when you are logged in so that we can maintain your logged-in state. This prevents you from having to log in every single time you visit a new page. These cookies are removed or invalidated when you log out to ensure that users can only access certain features when logged in.
      </p>
      <p className="mb-4">
        For more information, see the official <a href="https://clerk.com/legal/privacy" className="text-blue-500">Clerk Privacy Policy</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Third Party Cookies</h2>
      <p className="mb-4">
        We use third-party payment services provided by Stripe to process payments and prevent fraud.
      </p>
      <p className="mb-4">
        For more information, see the official <a href="https://stripe.com/privacy" className="text-blue-500">Stripe Cookie Policy</a>.
      </p>
    </div>
  );
}

export default page;
