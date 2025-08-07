export default {
	async fetch(request, env, ctx) {

		let WEBHOOK = env.WEBHOOK
		let verification_token = env.KOFISECRET;

		if (!WEBHOOK || !verification_token) {
			return new Response('Environment variables WEBHOOK and KOFISECRET must be set', { status: 500 });
		}

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

		if (!payload.verification_token || payload.verification_token !== verification_token) {
			return new Response('Invalid verification token', { status: 403 });
		}

		const name = payload.is_public ? payload.from_name || "Someone" : "Someone";
		const amount = `${payload.amount || "?"} ${payload.currency || "$"}`;
		const message = payload.message || "";
		const url = payload.url || "https://ko-fi.com/";

		const content = `+${amount} from **${name}**: ${message}\n-# <@569910296303632414>`;


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
			components: [components]
		};

		const post = await fetch(`${WEBHOOK}?with_components=true`, {
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
