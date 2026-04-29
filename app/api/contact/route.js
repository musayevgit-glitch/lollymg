import { NextResponse } from "next/server";

const escape = (s) => String(s || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      firstName,
      lastName,
      phone,
      email,
      instagram,
      workedWithAgency,
      onlyfans,
      accountStatus,
      monthlyRevenue,
      about,
    } = data;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ ok: false, error: "Missing Telegram credentials" }, { status: 500 });
    }

    const text = `New lead from LOLLY AGENCY\nName: ${escape(firstName)} ${escape(lastName)}\nPhone: ${escape(phone)}\nEmail: ${escape(email)}\nInstagram: ${escape(instagram)}\nWorked with agency: ${escape(workedWithAgency)}\nOnlyFans: ${escape(onlyfans)}\nAccount status: ${escape(accountStatus)}\nMonthly revenue: ${escape(monthlyRevenue)}\nAbout: ${escape(about)}`;

    const resp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const json = await resp.json().catch(() => ({}));
    if (!resp.ok || (json && json.ok === false)) {
      return NextResponse.json({ ok: false, error: json }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
