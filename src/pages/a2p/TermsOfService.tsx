import { Link } from "react-router-dom";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

/**
 * A2P Terms of Service for YourMedGuy.
 * Replicates the Yassco Consulting Group LLC Nebula Terms of Service verbatim,
 * except the display name is changed to YourMedGuy. Yassco Consulting Group
 * LLC is retained as the legal business name: YourMedGuy is a subsidiary
 * of Yassco Consulting Group LLC. Contact details and the effective date
 * are kept exactly as on the source site.
 */
const TermsOfService = () => (
  <LegalPageLayout
    title="Terms of Service"
    description="Terms of Service for YourMedGuy, a subsidiary of Yassco Consulting Group LLC, including SMS messaging terms and compliance."
    canonicalPath="/a2p/terms"
    backTo="/a2p"
    backLabel="Back to Request Information"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Terms of Service — YourMedGuy</h1>
      <p className="text-muted-foreground">Effective Date: 10/12/2025</p>
      <p className="text-muted-foreground">
        YourMedGuy is a subsidiary of Yassco Consulting Group LLC, the legal business name.
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">SMS Messaging Terms &amp; Compliance</h2>
      <p>
        <strong>1. Program Description:</strong> This messaging program sends appointment confirmation and reminder
        messages to customers who have booked an appointment with YourMedGuy through our website, or via our scheduling
        forms, and have explicitly opted in to receive SMS notifications. Opt-in is collected via web forms with a
        dedicated checkbox for SMS consent. Messages include scheduling confirmations, appointment reminders,
        rescheduling updates, and customer support communications.
      </p>
      <p>
        <strong>2. Cancellation Instructions:</strong> You can cancel the SMS service at any time. Simply text
        &quot;STOP&quot; to the same number that sent you messages. Upon sending &quot;STOP,&quot; we will confirm your
        unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To
        rejoin, sign up as you did initially, and we will resume sending SMS messages to you.
      </p>
      <p>
        <strong>3. Support Information:</strong> If you experience issues with the messaging program, reply with the
        keyword &quot;HELP&quot; for more assistance, or reach out directly to{" "}
        <a href="mailto:team@yasscoconsultinggroupllc.nebulabrandgroup.com" className="text-primary hover:underline">
          team@yasscoconsultinggroupllc.nebulabrandgroup.com
        </a>{" "}
        or call (917) 703-8352 during business hours.
      </p>
      <p>
        <strong>4. Carrier Liability:</strong> Carriers are not liable for delayed or undelivered messages.
      </p>
      <p>
        <strong>5. Message &amp; Data Rates:</strong> Message and data rates may apply for messages sent to you from us
        and to us from you. Message frequency varies based on your service usage and appointment schedule. For questions
        about your text plan or data plan, contact your wireless provider.
      </p>
      <p>
        <strong>6. Supported Carriers:</strong> Our SMS program works with all major U.S. wireless carriers, including
        AT&amp;T, T-Mobile, Verizon, Sprint, and most regional carriers.
      </p>
      <p>
        <strong>7. Age Restriction:</strong> You must be 18 years or older to participate in our SMS program.
      </p>
      <p>
        <strong>8. Privacy Policy:</strong> For privacy-related inquiries, please refer to our{" "}
        <Link to="/a2p/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
      </p>
      <p>
        We comply with all applicable laws and regulations, including the Telephone Consumer Protection Act (TCPA) and
        CTIA guidelines, regarding the use of SMS communications.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">General Terms</h2>
      <p>
        This website (the &quot;Site&quot;) is owned and operated by YourMedGuy, a subsidiary of Yassco Consulting Group
        LLC (&quot;COMPANY,&quot; &quot;we&quot; or &quot;us&quot;). By using the Site, you agree to be bound by these
        Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy Policy, and any
        additional terms and conditions that may apply to specific sections of the Site or to products and services
        available through the Site or from YourMedGuy.
      </p>
      <p>
        Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement
        to be bound by these Terms of Service.
      </p>
      <p>
        We reserve the right to change these Terms of Service or to impose new conditions on the use of the Site from
        time to time, in which case we will post the revised Terms of Service on this website. By continuing to use the
        Site after we post any such changes, you accept the Terms of Service, as modified.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Intellectual Property Rights</h2>
      <h3 className="text-xl font-semibold">Our Limited License to You</h3>
      <p>
        This Site and all the materials available on the Site are the property of YourMedGuy, a subsidiary of Yassco
        Consulting Group LLC and/or our affiliates or licensors and are protected by copyright, trademark, and other
        intellectual property laws. The Site is provided solely for your personal non-commercial use.
      </p>
      <p>
        You may not use the Site or the materials available on the Site in a manner that constitutes an infringement of
        our rights or that has not been authorized by us.
      </p>
      <p>
        Unless explicitly authorized, you may not modify, copy, reproduce, republish, upload, post, transmit, translate,
        sell, create derivative works, exploit, or distribute in any manner or medium any material from the Site.
        However, you may download and/or print one copy of individual pages for your personal, non-commercial use,
        provided that you keep intact all copyright and other proprietary notices.
      </p>
      <h3 className="text-xl font-semibold">Your License to Us</h3>
      <p>
        By posting or submitting any material (including comments, blog entries, social media posts, photos, and videos)
        to us via the Site, internet groups, or other digital venues, you represent that you own the material or have
        obtained the necessary permissions. You grant us a royalty-free, perpetual, irrevocable, non-exclusive, worldwide
        license to use, modify, transmit, sell, exploit, create derivative works from, distribute, and publicly perform
        or display such material.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Disclaimers</h2>
      <p>
        Throughout the Site, we may provide links and pointers to Internet sites maintained by third parties. Our
        linking to such third-party sites does not imply an endorsement or sponsorship of such sites or the information,
        products, or services offered on or through the sites.
      </p>
      <p>
        The information, products, and services offered on or through the Site are provided &quot;as is&quot; and without
        warranties of any kind, either express or implied. To the fullest extent permissible pursuant to applicable law,
        we disclaim all warranties, including implied warranties of merchantability and fitness for a particular
        purpose.
      </p>
      <p>
        <strong>Indemnification</strong>
      </p>
      <p>
        You agree at all times to indemnify and hold harmless YourMedGuy, a subsidiary of Yassco Consulting Group LLC,
        its affiliates, and their respective officers, directors, agents, and employees from any claims, causes of action,
        damages, liabilities, costs, and expenses arising out of or related to your breach of any obligation, warranty,
        or representation under these Terms of Service.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Online Commerce</h2>
      <p>
        Certain sections of the Site may allow you to purchase products and services from third-party vendors. We are
        not responsible for the quality, accuracy, timeliness, reliability, or any other aspect of these products and
        services. If you make a purchase from a third party linked through the Site, the information obtained during your
        visit, including payment information, may be collected by both the merchant and us.
      </p>
      <p>
        Your participation in any dealings with third-party vendors is solely between you and the third party.
        YourMedGuy shall not be responsible for any loss or damage incurred as a result of such dealings.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Registration &amp; Passwords</h2>
      <p>
        To access certain features of the Site, you may be required to register and create an account. You agree to
        provide accurate, current, and complete information during the registration process. You are responsible for
        maintaining the confidentiality of your login credentials and for all activities conducted under your account.
      </p>
      <p>
        If you suspect unauthorized use of your account, notify us immediately at{" "}
        <a href="mailto:team@yasscoconsultinggroupllc.nebulabrandgroup.com" className="text-primary hover:underline">
          team@yasscoconsultinggroupllc.nebulabrandgroup.com
        </a>
        . We are not liable for any loss or damage arising from your failure to comply with this obligation.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Termination</h2>
      <p>
        We reserve the right to terminate or suspend your access to the Site, without notice, if we determine that you
        have violated these Terms of Service or engaged in conduct that we deem inappropriate or unlawful. Upon
        termination, you must cease all use of the Site and any content obtained from it.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Governing Law</h2>
      <p>
        These Terms of Service shall be governed by and construed in accordance with the laws of the state in which
        Yassco Consulting Group LLC operates. Any dispute arising under these Terms shall be resolved exclusively through
        binding arbitration in that jurisdiction.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Changes to Terms of Service</h2>
      <p>
        We may update these Terms of Service from time to time. The latest version will always be available on our
        website with the effective date.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <p>
        For any questions regarding these Terms of Service, please contact us at:{" "}
        <strong>YourMedGuy, a subsidiary of Yassco Consulting Group LLC</strong>
      </p>
      <p>Phone: (917) 703-8352</p>
      <p>
        Email:{" "}
        <a href="mailto:team@yasscoconsultinggroupllc.nebulabrandgroup.com" className="text-primary hover:underline">
          team@yasscoconsultinggroupllc.nebulabrandgroup.com
        </a>
      </p>
      <p>By using our website and services, you consent to these Terms of Service.</p>
      <p>© YourMedGuy, a subsidiary of Yassco Consulting Group LLC</p>
    </section>
  </LegalPageLayout>
);

export default TermsOfService;
