import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../../../components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  const API = process.env.API;
  const subs = await fetch(`${API}/subscribers`, {
    method: "GET",
    cache: "no-store",
  });
  const answer = await subs.json();
  const mails = answer.map((item) => {
    return item.email;
  });
  // console.log(mails);

  const newsletter = await fetch(`${API}/getnewsletter`, {
    method: "GET",
  });
  const news = await newsletter.json();

  const l = await resend.emails.send({
    from: process.env.MAIL_USERNAME,
    to: [...mails],
    subject: "Latest Tech News",
    react: <EmailTemplate news={news} />,
  });

  return NextResponse.json({ message: "mail sent" });
}
