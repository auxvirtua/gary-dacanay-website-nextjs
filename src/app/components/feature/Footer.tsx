import data from "../../data.json";
import { MailingListSignup } from "../ui/Newsletter";
import { SocialMedia } from "../ui/SocialMedia";

export function Footer() {
  return (
    <footer className="m-6 flex flex-col items-center justify-center gap-6 md:p-12">
      <MailingListSignup />
      <SocialMedia />
      <div className="font-bold uppercase text-gold-light lg:text-sm">
        &copy; {new Date().getFullYear()} {data.name}
      </div>
    </footer>
  );
}
