import styles from './privacyPolicy.module.css';

function PrivacyPolicy() {
  return (
    <main className={styles.privacyPolicy}>
      <h1>CompuTech Privacy Policy</h1>
      <p>
        Welcome to CompuTech, your trusted marketplace for PC and gaming
        accessories. We are committed to protecting your privacy and ensuring
        that your personal information is handled responsibly. This Privacy
        Policy outlines how we collect, use, and safeguard your information when
        you visit our website or make a purchase from CompuTech.
        <br />
        By accessing our website or using our services, you agree to the terms
        outlined in this Privacy Policy. Please take a moment to review this
        document carefully.
      </p>
      <ul>
        <li>
          <h4>Information We Collect</h4>
          <ol>
            <li>
              <b>Personal Information:</b> When you create an account or make a
              purchase, we collect personal information such as your name, email
              address, shipping address, and payment details.
            </li>
            <li>
              <b>Device Information:</b> We may collect information about the
              device you use to access our website, including IP address,
              browser type, and device identifiers.
            </li>
            <li>
              <b>Usage Information:</b> We gather information about how you
              navigate and interact with our website, including pages visited,
              time spent on the site, and the links clicked.
            </li>
          </ol>
        </li>

        <li>
          <h4>How We Use Your Information</h4>
          <ul>
            <li>
              <b>Order Processing:</b> We use your personal information to
              process and fulfill your orders, communicate order updates, and
              provide customer support.
            </li>
            <li>
              <b>Personalization:</b> To enhance your experience, we may use
              your information to personalize product recommendations,
              promotions, and content based on your preferences.
            </li>
            <li>
              <b>Communication:</b> We may send you promotional emails,
              newsletters, and important updates about our products and
              services. You can opt out of marketing communications at any time.
            </li>
            <li>
              <b>Analytics:</b> We analyze data to improve our website's
              functionality, optimize user experience, and enhance the
              effectiveness of our marketing efforts.
            </li>
          </ul>
        </li>

        <li>
          <h4>Information Sharing</h4>
          <ul>
            <li>
              <b>Third-Party Service Providers:</b> We may share your
              information with trusted third-party service providers for
              purposes such as payment processing, shipping, and customer
              support.
            </li>
            <li>
              <b>Legal Requirements:</b> We may disclose your information in
              response to legal requests or if required by law to protect our
              rights, privacy, safety, or property.
            </li>
          </ul>
        </li>

        <li>
          <h4>Data Security</h4>
          <p>
            We implement industry-standard security measures to protect your
            information from unauthorized access, disclosure, alteration, and
            destruction.
          </p>
        </li>

        <li>
          <h4>Your Choices</h4>
          <p>You have the right to: </p>
          <ul>
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of marketing communications.</li>
            <li>Choose cookie preferences.</li>
          </ul>
        </li>

        <li>
          <h4>Changes to this Privacy Policy</h4>
          <p>
            CompuTech reserves the right to update this Privacy Policy
            periodically. We will notify you of any significant changes through
            email or by prominently posting a notice on our website.
          </p>
        </li>
      </ul>
    </main>
  );
}

export default PrivacyPolicy;
