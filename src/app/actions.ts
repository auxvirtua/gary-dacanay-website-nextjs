"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export async function subscribe(email: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_API_SERVER;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !server || !audienceId) {
    return {
      status: 500,
      json: {
        error:
          "Please define MAILCHIMP_API_KEY, MAILCHIMP_API_SERVER, and MAILCHIMP_AUDIENCE_ID. Email newsletter subscription will not work.",
      },
    };
  }

  if (!email) {
    return {
      status: 400,
      json: { error: "Email is required" },
    };
  }

  try {
    await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: "subscribed",
    });
    return {
      status: 201,
      json: { error: "" },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      status: 500,
      json: { error: `Error: ${message}` },
    };
  }
}
