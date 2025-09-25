"use client";

import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import Loading from '../components/Loading';

export default function TermsOfService() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex max-w-screen-xl mx-auto mt-16 px-4 py-10 text-secondary">
      {/* Left Sidebar */}
      <aside className="w-70 mr-10 hidden md:block sticky top-20 self-start">
        <div className="mb-8">
          {/* Maxy Branding */}
          <h4 className="text-3xl font-bold mb-6 text-primary">Terms of Service</h4>
          <p className="text-secondary"><strong>Effective from:</strong> September 24, 2025</p>
        </div>
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          <nav className="text-sm space-y-3 flex flex-col">
            <a href="#interpretation" className="block text-secondary hover:text-primary transition-colors">1. Interpretation and Definitions</a>
            <a href="#acknowledgment" className="block text-secondary hover:text-primary transition-colors">2. Acknowledgment</a>
            <a href="#external-links" className="block text-secondary hover:text-primary transition-colors">3. External Links</a>
            <a href="#user generated content" className="block text-secondary hover:text-primary transition-colors">4. User-Generated Content</a>
            <a href="#termination" className="block text-secondary hover:text-primary transition-colors">5. Termination</a>
            <a href="#limitation-liability" className="block text-secondary hover:text-primary transition-colors">6. Limitation of Liability</a>
            <a href="#disclaimer" className="block text-secondary hover:text-primary transition-colors">7. "AS IS" and "AS AVAILABLE" Disclaimer</a>
            <a href="#governing-law" className="block text-secondary hover:text-primary transition-colors">8. Governing Law</a>
            <a href="#dispute-resolution" className="block text-secondary hover:text-primary transition-colors">9. Dispute Resolution</a>
            {/* <a href="#international" className="block text-secondary hover:text-primary transition-colors">10. International Considerations</a>  */}
            <a href="#severability" className="block text-secondary hover:text-primary transition-colors">10. Severability and Waiver</a>
            <a href="#language" className="block text-secondary hover:text-primary transition-colors">11. Language</a>
            <a href="#updates to terms" className="block text-secondary hover:text-primary transition-colors">12. Updates to Terms</a>
            <a href="#contact us" className="block text-secondary hover:text-primary transition-colors">13. Contact Us</a>
          </nav>
        </div>
      </aside>

       {/* Main Content */}
      <div className="flex-1 space-y-6 mb-10 mt-2 md:mt-12 animate-slide-up">

        <div className="mb-8 block md:hidden">
          {/* Maxy Branding */}
          <h4 className="text-3xl font-bold mb-6 text-primary">Terms of Service</h4>
          <p className="text-secondary"><strong>Effective from:</strong> September 24, 2025</p>
        </div>

        <p className="text-secondary leading-relaxed">
          Welcome to Maxy. These Terms of Service (“Terms”) outline the rules and conditions for accessing and using the Maxy website, platforms, and all related services. By accessing or using any part of Maxy (“Maxy,” “we,” “our,” or “us”), you agree to comply with these Terms. If you disagree, you must not use our services.
        </p>

        <section id="interpretation" className="space-y-4">
          <h5 className="text-2xl   text-primary">1. Interpretation and Definitions</h5>
          <div className="space-y-4">
            <p className="text-secondary leading-relaxed">
              <strong className="text-primary">Interpretation</strong><br />
              Words with capitalized initials have defined meanings outlined below. These definitions apply whether they appear in singular or plural form.
            </p>
            <p className="text-secondary leading-relaxed">
              <strong className="text-primary">Definitions</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-secondary">
              <li><strong className="text-primary">Affiliate:</strong> Any entity under common control with Maxy.</li>
              <li><strong className="text-primary">Company:</strong> Refers to Maxy, headquartered in Hyderabad, Telangana, India.</li>
              <li><strong className="text-primary">Country:</strong> Telangana, India.</li>
              <li><strong className="text-primary">Device: </strong>Any internet-enabled device such as a smartphone, computer, or tablet.</li>
              <li><strong className="text-primary">Service:</strong> All Maxy-owned products, platforms, websites, and mobile applications.</li>
              <li><strong className="text-primary">Website:</strong> Refers to Maxy, accessible at <a href="https://maxy.co.in" className="text-blue-400"><strong>maxy.co.in</strong></a>.</li>
              <li><strong className="text-primary">Terms:</strong> These Terms of Service.</li>
              <li><strong className="text-primary">You:</strong> Any individual or legal entity accessing or using our Service.</li>
              <li><strong className="text-primary">Maxy ID:</strong> A universal identity that users must create to access any Maxy product or service.</li>
            </ul>
          </div>
        </section>

        <section id="acknowledgment" className="space-y-4">
          <h5 className="text-2xl   text-primary">2. Acknowledgment</h5>
          <div className="space-y-4">
            <p className="text-secondary leading-relaxed">
              By accessing or using any Maxy Service, you acknowledge and agree to these Terms and our Privacy Policy.
            </p>
            <p className="text-secondary leading-relaxed">
              Use of our services requires the creation of a Maxy ID, which includes providing your first name, last name, date of birth, gender, professional email, a chosen Maxy ID, and a secure password. This Maxy ID is required to access any product or platform under the Maxy ecosystem.
            </p>
            <p className="text-secondary leading-relaxed">
              If you are under the age of 13, you may only use our services with verifiable parental or legal guardian consent.
            </p>
            <p className="text-secondary leading-relaxed">
              During registration, users may optionally upload a profile picture. By uploading a profile picture, you agree to our use and display of it as described in Section 4.
            </p>
          </div>
        </section>

        <section id="external-links" className="space-y-4">
          <h5 className="text-2xl   text-primary">3. External Links</h5>
          <p className="text-secondary leading-relaxed">
            Our website does not currently link to any external or third-party websites. If in the future we include such links, we will make it clear, and you should review their respective policies before interacting with them.
          </p>
        </section>

        <section id="user generated content" className="space-y-4">
          <h5 className="text-2xl   text-primary">4. User-Generated Content</h5>
          <p className="text-secondary leading-relaxed">
            Certain Maxy platforms allow you to upload, submit, or display content, such as photos, ideas, or responses. By doing so, you grant Maxy a limited, non-exclusive, royalty-free license to use, display, and share that content within the platform for service delivery and promotional purposes. You retain ownership of your content and are solely responsible for its legality and accuracy.
          </p>
          <p className="text-secondary leading-relaxed">
            <strong>Profile Pictures:</strong> Any profile picture you upload is considered user-generated content. By uploading it, you grant Maxy a non-exclusive, royalty-free license to display it within the platform. You are responsible for ensuring your profile picture does not violate any laws, intellectual property rights, or community guidelines.
          </p>
        </section>


        <section id="termination" className="space-y-4">
          <h5 className="text-2xl   text-primary">5. Termination</h5>
          <p className="text-secondary leading-relaxed">
            We reserve the right to suspend or terminate your access to any or all parts of the Service, including Maxy ID, at our sole discretion and without notice if you violate these Terms or abuse our systems or community.
          </p>
        </section>

        <section id="limitation-liability" className="space-y-4">
          <h5 className="text-2xl   text-primary">6. Limitation of Liability</h5>
          <div className="space-y-4">
            <p className="text-secondary leading-relaxed">
              To the maximum extent permitted by law, Maxy and its affiliates are not liable for indirect, incidental, consequential, or special damages arising from your use or inability to use the Service. In any case, Maxy's total liability is limited to the greater of ₹2,000 or any amount paid by you to access the service (if any). Additionally, Maxy is not liable for any content uploaded, submitted, or shared by users on interactive areas of its platforms.
            </p>
          </div>
        </section>

        <section id="disclaimer" className="space-y-4">
          <h5 className="text-2xl   text-primary">7. "AS IS" and "AS AVAILABLE" Disclaimer</h5>
          <div className="space-y-4">
            <p className="text-secondary leading-relaxed">
              All services provided by Maxy are offered “AS IS” and “AS AVAILABLE.” We do not guarantee uninterrupted access, data accuracy, availability of any specific feature, or error-free services. All implied warranties, including those of merchantability and fitness for a particular purpose, are disclaimed.
            </p>
          </div>
        </section>

        <section id="governing-law" className="space-y-4">
          <h5 className="text-2xl   text-primary">8. Governing Law</h5>
          <p className="text-secondary leading-relaxed">
            These Terms are governed by the laws of Telangana, India, without regard to its conflict of law rules.
          </p>
        </section>

        <section id="dispute-resolution" className="space-y-4">
          <h5 className="text-2xl   text-primary">9. Dispute Resolution</h5>
          <p className="text-secondary leading-relaxed">
            We encourage users to contact us at <strong>support@maxy.co.in</strong> with any issues. We aim to resolve disputes informally. If not resolved, disputes shall be handled in the jurisdiction of Hyderabad, Telangana, India.
          </p>
        </section>

        {/* <section id="international" className="space-y-4">
          <h5 className="text-2xl   text-primary">10. International Considerations</h5>
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2 text-secondary">
            <li><strong className="text-primary">EU Residents:</strong>  You may have additional rights under local data protection and consumer laws.</li>
            <li><strong className="text-primary">US Users:</strong>  By using Maxy, you confirm you are not subject to any US government sanctions or restrictions..</li>
            </ul>
          </div>
        </section> */}

        <section id="severability" className="space-y-4">
          <h5 className="text-2xl   text-primary">10. Severability and Waiver</h5>
          <div className="space-y-4">
            <p className="text-secondary leading-relaxed">
              If any provision of these Terms is held invalid, the remaining provisions remain enforceable. Maxy's failure to enforce any right under these Terms does not constitute a waiver of future rights.
            </p>
          </div>
        </section>

        <section id="language" className="space-y-4">
          <h5 className="text-2xl   text-primary">11. Language</h5>
          <p className="text-secondary leading-relaxed">
            These Terms may be provided in multiple languages. If there is any inconsistency, the English version will prevail.
          </p>
        </section>

        <section id="updates to terms" className="space-y-4">
          <h5 className="text-2xl   text-primary">12. Updates to Terms</h5>
          <p className="text-secondary leading-relaxed">
            Maxy may update these Terms at any time. We will notify you of significant changes via email or in-app notices. It is your responsibility to periodically review these Terms. Continued use of Maxy services after updates constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section id="contact us" className="space-y-4">
          <h5 className="text-2xl text-primary">13. Contact Us</h5>
          <div className="space-y-2">
            <p className="text-secondary leading-relaxed">
              If you have questions or feedback about these Terms:
            </p>
            <div className="space-y-1">
              <p className="text-secondary"><strong className="text-primary">Email</strong>: support@maxy.co.in</p>
              <p className="text-secondary"><strong className="text-primary">Website</strong>: <a href="https://maxy.co.in" className="text-blue-400">maxy.co.in</a></p>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}