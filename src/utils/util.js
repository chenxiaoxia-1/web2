import { Message } from "element-ui";

export async function copyToClipboard(
  text,
  lang = "cn",
  onSuccess,
  onFallback,
) {
  const isCn = lang === "cn";

  const messages = {
    success: isCn ? "复制成功" : "Copy successful",
    fallback: isCn ? "复制失败" : "Copy failed",
    error: isCn ? "复制失败" : "Copy failed",
  };

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      Message({
        message: messages.success,
        type: "success",
        duration: 1500,
      });
      if (onSuccess) onSuccess(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      opacity: 0;
      width: 1px;
      height: 1px;
    `;
    document.body.appendChild(textArea);

    textArea.select();
    textArea.setSelectionRange(0, 99999);

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      Message({
        message: messages.success,
        type: "success",
        duration: 1500,
      });
      if (onSuccess) onSuccess(text);
    } else {
      Message({
        message: messages.fallback,
        type: "warning",
        duration: 2000,
      });
      if (onFallback) onFallback(text);
    }
  } catch (err) {
    console.error("复制失败:", err);
    Message({
      message: messages.error,
      type: "error",
      duration: 2000,
    });
    if (onFallback) onFallback(text);
  }
}
