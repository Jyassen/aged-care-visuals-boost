const LegalContact = () => (
  <div className="rounded-lg border bg-muted/40 p-6 not-prose">
    <p className="font-semibold mb-2">Yassco Consulting Group LLC</p>
    <p>Attn: Privacy Officer</p>
    <p>418 Broadway #5452</p>
    <p>Albany NY 12207</p>
    <p>
      Email:{" "}
      <a href="mailto:info@yasscogroup.com" className="text-primary hover:underline">
        info@yasscogroup.com
      </a>
    </p>
    <p>
      Phone:{" "}
      <a href="tel:347-305-2263" className="text-primary hover:underline">
        347-305-2263
      </a>
    </p>
  </div>
);

export default LegalContact;
