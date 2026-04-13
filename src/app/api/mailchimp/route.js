// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { email, name, tag } = body;

//     const API_KEY = process.env.MAILCHIMP_API_KEY;
//     const LIST_ID = process.env.MAILCHIMP_LIST_ID;
//     const DATACENTER = process.env.MAILCHIMP_DC;

//     const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `apikey ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email_address: email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: name,
//         },
//         tags: [tag || "general_lead"], // 👈 dynamic tag
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: 400 });
//     }

//     return NextResponse.json({ success: true });

//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }