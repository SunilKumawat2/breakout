export async function POST(request) {
  try {
    // Parse JSON body
    const body = await request.json();
    const { name, phone, category, consultation } = body;

    if (!name || !phone || !category || !consultation) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${process.env.CLICK_UP_LIST_ID}/task`,
      {
        method: "POST",
        headers: {
          Authorization: process.env.CLICK_UP_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${name} - ${phone}`,
          description: `Phone: ${phone}\nCategory: ${category}\nConsultation: ${consultation}`,
          status: "to do",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.err || "Failed to create task");
    }

    return new Response(
      JSON.stringify({ message: "Task created successfully", data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
