"use server";
import mailchimp from "@mailchimp/mailchimp_marketing";

declare const process: {
  env: {
    MAILCHIMP_API_KEY: string;
    MAILCHIMP_API_SERVER: string;
    MAILCHIMP_AUDIENCE_ID: string;
  };
};

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export const subscribe = async (email: string) => {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_API_SERVER) {
    return {
      status: 500,
      json: {
        error:
          "Please define MAILCHIMP_API_KEY and MAILCHIMP_API_SERVER. Email newsletter subscription will not work.",
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
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });
  } catch (error: any) {
    return {
      status: 500,
      json: { error: `Error: ${error.message}` },
    };
  }

  return {
    status: 201,
    json: { error: "" },
  };
};

export default subscribe;
