import configuration from '../configurations';

export const protectedAPI = {
  async getMessages(accessToken: string) {
    const response = await fetch(
      `${configuration.protectedApiUrl}/api/messages/protected`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.json();
  },
};
