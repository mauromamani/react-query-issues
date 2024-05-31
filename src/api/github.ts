import axios from 'axios';
import { sleep } from '../sleep';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer `,
  },
});

export const getLabels = async () => {
  await sleep(2);
  const { data } = await githubApi.get('/repos/facebook/react/labels');

  return data;
};

export const getIssuesApi = async (args: any) => {
  console.log(args);

  await sleep(2);

  const params = new URLSearchParams();

  if (args.state) {
    params.append('state', args.state);
  }

  if (args.labels > 0) {
    const labels = args.labels.join(',');
    params.append('labels', labels);
  }

  params.append('page', args.page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get('/repos/facebook/react/issues', {
    params,
  });

  return data;
};

export const getIssuesInfiniteApi = async (paramss: any) => {
  const [, , args] = paramss.queryKey;
  const page = paramss.pageParam;

  await sleep(2);

  const params = new URLSearchParams();

  if (args.state) {
    params.append('state', args.state);
  }

  if (args.labels > 0) {
    const labels = args.labels.join(',');
    params.append('labels', labels);
  }

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get('/repos/facebook/react/issues', {
    params,
  });

  return data;
};

export const getIssueApi = async (id: number) => {
  await sleep(2);
  const { data } = await githubApi.get(`/repos/facebook/react/issues/${id}`);

  return data;
};

export const getIssueCommentApi = async (id: number) => {
  await sleep(2);
  const { data } = await githubApi.get(
    `/repos/facebook/react/issues/${id}/comments`
  );

  return data;
};
