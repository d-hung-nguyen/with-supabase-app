import Image from "next/image"
export function GlobalEliteLogo() {
  return (
    <div>
      <Image
        src="/images/global-elite-logo.svg"
        alt="Global Elite Logo"
        width={200}
        height={100}
        className="object-contain"
      />
    </div>
  )
}
