export const exportToJSONFile = (
  jsonObject: string,
  fileName = "quiz.json",
) => {
  const blob = new Blob([jsonObject], { type: "application/json" });

  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  URL.revokeObjectURL(url);
};
