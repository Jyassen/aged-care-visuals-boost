import SEO from "@/components/SEO";
import { AddressBlock, LaunchFrame } from "@/components/launch/LaunchLayout";
import { AREA, LAUNCH_PAGES, SERVICES } from "@/launch/brand";

const page = LAUNCH_PAGES[2];

export default function LaunchServices() {
  return (
    <LaunchFrame>
      <SEO title={page.title} description={page.description} canonical={`https://yourmedguy.com${page.path}`} />
      <div className="card" style={{ marginTop: 18 }}>
        <h2>Services</h2>
        <p className="muted">Serving {AREA}.</p>
        <div className="svcGrid" style={{ marginTop: 12 }}>
          {SERVICES.map((service) => (
            <div className="svc" key={service.title}>
              <div className="svcTitle">{service.title}</div>
              <div className="svcDesc">{service.body}</div>
            </div>
          ))}
        </div>
        <AddressBlock />
      </div>
    </LaunchFrame>
  );
}
