export function AnimeError() {
  return (
    <div className="mx-auto w-full rounded-md bg-white p-5 shadow md:max-w-5xl xl:max-w-7xl">
      <article>
        <div className="italic">
          We are currently experiencing a technical issue with our system. Our
          team is working swiftly to resolve it and restore full functionality.
          <br />
          <br />
          We apologize for any inconvenience this may cause and appreciate your
          patience. Thank you for your understanding. We&apos;ll provide an
          update as soon as the issue is resolved. If you have any urgent
          concerns, please contact our support team at{" "}
          <a
            href="mailto:we-do-not-care@example.com"
            className="text-blue-500 underline"
          >
            we-do-not-care@example.com
          </a>
          .
          <br />
          <br />
          Best regards,
          <br />
          Example Company
        </div>
      </article>
    </div>
  );
}
