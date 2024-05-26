'use server';

const baseUrl = process.env.API_URL;

export async function getProfileService(profileId: string) {
  const url = new URL(`/api/users/${profileId}`, baseUrl);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({}),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Get Posts Service Error:", error);
    // throw error;
  }
}