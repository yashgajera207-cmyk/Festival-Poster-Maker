export async function uploadGeneratedPoster(
  base64: string
) {
  const response =
    await fetch(
      "/api/upload-generated",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          image: base64,
        }),
      }
    );

  const result =
    await response.json();

  return result.url;
}