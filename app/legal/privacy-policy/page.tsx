import React from 'react';

const page = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 font-sans leading-relaxed">
      <a href="/" className="inline-block mb-6 text-blue-500">← Back</a>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for Instant Assistant</h1>
      <p className="italic mb-6">Effective Date: February 6th, 2025</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Instant Assistant. Instant Assistant (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) is operated by Mind Squared LLC, located at 30 N Gould St Ste 29330, Sheridan, WY 82801, USA. Our platform provides various digital assistant services.
      </p>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, safeguard, and disclose information obtained from your use of our platform.
      </p>
      <p className="mb-4">
        By accessing or using our services, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>SERVICE:</strong> The Instant Assistant platform operated by Mind Squared LLC.</li>
        <li><strong>PERSONAL DATA:</strong> Any information that identifies an individual.</li>
        <li><strong>USAGE DATA:</strong> Data collected automatically through service usage or infrastructure operations (e.g., page visit duration).</li>
        <li><strong>COOKIES:</strong> Small files stored on your device to enhance service functionality.</li>
        <li><strong>DATA CONTROLLER:</strong> The entity determining the purposes and methods of processing personal data. In this case, we act as the Data Controller.</li>
        <li><strong>DATA PROCESSORS (SERVICE PROVIDERS):</strong> Third parties processing data on behalf of the Data Controller.</li>
        <li><strong>DATA SUBJECT:</strong> An individual whose Personal Data is being processed.</li>
        <li><strong>USER:</strong> Any individual using our service.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Collection and Use</h2>
      <p className="mb-4">
        We collect various types of information to improve and provide our services effectively. We use Clerk for authentication and user management. For more details, see the <a href="https://clerk.com/legal/privacy" className="text-blue-500">Clerk Privacy Policy</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Types of Data Collected</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Personal Data:</strong> This includes your email address, name, and other identifiers you provide.</li>
        <li><strong>Usage Data:</strong> This includes browser types, pages visited, and interactions with the service.</li>
        <li><strong>Cookies and Tracking Data:</strong> We use cookies and tracking technologies to enhance user experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Use of Data</h2>
      <p className="mb-4">
        We use collected data for purposes such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Service improvements and maintenance</li>
        <li>Customer support</li>
        <li>Notifying users about service changes</li>
        <li>Analyzing service usage</li>
        <li>Fraud prevention and security monitoring</li>
        <li>Compliance with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Retention of Data</h2>
      <p className="mb-4">
        We retain Personal Data only as long as necessary for outlined purposes. Usage Data is stored for internal analysis, security enhancement, and service improvement.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Transfer of Data</h2>
      <p className="mb-4">
        Your information may be stored and processed outside your jurisdiction. We ensure adequate data protection measures in compliance with applicable laws.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclosure of Data</h2>
      <p className="mb-4">
        We may disclose your Personal Data:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To comply with legal obligations</li>
        <li>To enforce agreements</li>
        <li>To service providers supporting business operations</li>
        <li>With your consent in specific cases</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Security of Data</h2>
      <p className="mb-4">
        We take appropriate security measures to protect your data but acknowledge that no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. GDPR Data Protection Rights</h2>
      <p className="mb-4">
        For users in the EU/EEA, GDPR grants rights including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Access, correction, deletion, or restriction of your data</li>
        <li>Data portability requests</li>
        <li>Objection to data processing</li>
        <li>Withdrawal of consent</li>
      </ul>
      <p className="mb-4">
        To exercise these rights, contact us at {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. CalOPPA Compliance</h2>
      <p className="mb-4">
        As per California Online Privacy Protection Act (CalOPPA), we:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Allow anonymous site visits</li>
        <li>Clearly state data collection policies</li>
        <li>Notify users of policy changes</li>
        <li>Provide methods to modify personal information</li>
      </ul>
      <p className="mb-4">
        We honor &quot;Do Not Track&quot; browser signals.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. CCPA Data Protection Rights</h2>
      <p className="mb-4">
        If you are a California resident, under the California Consumer Privacy Act (CCPA), you can request:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Details of collected personal information</li>
        <li>Deletion of personal data</li>
        <li>Information on data sales (we do not sell personal data)</li>
      </ul>
      <p className="mb-4">
        To exercise these rights, contact us at {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">13. Service Providers</h2>
      <p className="mb-4">
        We use third-party providers for service facilitation, analytics, and support. These providers access Personal Data only to perform tasks on our behalf.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">14. Analytics</h2>
      <p className="mb-4">
        We use analytics services such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Google Analytics:</strong> Tracks site usage and traffic. More details: <a href="https://policies.google.com/privacy?hl=en-US" className="text-blue-500">Google Privacy Policy</a>.</li>
        <li><strong>Vercel Analytics:</strong> Privacy-focused analytics. More details: <a href="https://vercel.com/legal/privacy-policy" className="text-blue-500">Vercel Privacy Policy</a>.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">15. CI/CD Tools</h2>
      <p className="mb-4">
        We may use CI/CD services such as GitHub Actions for automated development processes. Details: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="text-blue-500">GitHub Privacy Policy</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">16. Payments</h2>
      <p className="mb-4">
        We use third-party payment processors like <strong>Stripe</strong> for transactions. Your payment details are handled securely per PCI-DSS compliance. More details: <a href="https://stripe.com/privacy" className="text-blue-500">Stripe Privacy Policy</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">17. Links to Third-Party Sites</h2>
      <p className="mb-4">
        Our service may contain links to external sites. We are not responsible for their content or privacy practices.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">18. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this policy periodically. Changes take effect immediately upon posting. We recommend reviewing this page regularly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">19. Contact Us</h2>
      <p className="mb-4">
        For any questions regarding this Privacy Policy, contact us at {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}.
      </p>
    </div>
  );
}

export default page;
