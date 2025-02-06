import React from 'react';

const page = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 font-sans leading-relaxed">
      <a href="/" className="inline-block mb-6 text-blue-500">← Back</a>
      <h1 className="text-3xl font-bold mb-4">Terms of Service for Instant Assistant</h1>
      <p className="italic mb-6">Last Updated: February 6th, 2025</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
      <p className="mb-4">
        These Terms of Service ("Terms") govern your use of Instant Assistant ("Service") operated by Mind Squared LLC ("Company", "we", "our", "us"), located at 30 N Gould St Ste 29330, Sheridan, WY 82801, USA.
      </p>
      <p className="mb-4">
        By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Service Description</h2>
      <p className="mb-4">
        Instant Assistant is a platform that enables users to create and deploy AI-powered chat assistants. Users can train these assistants using their own data and integrate them into their websites or share them with others.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
      <p className="mb-4">
        To use our Service, you must:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Be at least 18 years old</li>
        <li>Register for an account with valid information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Promptly notify us of any security breaches</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Responsibilities</h2>
      <p className="mb-4">
        When using our Service, you agree to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Provide only data you have rights to use</li>
        <li>Not use the Service for illegal or unauthorized purposes</li>
        <li>Not attempt to harm or disrupt the Service</li>
        <li>Comply with all applicable laws and regulations</li>
        <li>Not create assistants that promote harmful or inappropriate content</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Usage and Rights</h2>
      <p className="mb-4">
        By using our Service:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>You retain rights to your uploaded content</li>
        <li>You grant us license to use your data to provide the Service</li>
        <li>You ensure your data doesn't violate any third-party rights</li>
        <li>We may analyze usage patterns to improve the Service</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Service Limitations</h2>
      <p className="mb-4">
        While we strive for high quality service:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>We don't guarantee 100% accuracy in AI responses</li>
        <li>Service availability may vary</li>
        <li>We reserve the right to modify or discontinue features</li>
        <li>Performance may depend on various factors beyond our control</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Pricing and Payments</h2>
      <p className="mb-4">
        Our pricing structure includes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Various subscription tiers with different features</li>
        <li>Usage-based billing for certain services</li>
        <li>Automatic renewal unless cancelled</li>
        <li>No refunds for partial month usage</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Intellectual Property</h2>
      <p className="mb-4">
        The Service, including its original content, features, and functionality, is owned by Mind Squared LLC and protected by international copyright, trademark, and other intellectual property laws.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your account and access to the Service:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>For violations of these Terms</li>
        <li>For illegal or unauthorized use</li>
        <li>At our sole discretion with or without notice</li>
        <li>Upon your request</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or Service notification.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by the laws of Wyoming, United States, without regard to its conflict of law provisions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Information</h2>
      <p className="mb-4">
        For questions about these Terms, please contact us at {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}.
      </p>
    </div>
  );
}

export default page;
