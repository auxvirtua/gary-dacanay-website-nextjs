export function MailingListSignup() {
  return (
    <div className="mt-4 flex gap-2">
      {/* <p className="font-semibold">Sign up for my mailing list</p> */}
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="Email"
          className="border border-black dark:border-white" />
        <button type="submit" className="border border-black dark:border-white">
          Sign up
        </button>
      </form>
    </div>
  );
}
