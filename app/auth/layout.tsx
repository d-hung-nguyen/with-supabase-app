import Image from "next/image"
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/l1.jpg"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full -z-10"
        fill
        quality={100}
        priority
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 " />
      <main>{children}</main>
    </div>
  )
}
