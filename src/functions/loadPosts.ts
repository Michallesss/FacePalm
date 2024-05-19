import { api } from '@/constants/instance';

export default async function loadPosts(sortBy: string) {
  const response = await api.get('/posts');

  return response.data;
}