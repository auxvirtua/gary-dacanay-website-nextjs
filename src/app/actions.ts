"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";

export type SubscribeResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

type MailchimpError = Error & {
  response?: { body?: { title?: string } };
};

export async function subscribe(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_API_SERVER;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !server || !audienceId) {
    return {
      ok: false,
      message: "Newsletter signup is temporarily unavailable. Please try again later.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    return {
      ok: false,
      message: "Enter a valid email address.",
    };
  }

  mailchimp.setConfig({ apiKey, server });

  try {
    await mailchimp.lists.addListMember(audienceId, {
      email_address: normalizedEmail,
      status: "subscribed",
    });
    return {
      ok: true,
      message: "You're on the list. Watch your inbox for updates.",
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;

    if (mailchimpError.response?.body?.title === "Member Exists") {
      return {
        ok: false,
        message: "That email address is already on the list.",
      };
    }

    return {
      ok: false,
      message: "We couldn't complete the signup. Please try again later.",
    };
  }
}
