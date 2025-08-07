import { SignUpForm } from "@/components/sign-up-form"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen items-center m-auto flex justify-center relative overflow-hidden">
      <SignUpForm />
      <Image
        src="/images/l3.jpg"
        alt="Platform Kit Logo"
        fill
        quality={100}
        priority
        className="object-top object-cover  -z-10"
      />

      <div className="absolute inset-0 bg-black/30 -z-10" />
    </div>
  )
}
