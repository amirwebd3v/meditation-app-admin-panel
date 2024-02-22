export default defineEventHandler(async (event) => {
        try {
            const files = (await readFormData(event)).getAll('files[]');

            let formData = new FormData();
            files.map((file) => {
                const blob = new Blob([file], {type: file.type});
                formData.append('files[]', blob)
            })

            const results = await $fetch(
                `https://webhook.site/f2e288d6-cc9e-40ee-982a-afb81554ea8c`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            );
            await sendRedirect(event, '/', 302)

        } catch (error) {
            await sendRedirect(event, '/', 302)
        }
    }
)
