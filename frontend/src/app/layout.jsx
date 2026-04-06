import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b0b] text-white antialiased [font-family:'Avenir_Next','Segoe_UI','Helvetica_Neue',sans-serif]">
        <div className="relative isolate min-h-screen overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(197,223,192,0.25),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(160deg,#0b0b0b_0%,#0b0b0b_60%,#ffffff0f_100%)]" />
          {children}
        </div>
      </body>
    </html>
  );
}
