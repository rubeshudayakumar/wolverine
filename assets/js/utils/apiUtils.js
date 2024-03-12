export const ajaxCall = (url, loadingSelector) => {
  let data;
  data = $.ajax({
    async: false,
    type: "get",
    url: url,
  });
  return data;
};
