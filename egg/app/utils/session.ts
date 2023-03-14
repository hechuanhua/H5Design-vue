import axios from "axios";

async function getShortSession() {
  const res = await axios.get("http://baidu.com/login/");
  const cookies = res.headers["set-cookie"]!;
  const shortSession = cookies[0].split(/[=;]/)[1];
  const textArray = res.data.split("\n");
  let csrfToken = "";
  for (let i = 0; i < textArray.length; i++) {
    const text = textArray[i];
    if (text.indexOf("csrf_token") >= 0) {
      const index1 = text.indexOf('value="');
      const index2 = text.indexOf('"', index1 + 20);
      csrfToken = text.substring(index1 + 7, index2);
      break;
    }
  }
  return {
    shortSession,
    csrfToken,
  };
}

async function login(shortSession, csrfToken) {
  const data = `csrf_token=${csrfToken}&username=push&password=push@jiguang.cn`;
  const res = await axios.request({
    url: "http://baidu.com/login/",
    maxRedirects: 0,
    validateStatus: (status: number) => status === 302,
    headers: {
      Cookie: "session=" + shortSession,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    data,
  });
  const cookies = res.headers["set-cookie"]!;
  const longSession = cookies[0].split(/[=;]/)[1];
  return longSession;
}

export async function takeSession() {
  const res = await getShortSession();
  console.log("getShortSession", res);
  const longSession = await login(res.shortSession, res.csrfToken);
  console.log("longSession", longSession);
  return longSession;
}
