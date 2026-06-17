export default function HeroSection() {
  return (
    <section className="bg-[#f7f7f4] pb-9 pt-24 md:pb-12 md:pt-28">
      <div className="mx-auto max-w-[980px] px-6">
        <div className="mx-auto max-w-[760px]">
          <h1 className="text-center text-[48px] font-light leading-[0.95] text-black md:text-[66px]">
            Stories from
            <br />
            the Sea
          </h1>

          <div className="mx-auto mt-8 max-w-[680px] space-y-5 text-[16px] leading-relaxed text-[#1f292d]">
            <p>
              Shipping is built on more than vessels, cargo, and routes. Behind
              every voyage are experiences, decisions, challenges, and people
              that shape life at sea every single day.
            </p>

            <p>
              Stories from the Sea brings together real accounts from across the
              maritime world, from the experiences of seafarers onboard to
              technical learnings from operations and incidents at sea. Together,
              these stories offer a closer look at the realities,
              responsibilities, and human side of shipping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}