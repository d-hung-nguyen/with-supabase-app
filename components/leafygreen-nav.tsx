"use client"

import React from "react"

interface LeafyGreenNavProps {
  projectName?: string
  activeTab?: string
  tabs?: Array<{
    name: string
    href: string
    active?: boolean
  }>
}

export default function LeafyGreenNav({
  projectName = "Project 0",
  activeTab = "Data Services",
  tabs = [
    { name: "Home", href: "/", active: true },
    { name: "Platform-Kit", href: "/platform-kit", active: false },
  ],
}: LeafyGreenNavProps) {
  return (
    <>
      <nav
        className="leafygreen-ui-1qosq4n"
        aria-label="project navigation"
        style={{
          outline: "0px",
          padding: "0px 16px",
          position: "relative",
          display: "flex",
          WebkitBoxAlign: "center",
          alignItems: "center",
          alignSelf: "stretch",
          WebkitBoxPack: "justify",
          justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box",
          fontSize: "13px",
          lineHeight: "15px",
          backgroundColor: "rgb(255, 255, 255)",
          height: "45px",
          zIndex: 0,
          boxShadow: "rgba(0, 30, 43, 0.1) 0px 4px 4px 0px",
        }}
      >
        <div
          className="leafygreen-ui-1juyav2"
          style={{
            boxSizing: "border-box",
            outline: "0px",
            gap: "12px",
            position: "relative",
            display: "flex",
            WebkitBoxAlign: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div
            className="leafygreen-ui-qdkila"
            style={{
              boxSizing: "border-box",
              outline: "0px",
              display: "flex",
              WebkitBoxAlign: "center",
              alignItems: "center",
              marginLeft: "11px",
            }}
          >
            <div
              className="leafygreen-ui-hc6lm9"
              style={{
                boxSizing: "border-box",
                outline: "0px",
                position: "relative",
              }}
            >
              <button
                className="lg-ui-button-0000 leafygreen-ui-1k2qxoc"
                type="button"
                aria-disabled="false"
                aria-expanded="false"
                style={{
                  boxSizing: "border-box",
                  font: "inherit",
                  overflow: "visible",
                  textTransform: "none",
                  outline: "0px",
                  margin: "0px",
                  transition: "150ms ease-in-out",
                  textDecoration: "none",
                  borderRadius: "6px",
                  padding: "unset",
                  border: "1px solid transparent",
                  appearance: "none",
                  display: "inline-flex",
                  position: "relative",
                  cursor: "pointer",
                  zIndex: 0,
                  fontFamily:
                    '"Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: "13px",
                  lineHeight: "20px",
                  fontWeight: 500,
                  WebkitBoxAlign: "center",
                  alignItems: "center",
                  color: "rgb(0, 30, 43)",
                  backgroundColor: "rgb(255, 255, 255)",
                  width: "172px",
                  height: "30px",
                }}
              >
                <div
                  className="leafygreen-ui-v038xi"
                  style={{
                    boxSizing: "border-box",
                    outline: "0px",
                    overflow: "hidden",
                    inset: "0px",
                    borderRadius: "5px",
                    position: "absolute",
                  }}
                />
                <div
                  className="leafygreen-ui-16tr4y"
                  style={{
                    boxSizing: "border-box",
                    outline: "0px",
                    gap: "6px",
                    display: "grid",
                    gridAutoFlow: "column",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    userSelect: "none",
                    zIndex: 0,
                    padding: "0px 8px",
                    gridTemplateColumns: "16px 1fr 16px",
                  }}
                >
                  <svg
                    className="leafygreen-ui-15wfe7w"
                    height="16"
                    width="16"
                    aria-hidden="true"
                    role="presentation"
                    viewBox="0 0 16 16"
                    style={{
                      boxSizing: "border-box",
                      outline: "0px",
                      flexShrink: 0,
                      height: "16px",
                      width: "16px",
                      justifySelf: "right",
                      overflow: "hidden",
                      color: "rgb(136, 147, 151)",
                    }}
                  >
                    <path
                      d="M2 2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V5C15 4.44772 14.5523 4 14 4H8C7.44772 4 7 3.55228 7 3C7 2.44772 6.55228 2 6 2H2Z"
                      fill="currentColor"
                      style={{ boxSizing: "border-box", outline: "0px" }}
                    />
                  </svg>
                  <span
                    className="leafygreen-ui-asvhsp"
                    style={{
                      boxSizing: "border-box",
                      outline: "0px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      fontWeight: "bolder",
                      WebkitBoxFlex: "1",
                      flexGrow: 1,
                      textAlign: "left",
                      fontSize: "13px",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {projectName}
                  </span>
                  <svg
                    className="leafygreen-ui-fn50nl"
                    height="14"
                    width="14"
                    aria-hidden="true"
                    role="presentation"
                    viewBox="0 0 16 16"
                    style={{
                      boxSizing: "border-box",
                      outline: "0px",
                      flexShrink: 0,
                      color: "rgb(136, 147, 151)",
                      height: "16px",
                      width: "16px",
                      justifySelf: "left",
                      overflow: "hidden",
                    }}
                  >
                    <path
                      d="M8.67903 10.7962C8.45271 11.0679 8.04729 11.0679 7.82097 10.7962L4.63962 6.97649C4.3213 6.59428 4.5824 6 5.06866 6L11.4313 6C11.9176 6 12.1787 6.59428 11.8604 6.97649L8.67903 10.7962Z"
                      fill="currentColor"
                      style={{ boxSizing: "border-box", outline: "0px" }}
                    />
                  </svg>
                </div>
              </button>
            </div>
            <button
              className="leafygreen-ui-1o36spn"
              aria-disabled="false"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="More"
              tabIndex={0}
              style={{
                boxSizing: "border-box",
                font: "inherit",
                margin: "0px",
                overflow: "visible",
                textTransform: "none",
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: 400,
                outline: "0px",
                lineHeight: "normal",
                border: "none",
                padding: "unset",
                borderRadius: "100px",
                transition: "color 150ms ease-in-out, box-shadow",
                appearance: "unset",
                display: "inline-block",
                position: "relative",
                cursor: "pointer",
                flexShrink: 0,
                backgroundColor: "rgba(255, 255, 255, 0)",
                height: "28px",
                width: "28px",
                color: "rgb(92, 108, 117)",
                zIndex: 1,
              }}
            >
              <div
                className="leafygreen-ui-xhlipt"
                style={{
                  boxSizing: "border-box",
                  outline: "0px",
                  inset: "0px",
                  position: "absolute",
                  display: "flex",
                  WebkitBoxAlign: "center",
                  alignItems: "center",
                  WebkitBoxPack: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  className="leafygreen-ui-1st74h4"
                  height="16"
                  width="16"
                  aria-label="Vertical Ellipsis Icon"
                  role="img"
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
                    d="M9.5 2.75C9.5 3.7165 8.7165 4.5 7.75 4.5C6.7835 4.5 6 3.7165 6 2.75C6 1.7835 6.7835 1 7.75 1C8.7165 1 9.5 1.7835 9.5 2.75ZM9.5 7.75C9.5 8.7165 8.7165 9.5 7.75 9.5C6.7835 9.5 6 8.7165 6 7.75C6 6.7835 6.7835 6 7.75 6C8.7165 6 9.5 6.7835 9.5 7.75ZM7.75 14.5C8.7165 14.5 9.5 13.7165 9.5 12.75C9.5 11.7835 8.7165 11 7.75 11C6.7835 11 6 11.7835 6 12.75C6 13.7165 6.7835 14.5 7.75 14.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    style={{ boxSizing: "border-box", outline: "0px" }}
                  />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="leafygreen-ui-pxedhf"
            aria-label="Product Tabs"
            style={{
              boxSizing: "border-box",
              outline: "0px",
              display: "flex",
              alignSelf: "stretch",
              position: "relative",
            }}
          >
            {tabs.map((tab, index) => (
              <a
                key={index}
                className={
                  tab.active ? "leafygreen-ui-w3a73f" : "leafygreen-ui-9j9ryf"
                }
                aria-disabled="false"
                href={tab.href}
                tabIndex={0}
                style={{
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                  borderRadius: "12px",
                  transition: "box-shadow 100ms ease-in-out, font-weight",
                  padding: "0px 16px",
                  outline: "none",
                  position: "relative",
                  display: "flex",
                  WebkitBoxPack: "center",
                  justifyContent: "center",
                  WebkitBoxAlign: "center",
                  alignItems: "center",
                  flexShrink: 0,
                  fontSize: "13px",
                  lineHeight: "20px",
                  minWidth: "100px",
                  fontWeight: tab.active ? 700 : 400,
                  color: tab.active ? "rgb(0, 104, 74)" : "rgb(0, 30, 43)",
                  textDecoration: "none",
                }}
              >
                <svg
                  className="lg-ui-brand-shape-0000 leafygreen-ui-jfl65i"
                  height="45"
                  width="100"
                  fill="#E3FCF7"
                  viewBox="0 0 100 45"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    boxSizing: "border-box",
                    outline: "0px",
                    transition: "fill 100ms ease-in-out",
                    position: "absolute",
                    zIndex: -1,
                    overflow: "hidden",
                    fill: tab.active
                      ? "rgb(227, 252, 247)"
                      : "rgba(255, 255, 255, 0)",
                  }}
                >
                  <path
                    d="M22.5325 8C15.611 8 10 13.6073 10 20.5244V45.4756C10 52.3927 15.611 58 22.5325 58H72.4675C79.389 58 85 52.3927 85 45.4756C85 38.5586 79.389 32.9513 72.4675 32.9513H47.5488C40.6542 32.9513 35.065 27.3657 35.065 20.4756C35.065 13.5855 29.4271 8 22.5325 8Z"
                    style={{ boxSizing: "border-box", outline: "0px" }}
                  />
                </svg>
                <span
                  className="lg-ui-tab-content-0000 leafygreen-ui-r5ntlb"
                  style={{
                    boxSizing: "border-box",
                    outline: "0px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    fontWeight: "inherit",
                  }}
                >
                  {tab.name}
                </span>
              </a>
            ))}
          </div>
        </div>
        <div
          className="leafygreen-ui-1juyav2"
          style={{
            boxSizing: "border-box",
            outline: "0px",
            gap: "12px",
            position: "relative",
            display: "flex",
            WebkitBoxAlign: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <a
            className="leafygreen-ui-17sccqr"
            aria-disabled="false"
            aria-label="Invite to Project"
            href="#"
            tabIndex={0}
            style={{
              boxSizing: "border-box",
              outline: "0px",
              border: "none",
              padding: "unset",
              borderRadius: "100px",
              transition: "color 150ms ease-in-out, box-shadow",
              appearance: "unset",
              display: "inline-block",
              cursor: "pointer",
              flexShrink: 0,
              backgroundColor: "rgba(255, 255, 255, 0)",
              height: "36px",
              width: "36px",
              color: "rgb(92, 108, 117)",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <div
              className="leafygreen-ui-xhlipt"
              style={{
                boxSizing: "border-box",
                outline: "0px",
                inset: "0px",
                position: "absolute",
                display: "flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                WebkitBoxPack: "center",
                justifyContent: "center",
              }}
            >
              <svg
                className="leafygreen-ui-1st74h4"
                height="20"
                width="20"
                aria-label="Invite User Icon"
                role="img"
                viewBox="0 0 16 16"
                style={{
                  boxSizing: "border-box",
                  outline: "0px",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <path
                  d="M8.41809 7.42809C9.37085 6.8027 10 5.72482 10 4.5C10 2.567 8.433 1 6.5 1C4.567 1 3 2.567 3 4.5C3 5.76853 3.67485 6.87944 4.68512 7.49329C5.21431 7.81484 5.83553 8 6.5 8C7.20817 8 7.86722 7.78968 8.41809 7.42809Z"
                  fill="currentColor"
                  style={{ boxSizing: "border-box", outline: "0px" }}
                />
                <path
                  d="M3.091 8.56241C3.39921 8.20507 3.92858 8.22348 4.34253 8.45005C4.98309 8.80067 5.71827 9 6.5 9C7.28173 9 8.01691 8.80067 8.65747 8.45005C9.07142 8.22348 9.60079 8.20507 9.909 8.56241C10.0194 8.6904 10.1227 8.82467 10.2183 8.96461C9.77928 9.33148 9.5 9.88313 9.5 10.5C8.39543 10.5 7.5 11.3954 7.5 12.5C7.5 13.0973 7.76188 13.6335 8.17709 14H2V11.5C2 10.3773 2.41111 9.3507 3.091 8.56241Z"
                  fill="currentColor"
                  style={{ boxSizing: "border-box", outline: "0px" }}
                />
                <path
                  d="M10.5 10.5C10.5 10.272 10.5763 10.0618 10.7048 9.89357C10.8875 9.65434 11.1757 9.5 11.5 9.5C12.0523 9.5 12.5 9.94772 12.5 10.5V11.5H13.5C14.0523 11.5 14.5 11.9477 14.5 12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H12.5V14.5C12.5 15.0523 12.0523 15.5 11.5 15.5C10.9477 15.5 10.5 15.0523 10.5 14.5V13.5H9.5C8.94772 13.5 8.5 13.0523 8.5 12.5C8.5 11.9477 8.94772 11.5 9.5 11.5H10.5V10.5Z"
                  fill="currentColor"
                  style={{ boxSizing: "border-box", outline: "0px" }}
                />
              </svg>
            </div>
          </a>
          <a
            className="leafygreen-ui-17sccqr"
            aria-disabled="false"
            aria-label="Project Activity Feed"
            href="#"
            tabIndex={0}
            style={{
              boxSizing: "border-box",
              outline: "0px",
              border: "none",
              padding: "unset",
              borderRadius: "100px",
              transition: "color 150ms ease-in-out, box-shadow",
              appearance: "unset",
              display: "inline-block",
              cursor: "pointer",
              flexShrink: 0,
              backgroundColor: "rgba(255, 255, 255, 0)",
              height: "36px",
              width: "36px",
              color: "rgb(92, 108, 117)",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <div
              className="leafygreen-ui-xhlipt"
              style={{
                boxSizing: "border-box",
                outline: "0px",
                inset: "0px",
                position: "absolute",
                display: "flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                WebkitBoxPack: "center",
                justifyContent: "center",
              }}
            >
              <svg
                className="leafygreen-ui-1st74h4"
                height="20"
                width="20"
                aria-label="Activity Feed Icon"
                role="img"
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
                  d="M1 13V7H5.5C6.32843 7 7 6.32843 7 5.5V1H9C10.1046 1 11 1.89543 11 3V7.51491C10.9701 7.51164 10.9401 7.50889 10.9099 7.50668C9.80561 7.42578 8.77964 8.08094 8.38847 9.11682L7.32818 11.9246C6.27375 12.2181 5.5 13.1854 5.5 14.3333C5.5 14.5642 5.53129 14.7878 5.58987 15H3C1.89543 15 1 14.1046 1 13ZM4.91421 1H5.83333V4.83333C5.83333 5.38562 5.38562 5.83333 4.83333 5.83333H1V4.91421C1 4.649 1.10536 4.39464 1.29289 4.20711L2.5 3L4.20711 1.29289C4.39464 1.10536 4.649 1 4.91421 1Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  style={{ boxSizing: "border-box", outline: "0px" }}
                />
                <path
                  clipRule="evenodd"
                  d="M10.8003 9.00268C11.2421 9.03504 11.6099 9.35411 11.7043 9.78684L12.3135 12.5789L12.8215 11.8647C13.0091 11.601 13.3128 11.4444 13.6364 11.4444H15C15.5523 11.4444 16 11.8922 16 12.4444C16 12.9967 15.5523 13.4444 15 13.4444H14.1522L12.633 15.5797C12.4036 15.9022 12.0055 16.059 11.6178 15.9797C11.23 15.9004 10.9255 15.5999 10.8412 15.2132L10.47 13.512L10.0264 14.6866C9.87947 15.0758 9.50691 15.3333 9.09091 15.3333H8C7.44772 15.3333 7 14.8856 7 14.3333C7 13.7811 7.44772 13.3333 8 13.3333H8.39961L9.79175 9.64673C9.94822 9.23238 10.3586 8.97032 10.8003 9.00268Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  style={{ boxSizing: "border-box", outline: "0px" }}
                />
              </svg>
            </div>
          </a>
          <a
            className="leafygreen-ui-17sccqr"
            aria-disabled="false"
            aria-label="Alerts for Project"
            href="#"
            tabIndex={0}
            style={{
              boxSizing: "border-box",
              outline: "0px",
              border: "none",
              padding: "unset",
              borderRadius: "100px",
              transition: "color 150ms ease-in-out, box-shadow",
              appearance: "unset",
              display: "inline-block",
              cursor: "pointer",
              flexShrink: 0,
              backgroundColor: "rgba(255, 255, 255, 0)",
              height: "36px",
              width: "36px",
              color: "rgb(92, 108, 117)",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <div
              className="leafygreen-ui-xhlipt"
              style={{
                boxSizing: "border-box",
                outline: "0px",
                inset: "0px",
                position: "absolute",
                display: "flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                WebkitBoxPack: "center",
                justifyContent: "center",
              }}
            >
              <svg
                className="leafygreen-ui-1st74h4"
                height="20"
                width="20"
                aria-label="Bell Icon"
                role="img"
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
                  d="M12.6248 6.1383C12.4098 4.25462 11.09 2.74034 9.35673 2.21251C9.2281 1.52063 8.66955 1 8 1C7.33044 1 6.77189 1.52063 6.64326 2.21251C4.91 2.74034 3.59017 4.25462 3.37524 6.1383L2.92307 10.1011H2.94943C2.42507 10.1011 2 10.5262 2 11.0506C2 11.5749 2.42507 12 2.94943 12H13.0506C13.5749 12 14 11.5749 14 11.0506C14 10.5262 13.5749 10.1011 13.0506 10.1011H13.0769L12.6248 6.1383ZM8 15C6.89543 15 6 14.1046 6 13H10C10 14.1046 9.10457 15 8 15Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  style={{ boxSizing: "border-box", outline: "0px" }}
                />
              </svg>
            </div>
          </a>
        </div>
      </nav>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  box-sizing: border-box;
  outline: 0px;
  text-size-adjust: 100%;
  font-size: 9px;
  -webkit-tap-highlight-color: transparent;
  font-family: "Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #001E2B;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}

body {
  box-sizing: border-box;
  outline: 0px;
  margin: 0px;
  font-size: 14px;
  line-height: 1.42857;
  background-color: rgb(255, 255, 255);
  font-family: "Euclid Circular A", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #001E2B;
  -webkit-font-smoothing: antialiased;
  height: 100%;
}
`,
        }}
      />
    </>
  )
}
