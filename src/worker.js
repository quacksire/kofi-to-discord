export default {
	async fetch(request, env, ctx) {

		let WEBHOOK = "https://discord.com/api/webhooks/1402757608821100675/5KcdzcHljmNlVz38hEh-SElKSfFGuId1N7JzEJR5YLm1j9fS7p-2xMHc-hZCvEcZI3Wd?with_components=true";

		const contentType = request.headers.get('content-type') || '';
		if (!contentType.includes('application/x-www-form-urlencoded')) {
			return new Response('Invalid content type', { status: 400 });
		}

		const formData = await request.formData();
		const dataRaw = formData.get('data');
		if (!dataRaw) {
			return new Response('Missing data field', { status: 400 });
		}

		let payload;
		try {
			payload = JSON.parse(dataRaw);
		} catch (e) {
			return new Response('Invalid JSON in data field', { status: 400 });
		}

		const name = payload.from_name || "Someone";
		const amount = `${payload.amount || "?"} ${payload.currency || "$"}`;
		const message = payload.message || "(no message)";
		const url = payload.url || "https://ko-fi.com/";

		const content = `+${amount} from **${name}**: ${message}\n-# <@569910296303632414>`;

		const embed = {
			title: "☕ New Ko-fi Contribution",
			url,
			color: 0x29ABE0,
			timestamp: new Date().toISOString(),
			fields: [
				{ name: "Name", value: name, inline: true },
				{ name: "Amount", value: amount, inline: true },
				...(payload.message ? [{ name: "Message", value: payload.message }] : [])
			]
		};

		const components = {
			type: 1,
			components: [
				{
					type: 2,
					style: 5,
					label: "See on Ko-fi",
					url: url
				}
			]
		}

		const discordBody = {
			content,
			//embeds: [embed],
			components: [components]
		};

		const post = await fetch(WEBHOOK, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(discordBody)
		});

		if (!post.ok) {
			const errText = await post.text();
			console.error("Discord webhook failed:", post.status, errText);
			return new Response("Discord webhook error", { status: 500 });
		}

		return new Response("Ko-fi webhook relayed to Discord", { status: 200 });
	}
};
