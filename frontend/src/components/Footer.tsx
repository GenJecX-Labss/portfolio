import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAFAFA] border-top">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">GenJecX</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Building proprietary AI systems and custom neural models for organizations requiring intelligence beyond off-the-shelf solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-4">Product</h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/NeuralStudio"
                className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Neural Studio
              </Link>
              <Link
                href="/Research&Models"
                className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Research & Models
              </Link>
              <Link
                href="/CaseStudies"
                className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Case Studies
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/Procees&Pricing"
                className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Process & Pricing
              </Link>
              <Link
                href="/Founders"
                className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Founders
              </Link>
              <Link
                href="/ArchitectureAudit"
                className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Architecture Audit
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:genjecx@gmail.com"
                className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                genjecx@gmail.com
              </a>
              <p className="text-sm text-[#475569]">
                Ajmer, Rajasthan<br />
                India
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-top mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-[#475569] mb-4 md:mb-0">
            © {currentYear} GenJecX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:genjecx@gmail.com"
              className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}