export default function ClientFitFilter() {
  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Is GenJecX Right For You?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Perfect Fit */}
          <div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Perfect Fit ✓
            </h3>
            <ul className="space-y-3">
              <li className="text-[#475569] flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  You have a complex problem that generic solutions cannot solve
                </span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>You are willing to invest time in problem understanding</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>You need proprietary intelligence, not a resold product</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>You understand that custom research takes time</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>You value depth and capability over quick deployments</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  You are looking for a long-term technical partnership
                </span>
              </li>
            </ul>
          </div>

          {/* Poor Fit */}
          <div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Poor Fit ✗
            </h3>
            <ul className="space-y-3">
              <li className="text-[#475569] flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>You need a solution deployed in 2-4 weeks</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>You want to minimize cost at any expense</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>You are looking for generic "AI solutions"</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>You do not have domain expertise on your team</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>You need an off-the-shelf product, not a system</span>
              </li>
              <li className="text-[#475569] flex gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>You are not committed to seeing the project through</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Be Honest:</span> If you
            see yourself in the "Poor Fit" column, we are probably not the right
            match. That is okay. There are other vendors who do rapid deployment
            well. We are built for the problems that require research, not speed.
          </p>
        </div>
      </div>
    </section>
  );
}