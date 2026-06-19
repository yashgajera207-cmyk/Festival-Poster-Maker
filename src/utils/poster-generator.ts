import {
  toPng,
  toJpeg,
} from "html-to-image";

export async function downloadPNG(
  elementId: string,
  fileName: string
) {
  try {
    const element =
      document.getElementById(
        elementId
      );

    if (!element) {
      throw new Error(
        "Element not found"
      );
    }

    const dataUrl =
      await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
      });

    const link =
      document.createElement("a");

    link.download =
      `${fileName}.png`;

    link.href = dataUrl;

    link.click();

    return dataUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function downloadJPG(
  elementId: string,
  fileName: string
) {
  try {
    const element =
      document.getElementById(
        elementId
      );

    if (!element) {
      throw new Error(
        "Element not found"
      );
    }

    const dataUrl =
      await toJpeg(element, {
        quality: 0.95,
        pixelRatio: 2,
      });

    const link =
      document.createElement("a");

    link.download =
      `${fileName}.jpg`;

    link.href = dataUrl;

    link.click();

    return dataUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPosterBase64(
  elementId: string
) {
  const element =
    document.getElementById(
      elementId
    );

  if (!element) {
    throw new Error(
      "Element not found"
    );
  }

  return await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  });
}

export async function blobFromBase64(
  base64: string
) {
  const response =
    await fetch(base64);

  return await response.blob();
}