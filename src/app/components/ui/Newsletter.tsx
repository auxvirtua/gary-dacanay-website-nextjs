"use client";

import { subscribe } from "../../actions";

const subscribeToNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const email = new FormData(e.currentTarget).get("email") as string;
  try {
    await subscribe(email);
    alert("Subscribed successfully!");
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again.");
  }
};

export function MailingListSignup() {
  return (
    <div className="flex w-full flex-col gap-4 border-2 border-gold-light p-6 md:w-fit">
      <span className="text-xl font-black uppercase text-gold md:text-3xl">
        Newsletter
      </span>
      <form
        className="flex flex-col gap-4 md:flex-row landscape:flex-row"
        onSubmit={subscribeToNewsletter}
      >
        <input
          type="email"
          placeholder="Type email address here"
          className="flex-1 border-b-2 border-b-gold-light bg-transparent px-2 py-4 text-gold-light placeholder-gold-light placeholder:italic focus:border-b-gold md:text-xl"
        />
        <button
          type="submit"
          className="secondary h-full justify-center px-2 py-4 md:w-1/3 md:text-xl landscape:w-1/3"
        >
          Sign up
        </button>
      </form>
      <p className="font-medium md:text-lg">
        Join the mailing list to receive updates on Gary&apos;s performances,
        new music and more.
      </p>
    </div>
  );
}
