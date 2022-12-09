/**
 * 生成uuid唯一识别码
 * @param len       生成的uuid长度
 * @param radix     生成的uuid的进位(二进制-2；十进制-10；十六进制-16)
 * @returns {*}
 */

const createUuid = (len: number, radix?: number) => {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  let uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
};

// 获取图片宽高
const getImgInfo = (url: string) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    let timer = setInterval(function () {
      if (img.width > 0 || img.height > 0) {
        resolve({
          width: img.width,
          height: img.height,
        });
        clearInterval(timer);
      }
    }, 50);
  });
};

export { createUuid, getImgInfo };
