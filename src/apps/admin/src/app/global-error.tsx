"use client";
export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <section className="min-h-screen w-full flex flex-col justify-center items-center">
          <p className="text-center text-5xl">{"Something went wrong!"}</p>
          <p className="text-center text-3xl">
            {"Contact us in the links below"}
          </p>
          <div className="flex">
            <a href="/" className="h-4 w-auto">Go Back</a>
            <a href="/contact" className="h-3 w-auto">Contact Us</a>
          </div>
        </section>
      </body>
    </html>
  );
}
