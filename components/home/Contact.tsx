import AnimatedSection from "@/components/motion/AnimatedSection";
import GlowCard from "@/components/motion/GlowCard";

const channels = [
  {
    label: "E-mail",
    value: "sobotkakrystof5@gmail.com",
    href: "mailto:sobotkakrystof5@gmail.com",
    icon: (
      <path
        fill="currentColor"
        d="M3 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V13h12V7.4l-6 3.6-6-3.6Zm.7-1.4L10 9.3l5.3-3.3H4.7Z"
      />
    ),
  },
  {
    label: "Telefon",
    value: "+420 604 837 333",
    href: "tel:+420604837333",
    icon: (
      <path
        fill="currentColor"
        d="M5.3 3.3c.4-.4 1-.4 1.4 0l2 2c.3.3.4.8.2 1.2l-.9 2c-.1.3-.1.6.1.8l3.1 3.1c.2.2.5.2.8.1l2-.9c.4-.2.9-.1 1.2.2l2 2c.4.4.4 1 0 1.4l-1.4 1.4c-.5.5-1.2.7-1.9.6-3-.5-5.9-2-8.1-4.2S2.9 8 2.4 5c-.1-.7.1-1.4.6-1.9L4.4 1.7Z"
      />
    ),
  },
];

export default function Contact() {
  return (
    <section id="primy-kontakt">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <AnimatedSection>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Kontakt
          </h2>
          <p className="mt-3 text-zinc-400">
            Ozvu se osobně, nejpozději do 24 hodin.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {channels.map((channel, i) => (
            <AnimatedSection key={channel.label} delay={i * 0.08}>
              <GlowCard
                accent="turquoise"
                href={channel.href}
                className="bg-zinc-900 p-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-brand-turquoise">
                    <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5">
                      {channel.icon}
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm text-zinc-400">{channel.label}</p>
                    <p className="font-medium text-zinc-50">
                      {channel.value}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
