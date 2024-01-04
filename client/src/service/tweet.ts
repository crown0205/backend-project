import request from "../network";

// react query를 사용해서, 불필요한 요청은 최소화 하기.
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
