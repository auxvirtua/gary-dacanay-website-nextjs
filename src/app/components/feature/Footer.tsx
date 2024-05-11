import data from "../../data.json";
import { MailingListSignup } from "../ui/MailingListSignup";
import { SocialMedia } from "../ui/SocialMedia";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-12">
      <SocialMedia />
      <MailingListSignup />
      <div className="text-sm">
        &copy; {new Date().getFullYear()} {data.name}
      </div>
    </footer>
  );
}
