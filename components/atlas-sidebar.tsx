"use client"

import React, { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useQuery } from "@tanstack/react-query"
import {
  Building,
  Calendar,
  Coins,
  Database,
  Gift,
  Hotel,
  MapPin,
  Users,
} from "lucide-react"

interface NavItem {
  name: string
  href: string
  active?: boolean
  count?: number
}

interface NavGroup {
  title: string
  icon: React.ReactNode
  items: NavItem[]
}

interface AtlasSidebarProps {
  navGroups?: NavGroup[]
  activeItem?: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

// Hook to fetch table statistics
function useTableStats() {
  const supabase = createClient()

  return useQuery({
    queryKey: ["sidebar-table-stats"],
    queryFn: async () => {
      const tables = [
        { name: "agencies", icon: <Building className="h-4 w-4" /> },
        { name: "agents", icon: <Users className="h-4 w-4" /> },
        { name: "hotels", icon: <Hotel className="h-4 w-4" /> },
        { name: "regions", icon: <MapPin className="h-4 w-4" /> },
        { name: "bookings", icon: <Calendar className="h-4 w-4" /> },
        { name: "campaign", icon: <Gift className="h-4 w-4" /> },
        { name: "points_ledger", icon: <Coins className="h-4 w-4" /> },
        { name: "rewards", icon: <Gift className="h-4 w-4" /> },
        { name: "room_types", icon: <Hotel className="h-4 w-4" /> },
      ]

      const tableStats = []

      for (const table of tables) {
        try {
          const { count } = await supabase
            .from(table.name)
            .select("*", { count: "exact", head: true })

          tableStats.push({
            name:
              table.name.charAt(0).toUpperCase() +
              table.name.slice(1).replace("_", " "),
            href: `/crud-demo#${table.name}`,
            count: count || 0,
          })
        } catch {
          tableStats.push({
            name:
              table.name.charAt(0).toUpperCase() +
              table.name.slice(1).replace("_", " "),
            href: `/crud-demo#${table.name}`,
            count: 0,
          })
        }
      }

      return tableStats
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export default function AtlasSidebar({
  navGroups,
  activeItem = "Overview",
  isCollapsed = false,
  onToggleCollapse,
}: AtlasSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(isCollapsed)
  const { data: tableStats, isLoading } = useTableStats()

  const collapsed = onToggleCollapse ? isCollapsed : internalCollapsed

  // Create dynamic navigation groups with table stats
  const dynamicNavGroups = navGroups || [
    {
      title: "Platform Kit",
      icon: (
        <svg
          height="16"
          width="16"
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          style={{ color: "#00684A" }}
        >
          <path
            d="M13.5 4.452c0 .09 0 .177-.002.262l.002.094v.23c0 .3-.136.588-.433.87-.302.289-.75.548-1.305.765-1.11.434-2.541.656-3.762.656-1.22 0-2.652-.222-3.762-.656-.555-.217-1.003-.476-1.305-.764-.297-.283-.433-.571-.433-.872v-.229c0-.035 0-.07.002-.105a12.886 12.886 0 0 1-.002-.251C2.5 2.517 5.288 1.6 8 1.6s5.5.917 5.5 2.852Z"
            fill="currentColor"
          />
          <path
            d="M2.5 6.747v1.957c0 .3.136.589.433.871.302.288.75.548 1.305.765 1.11.433 2.541.656 3.762.656 1.22 0 2.652-.223 3.762-.656.555-.217 1.003-.477 1.305-.765.297-.282.433-.57.433-.87V6.746c-.392.318-.88.575-1.405.78-1.236.483-2.784.719-4.095.719-1.31 0-2.859-.236-4.095-.72-.525-.204-1.013-.461-1.405-.779Z"
            fill="currentColor"
          />
          <path
            d="M12.095 11.194c.525-.205 1.013-.462 1.405-.78v.811c0 .035 0 .70-.002.105l.002.251c0 1.936-2.788 2.852-5.5 2.852s-5.5-.916-5.5-2.852c0-.088 0-.176.002-.262a2.322 2.322 0 0 1-.002-.094v-.811c.392.318.88.575 1.405.78 1.236.483 2.784.718 4.095.718 1.31 0 2.859-.235 4.095-.719Z"
            fill="currentColor"
          />
        </svg>
      ),
      items: [
        { name: "Database Manager", href: "/platform-kit" },
        { name: "CRUD Demo", href: "/crud-demo" },
        { name: "Code Comparison", href: "/crud-comparison" },
        { name: "Test Platform", href: "/test-platform" },
      ],
    },
    {
      title: "Database Overview",
      icon: <Database className="h-4 w-4" style={{ color: "#00684A" }} />,
      items: isLoading
        ? [{ name: "Loading...", href: "#", count: 0 }]
        : tableStats || [],
    },
    {
      title: "Authentication",
      icon: (
        <svg
          height="16"
          width="16"
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: "#00684A" }}
        >
          <path
            clipRule="evenodd"
            d="M4 7V5a4 4 0 1 1 8 0v2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm2-2a2 2 0 1 1 4 0v2H6V5Zm2.587 5.81A.999.999 0 0 0 8 9a1 1 0 0 0-.58 1.815v1.852a.583.583 0 0 0 1.167 0V10.81Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      ),
      items: [
        { name: "Login", href: "/auth/login" },
        { name: "Sign Up", href: "/auth/sign-up" },
        { name: "Protected Area", href: "/protected" },
        { name: "Reset Password", href: "/auth/forgot-password" },
      ],
    },
  ]

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse()
    } else {
      setInternalCollapsed(!internalCollapsed)
    }
  }

  return (
    <div
      className="css-ptlzws erct7881"
      style={{
        boxSizing: "border-box",
        outline: "0px",
        gridArea: "side-nav",
        listStyle: "none",
        overflowY: "visible",
        zIndex: 1,
      }}
    >
      <div
        className="lg-ui-side-nav-0000 css-1uat6q2 echq6jl1 leafygreen-ui-zit7vc"
        style={{
          boxSizing: "border-box",
          outline: "0px",
          transition: "width 200ms ease-in-out",
          position: "relative",
          width: collapsed ? "64px" : "184px",
          paddingBottom: "24px",
          height: "100%",
        }}
      >
        <div
          className="leafygreen-ui-1morqrl"
          style={{
            boxSizing: "border-box",
            outline: "0px",
            position: "absolute",
            top: "0px",
            bottom: "0px",
            left: "0px",
            display: "flex",
          }}
        >
          <nav
            id="side-nav-10"
            className="leafygreen-ui-1ky8aix"
            aria-label="Side Navigation"
            style={{
              boxSizing: "border-box",
              outline: "0px",
              display: "block",
              transition: "box-shadow 200ms ease-in-out, border-color, width",
              position: "relative",
              fontFamily:
                '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
              zIndex: 0,
              backgroundColor: "rgb(249, 251, 250)",
              width: collapsed ? "64px" : "184px",
            }}
          >
            <div
              className="leafygreen-ui-1nmawjt"
              style={{
                boxSizing: "border-box",
                outline: "0px",
                inset: "0px",
                overflow: "hidden",
                transition: "opacity 200ms ease-in-out, transform",
                position: "absolute",
                transform: collapsed
                  ? "translate3d(0px, -8px, 0px)"
                  : "translate3d(0px, 0px, 0px)",
                opacity: collapsed ? 0 : 1,
                pointerEvents: collapsed ? "none" : "auto",
              }}
            >
              <ul
                className="leafygreen-ui-j8wxcy"
                style={{
                  boxSizing: "border-box",
                  outline: "0px",
                  marginTop: "0px",
                  marginBottom: "10px",
                  marginBlock: "0px",
                  padding: "16px 0px",
                  inset: "0px",
                  overflow: "hidden auto",
                  paddingInlineStart: "0px",
                  listStyleType: "none",
                  position: "absolute",
                  width: "184px",
                }}
              >
                {/* Overview Item */}
                <li
                  className="leafygreen-ui-tw3z02"
                  style={{
                    boxSizing: "border-box",
                    outline: "0px",
                    listStyle: "none",
                    width: "100%",
                  }}
                >
                  <Link
                    href="/"
                    className={`lg-ui-side-nav-item-0000 ${
                      activeItem === "Overview"
                        ? "css-1eoy87d leafygreen-ui-9n5ux9"
                        : "leafygreen-ui-46152b"
                    }`}
                    aria-current={activeItem === "Overview" ? "page" : "false"}
                    aria-disabled="false"
                    style={{
                      outline: "0px",
                      margin: "0px",
                      background: "none rgba(249, 251, 250, 0)",
                      border: "none",
                      padding: "6px 16px",
                      transition: "background-color 100ms ease-in-out",
                      textDecoration: "none",
                      appearance: "none",
                      position: "relative",
                      width: "100%",
                      minHeight: "32px",
                      boxSizing: "border-box",
                      alignItems: "center",
                      fontFamily:
                        '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      textAlign: "left",
                      textTransform: "capitalize",
                      fontSize: "13px",
                      lineHeight: "20px",
                      cursor: activeItem === "Overview" ? "default" : "pointer",
                      fontWeight: activeItem === "Overview" ? 700 : 400,
                      color:
                        activeItem === "Overview"
                          ? "rgb(0, 104, 74)"
                          : "rgb(0, 30, 43)",
                      backgroundColor:
                        activeItem === "Overview"
                          ? "rgb(227, 252, 247)"
                          : "rgba(249, 251, 250, 0)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    Overview
                  </Link>
                </li>

                {/* Navigation Groups */}
                {dynamicNavGroups.map((group, groupIndex) => (
                  <li
                    key={groupIndex}
                    className="leafygreen-ui-la0n3e css-1yyiifr e19o3ta00"
                    style={{
                      boxSizing: "border-box",
                      outline: "0px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    {/* Group Header */}
                    <div
                      id={`menu-group-label-id-${groupIndex + 7}`}
                      className="leafygreen-ui-g6ml2m"
                      style={{
                        boxSizing: "border-box",
                        outline: "0px",
                        padding: "16px 16px 8px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "0px",
                        marginBottom: "0px",
                        color: "rgb(0, 104, 74)",
                      }}
                    >
                      <div
                        className="leafygreen-ui-1rnl6t5"
                        style={{
                          boxSizing: "border-box",
                          outline: "0px",
                          gap: "8px",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className="leafygreen-ui-z2gibr"
                          style={{
                            boxSizing: "border-box",
                            outline: "0px",
                            display: "inline-flex",
                            color: "rgb(0, 104, 74)",
                          }}
                        >
                          {group.icon}
                        </span>
                        <div
                          className="leafygreen-ui-1tm4spc"
                          style={{
                            boxSizing: "border-box",
                            outline: "0px",
                            margin: "unset",
                            fontFamily:
                              '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                            fontSize: "12px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            lineHeight: "20px",
                            letterSpacing: "0.4px",
                            color: "inherit",
                          }}
                        >
                          {group.title}
                        </div>
                      </div>
                    </div>

                    {/* Group Items */}
                    <ul
                      className="leafygreen-ui-bdnco"
                      aria-labelledby={`menu-group-label-id-${groupIndex + 7}`}
                      style={{
                        boxSizing: "border-box",
                        outline: "0px",
                        marginTop: "0px",
                        marginBottom: "0px",
                        marginBlock: "0px",
                        padding: "0px",
                        paddingInlineStart: "0px",
                        listStyleType: "none",
                      }}
                    >
                      {group.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="leafygreen-ui-tw3z02"
                          style={{
                            boxSizing: "border-box",
                            outline: "0px",
                            listStyle: "none",
                            width: "100%",
                          }}
                        >
                          <Link
                            href={item.href}
                            className={`lg-ui-side-nav-item-0000 ${
                              activeItem === item.name
                                ? "css-1eoy87d leafygreen-ui-9n5ux9"
                                : "leafygreen-ui-46152b"
                            }`}
                            aria-current={
                              activeItem === item.name ? "page" : "false"
                            }
                            aria-disabled="false"
                            style={{
                              outline: "0px",
                              margin: "0px",
                              background: "none rgba(249, 251, 250, 0)",
                              border: "none",
                              padding: "6px 16px",
                              textDecoration: "none",
                              transition: "background-color 100ms ease-in-out",
                              appearance: "none",
                              cursor: "pointer",
                              position: "relative",
                              width: "100%",
                              minHeight: "32px",
                              boxSizing: "border-box",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontFamily:
                                '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                              fontWeight: activeItem === item.name ? 700 : 400,
                              textAlign: "left",
                              textTransform: "capitalize",
                              color:
                                activeItem === item.name
                                  ? "rgb(0, 104, 74)"
                                  : "rgb(0, 30, 43)",
                              backgroundColor:
                                activeItem === item.name
                                  ? "rgb(227, 252, 247)"
                                  : "rgba(249, 251, 250, 0)",
                              fontSize: "13px",
                              lineHeight: "20px",
                            }}
                          >
                            <span
                              className={
                                item.name === "Data API" ? "css-1ff36h2" : ""
                              }
                            >
                              {item.name}
                            </span>
                            {typeof item.count === "number" && (
                              <span
                                className="leafygreen-ui-1ciuhbt"
                                style={{
                                  borderRadius: "24px",
                                  border: "1px solid rgb(192, 250, 230)",
                                  fontFamily:
                                    '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                                  display: "inline-flex",
                                  alignItems: "center",
                                  fontWeight: 600,
                                  fontSize: "11px",
                                  lineHeight: "14px",
                                  height: "16px",
                                  paddingLeft: "4px",
                                  paddingRight: "4px",
                                  backgroundColor: "rgb(227, 252, 247)",
                                  color: "rgb(0, 104, 74)",
                                  minWidth: "20px",
                                  textAlign: "center",
                                }}
                              >
                                {item.count}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}

                {/* Separator */}
                <hr
                  className="css-ofg57t"
                  style={{
                    outline: "0px",
                    boxSizing: "content-box",
                    height: "0px",
                    borderRight: "0px",
                    borderBottom: "0px",
                    borderLeft: "0px",
                    borderImage: "initial",
                    borderTop: "1px solid #E8EDEB",
                    marginTop: "20px",
                    marginBottom: "0px",
                  }}
                />

                {/* Additional Items */}
                <li
                  className="leafygreen-ui-tw3z02"
                  style={{
                    boxSizing: "border-box",
                    outline: "0px",
                    listStyle: "none",
                    width: "100%",
                  }}
                >
                  <button
                    className="lg-ui-side-nav-item-0000 leafygreen-ui-46152b"
                    aria-current="false"
                    aria-disabled="false"
                    style={{
                      font: "inherit",
                      overflow: "visible",
                      outline: "0px",
                      margin: "0px",
                      background: "none rgba(249, 251, 250, 0)",
                      border: "none",
                      padding: "6px 16px",
                      textDecoration: "none",
                      transition: "background-color 100ms ease-in-out",
                      appearance: "none",
                      cursor: "pointer",
                      position: "relative",
                      width: "100%",
                      minHeight: "32px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      fontFamily:
                        '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      textAlign: "left",
                      textTransform: "capitalize",
                      color: "rgb(0, 30, 43)",
                      fontSize: "13px",
                      lineHeight: "20px",
                    }}
                  >
                    <span
                      className="leafygreen-ui-cssveg css-s5xdrg e77844g1"
                      style={{
                        boxSizing: "border-box",
                        outline: "0px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      New on Atlas
                      <div
                        className="css-1qkltea e1kf0dai0 leafygreen-ui-1ciuhbt"
                        style={{
                          boxSizing: "border-box",
                          outline: "0px",
                          borderRadius: "24px",
                          border: "1px solid rgb(192, 250, 230)",
                          fontFamily:
                            '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                          display: "inline-flex",
                          alignItems: "center",
                          fontWeight: 700,
                          fontSize: "12px",
                          lineHeight: "16px",
                          height: "18px",
                          paddingLeft: "6px",
                          paddingRight: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                          backgroundColor: "rgb(227, 252, 247)",
                          color: "rgb(0, 104, 74)",
                          marginLeft: "5px",
                        }}
                      >
                        3
                      </div>
                    </span>
                  </button>
                </li>

                <li
                  className="leafygreen-ui-tw3z02"
                  style={{
                    boxSizing: "border-box",
                    outline: "0px",
                    listStyle: "none",
                    width: "100%",
                  }}
                >
                  <button
                    className="lg-ui-side-nav-item-0000 leafygreen-ui-46152b"
                    aria-current="false"
                    aria-disabled="false"
                    style={{
                      font: "inherit",
                      overflow: "visible",
                      outline: "0px",
                      margin: "0px",
                      background: "none rgba(249, 251, 250, 0)",
                      border: "none",
                      padding: "6px 16px",
                      textDecoration: "none",
                      transition: "background-color 100ms ease-in-out",
                      appearance: "none",
                      cursor: "pointer",
                      position: "relative",
                      width: "100%",
                      minHeight: "32px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      fontFamily:
                        '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      textAlign: "left",
                      textTransform: "capitalize",
                      color: "rgb(0, 30, 43)",
                      fontSize: "13px",
                      lineHeight: "20px",
                    }}
                  >
                    <span
                      className="leafygreen-ui-cssveg css-s5xdrg e77844g1"
                      style={{
                        boxSizing: "border-box",
                        outline: "0px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Goto
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Collapsed View */}
            <div
              className="leafygreen-ui-1jpr46n"
              style={{
                boxSizing: "border-box",
                outline: "0px",
                inset: "0px",
                overflow: "hidden",
                transition: "opacity 200ms ease-in-out, transform",
                position: "absolute",
                transform: collapsed
                  ? "translate3d(0px, 0px, 0px)"
                  : "translate3d(0px, -8px, 0px)",
                opacity: collapsed ? 1 : 0,
                pointerEvents: collapsed ? "auto" : "none",
              }}
            >
              <ul
                className="leafygreen-ui-1b7jm2c"
                aria-hidden={!collapsed}
                style={{
                  boxSizing: "border-box",
                  outline: "0px",
                  marginTop: "0px",
                  marginBottom: "10px",
                  marginBlock: "0px",
                  padding: "16px 0px",
                  inset: "0px",
                  overflow: "hidden auto",
                  paddingInlineStart: "0px",
                  listStyleType: "none",
                  position: "absolute",
                }}
              >
                {dynamicNavGroups.map((group, index) => (
                  <li
                    key={index}
                    className="leafygreen-ui-lxuzuz"
                    style={{
                      boxSizing: "border-box",
                      outline: "0px",
                      borderBottom: "1px solid rgb(232, 237, 235)",
                      borderTop:
                        index === 0 ? "1px solid rgb(232, 237, 235)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "40px",
                      color: "rgb(0, 104, 74)",
                    }}
                  >
                    {group.icon}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Collapse Button */}
          <button
            className="leafygreen-ui-v87gj9"
            aria-controls="side-nav-10"
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            onClick={handleToggle}
            style={{
              boxSizing: "border-box",
              font: "inherit",
              margin: "0px",
              overflow: "visible",
              textTransform: "none",
              appearance: "button",
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: 400,
              outline: "0px",
              lineHeight: "normal",
              borderRadius: "100%",
              transition: "color 150ms ease-in-out, border-color, box-shadow",
              border: "1px solid rgb(232, 237, 235)",
              position: "absolute",
              bottom: "16px",
              right: "-16px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgb(0, 104, 74)",
              boxShadow: "rgba(0, 30, 43, 0.1) 0px 3px 4px",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <div
              className="lg-ui-collapse-menu-0000 leafygreen-ui-16i6mio"
              style={{
                boxSizing: "border-box",
                outline: "0px",
                transition: "transform 80ms ease-in-out",
                display: "inline-block",
                height: "16px",
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <svg
                className="leafygreen-ui-1st74h4"
                height="16"
                width="16"
                aria-hidden="true"
                role="presentation"
                viewBox="0 0 16 16"
                style={{
                  boxSizing: "border-box",
                  outline: "0px",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <path
                  clipRule="evenodd"
                  d="M10.7782 1.63604C10.3877 1.24551 9.75449 1.24551 9.36396 1.63604L4.41421 6.58579L3.70711 7.29289C3.31658 7.68342 3.31658 8.31658 3.70711 8.70711L4.41421 9.41421L9.36396 14.364C9.75448 14.7545 10.3876 14.7545 10.7782 14.364L11.4853 13.6569C11.8758 13.2663 11.8758 12.6332 11.4853 12.2426L7.24264 8L11.4853 3.75736C11.8758 3.36684 11.8758 2.73367 11.4853 2.34315L10.7782 1.63604Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
