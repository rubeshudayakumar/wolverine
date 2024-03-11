export const ajaxCall = (url, loadingSelector) => {
  let data;
  $.ajax({
    async: false,
    type: "get",
    url: url,
    dataType: "json",
  });
  return data;
};
