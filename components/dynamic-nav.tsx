"use client"

import { usePathname } from "next/navigation"
import { AtlasNav } from "./atlas-nav"

// Configuration for different routes
const routeConfig = {
  "/": {
    title: "Home",
    subtitle: "Welcome to the Platform",
    icon: "H",
  },
  "/platform-kit": {
    title: "Platform Kit",
    subtitle: "Database Management",
    icon: "PK",
  },

  "/crud-comparison": {
    title: "CRUD Comparison",
    subtitle: "Performance Analysis",
    icon: "CC",
  },
  "/test-platform": {
    title: "Test Platform",
    subtitle: "Quality Assurance",
    icon: "TP",
  },
}

type RouteConfig = typeof routeConfig
type ConfiguredRoute = keyof RouteConfig

export function DynamicNav() {
  const pathname = usePathname()

  // Check if current route has Atlas nav configuration
  if (pathname in routeConfig) {
    const config = routeConfig[pathname as ConfiguredRoute]
    return <AtlasNav {...config} />
  }

  // Return null for routes that don't need Atlas nav
  return null
}
