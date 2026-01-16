export async function POST(request) {
  try {
    // Parse the multipart form data request (expecting FormData)
    const formData = await request.formData();

    // Extract plain inputs
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const role = formData.get("role");
    const lookingFor = formData.get("lookingFor");
    const experience = formData.get("experience");
    const interest = formData.get("interest");
    const page = formData.get("page");
    const resume = formData.get("resume"); // May be a File, or null/undefined

    // Compose task description with all fields
    let description = `Career Submission\n`;
    description += `- Name: ${name || ""}\n`;
    description += `- Phone: ${phone || ""}\n`;
    description += `- Email: ${email || ""}\n`;
    description += `- Role: ${role || ""}\n`;
    description += `- Looking For: ${lookingFor || ""}\n`;
    description += `- Experience: ${experience || ""}\n`;
    description += `- Interest: ${interest || ""}\n`;
    description += `- Page: ${page || ""}\n`;

    // If a resume is present, attach info about its metadata
    let resumeInfoStr = "";
    if (resume && typeof resume.name === "string") {
      resumeInfoStr = `- Resume Uploaded: ${resume.name} (${resume.size} bytes, ${resume.type})\n`;
      description += resumeInfoStr;
    } else if (resume) {
      description += `- Resume Uploaded: Yes\n`;
    } else {
      description += `- Resume Uploaded: No\n`;
    }

    // Compose payload for ClickUp
    const clickupBody = {
      name: `${name || ""} - ${phone || ""}`,
      description,
      status: "to do",
    };

    // Send to ClickUp
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${process.env.CLICK_UP_LIST_ID}/task`,
      {
        method: "POST",
        headers: {
          Authorization: process.env.CLICK_UP_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clickupBody),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.err || "Failed to create task");
    }

    // STEP 2: Upload Resume to ClickUp as Attachment
    if (resume && resume.size > 0) {
      const attachmentForm = new FormData();
      attachmentForm.append("attachment", resume, resume.name);

      const uploadRes = await fetch(
        `https://api.clickup.com/api/v2/task/${data.id}/attachment`,
        {
          method: "POST",
          headers: {
            Authorization: process.env.CLICK_UP_TOKEN,
          },
          body: attachmentForm,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        console.error("Failed to upload attachment:", uploadData);
      }
    }

    // Optionally: Implement resume uploading here to S3/GDrive if needed in future

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
