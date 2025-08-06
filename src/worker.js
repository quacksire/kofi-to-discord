export default {
  async fetch(request, env, ctx) {

    //if (request.method !== "POST") {
    //  return new Response("Method not allowed", { status: 405 });
    //}

    const url = new URL(request.url);
    const channelId = url.pathname.split("/").pop();

    console.log(url)

    // Replace with actual Discord webhook URLs mapped per channel
    const DISCORD_WEBHOOKS = [
      "https://discord.com/api/webhooks/1402757608821100675/5KcdzcHljmNlVz38hEh-SElKSfFGuId1N7JzEJR5YLm1j9fS7p-2xMHc-hZCvEcZI3Wdy"
      // Add more channel-to-webhook mappings as needed
    ];

    let body;
    try {
      const raw = await request.json();
      body = typeof raw.data === "string" ? JSON.parse(raw.data) : raw.data;
    } catch (err) {
      return new Response("Invalid JSON", { status: 400 });
    }

    // Basic validation
    const requiredFields = ["type", "from_name", "amount", "url"];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return new Response(`Missing field: ${field}`, { status: 400 });
      }
    }

    // Handle private donation
    if (body.is_public === false) {
      body.from_name = "Anonymous";
      body.message = "";
    }

    const embed = {
      title: "☕ New Ko-fi contribution",
      url: body.url,
      color: 0x29ABE0,
      thumbnail: {
        url: "https://user-images.githubusercontent.com/7295363/99930265-49bad700-2d05-11eb-9057-1a013c45ee2c.png"
      },
      fields: [
        {
          name: "**Name**",
          value: body.from_name,
          inline: true
        },
        {
          name: "**Amount**",
          value: `${body.currency || "$"}${body.amount}`,
          inline: true
        },
        ...(body.message?.length > 0
          ? [{
              name: "**Message**",
              value: body.message
            }]
          : [])
      ],
      timestamp: new Date().toISOString()
    };

    DISCORD_WEBHOOKS.forEach((hook) => {
      fetch(hook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ embeds: [embed] })
      });
    })

    return new Response("Ko-fi webhook relayed to Discord", { status: 200 });
  }
};