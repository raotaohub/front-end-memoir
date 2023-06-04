const getUrlParams = (href) => {
  const paramsObj = {};
  const str = href.substring(href.indexOf("?") + 1);

  str.split("&").map((item) => {
    const [key, value] = item.split("=");

    if (paramsObj[key]) {
      paramsObj[key] =
        typeof paramsObj[key] === "string" ? [paramsObj[key], value] : paramsObj[key].concat(value);
    } else {
      paramsObj[key] = value;
    }
  });
  return paramsObj;
};

console.log(getUrlParams("a=1&b=2&c=3&a=true&b=false"));
