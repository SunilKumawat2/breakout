export async function POST(req) {
  try {
    const body = await req.json();

    const {
      locationId,
      gameId,
      slotId,
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
    } = body;

    // Validate required fields
    if (!locationId || !gameId || !slotId) {
      return new Response(
        JSON.stringify({
          error:
            "Missing required fields: locationId, gameId, and slotId are required.",
        }),
        { status: 400 }
      );
    }

    const payload = {
      locationId,
      gameId,
      slotId,
    };

    // Add optional customer fields if provided
    if (customerFirstName) payload.customerFirstName = customerFirstName;
    if (customerLastName) payload.customerLastName = customerLastName;
    if (customerEmail) payload.customerEmail = customerEmail;
    if (customerPhone) payload.customerPhone = customerPhone;

    const apiUrl = `${process.env.BOOKING_SYSTEM_URL}/prepare-booking`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.BOOKING_SYSTEM_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const apiResponse = await res.json();

    return new Response(JSON.stringify(apiResponse), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to prepare booking",
        message: error?.message || error,
      }),
      {
        status: 500,
      }
    );
  }
}
