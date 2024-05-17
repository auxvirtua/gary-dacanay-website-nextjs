export function MailingListSignup() {
  return (
    <div className="flex w-full flex-col gap-4 border-2 border-gold-light p-6">
      <span className="text-center text-xl font-black uppercase text-gold md:text-3xl">
        Newsletter
      </span>
      <p className="font-medium md:text-lg">
        Join the mailing list to receive updates on Gary's performances, new
        music and more.
      </p>
      <hr className="border-gold-light" />
      <form className="grid gap-4">
        <input
          type="email"
          placeholder="Type email address here"
          className="col-span-full h-full border-b-2 border-b-gold-light bg-transparent px-2 py-4 text-gold-light placeholder-gold-light placeholder:italic focus:border-b-gold md:text-xl"
        />
        <button
          type="submit"
          className="col-span-1 flex h-full justify-center border-2 border-gold-light px-2 py-4 font-medium uppercase text-gold-light focus:border-gold focus:text-gold md:text-xl"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
