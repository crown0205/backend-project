import request from "../network";

export interface ITweet {
  id: number;
  text: string;
  userId: number;
  username: string;
  name: string;
  url?: string;
}

export async function getAllTweets() {
  const { data } = await request<void, ITweet[]>({
    method: "get",
    url: "/tweets",
  });

  return data;
}

interface IContent {
  text: string;
}

export async function tweetPost(body: IContent) {
  const { data } = await request<IContent, ITweet>({
    method: "post",
    url: "/tweets",
    requestBody: body,
  });

  return data;
}
