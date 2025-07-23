import { APP_NAME } from './APP_NAMEConfig'
export function LogosStrip() {
  // TODO: Replace with real logos
  const logos = [
    { src: '/media/logo1.svg', alt: 'Logo 1' },
    { src: '/media/logo2.svg', alt: 'Logo 2' },
    { src: '/media/logo3.svg', alt: 'Logo 3' },
    { src: '/media/logo4.svg', alt: 'Logo 4' },
  ]
  return (
    <section className="py-6 bg-white border-y border-gray-100">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-10">
        {logos.map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.alt} className="h-8 w-auto opacity-80 grayscale hover:grayscale-0 transition" />
        ))}
      </div>
    </section>
  )
} 