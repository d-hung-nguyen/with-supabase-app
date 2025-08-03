import { GlobalEliteLogo } from "./global-elite-logo"
import { LogoIncentive } from "./logo-incentive"

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a href="./" target="_blank" rel="noreferrer">
          <LogoIncentive size={120} />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="./" target="_blank" rel="noreferrer">
          <GlobalEliteLogo />
        </a>
      </div>
      <h1 className="sr-only">Incentive Program Management Platform</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        <span className="font-bold text-yellow-500">Join </span>
        our program, <span className="font-bold text-yellow-600">
          earn{" "}
        </span>{" "}
        points and <span className="font-bold text-amber-500">redeem</span>{" "}
        rewards with ease
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  )
}
