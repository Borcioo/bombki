import { useSelector } from "react-redux";
import bubblesList from "const/bubblesList";
import { canvasSize } from "const/canvasSettings";
import { useEffect, useState } from "react";
import translations from "const/translations.json";
import { translateObjectSizeToCanvasPixels } from "@/lib/utils";

const ExportTextures = ({ lang }) => {
  const [imagesData, setImagesData] = useState([]);
  const [imageCroppedPaths, setImageCroppedPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const obj = useSelector((state) => state.obj.obj);

  const bubble = useSelector((state) => state.bubble.bubble);
  const settings = useSelector((state) => state.settings.settings);
  const availableAreasIds = bubblesList.find((_bubble) => _bubble.id === bubble.id).printAreas.map((area) => area.id);
  const filteredSettingsAreas = settings.printAreas.filter((printAreaSetting) =>
    availableAreasIds.includes(printAreaSetting.id)
  );

  const generateImagePaths = async () => {
    const paths = await Promise.all(
      filteredSettingsAreas.map(async (printAreaSetting) => {
        const path = await createImageSrc(printAreaSetting);
        return { name: printAreaSetting.name, path };
      })
    );
    setImagesData(paths);
  };

  useEffect(() => {
    getImagesSizes();
    const generateCroppedImages = async () => {
      const croppedImages = await Promise.all(
        imagesData.map((imageData) => cropImage(imageData, translateObjectSizeToCanvasPixels(obj)))
      );
      setImageCroppedPaths(croppedImages);
      setIsLoading(false);
    };

    if (imagesData.length > 0) {
      generateCroppedImages();
    }
  }, [imagesData]);

  const downloadImage = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = async () => {
    setIsLoading(true);
    await generateImagePaths();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    imageCroppedPaths.forEach((path, index) => {
      downloadImage(path, `${bubble.name}-obszar-${index + 1}.png`);
    });
  };

  const getImagesSizes = async () => {
    const sizes = await Promise.all(
      filteredSettingsAreas.map(async (printAreaSetting) => {
        const path = await createImageSrc(printAreaSetting);
        const img = new Image();
        img.src = path;
        return new Promise((resolve) => {
          img.onload = function () {
            resolve({ width: img.width, height: img.height });
          };
        });
      })
    );
  };

  return (
    <>
      <button
        disabled={isLoading}
        className="w-full bg-[#2EA3F2] py-[10px] sm:py-[15px] rounded-[5px] text-white flex items-center justify-center gap-2"
        onClick={handleDownload}
      >
        {isLoading ? (
          <span>Generuje pliki...</span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2V13M10 13L14.5 8.5M10 13L5.5 8.5" stroke="#FCFDFF" />
              <path d="M3 14V17H17V14" stroke="#FCFDFF" />
            </svg>
            <span>{translations[lang].export}</span>
          </>
        )}
      </button>
    </>
  );
};

export default ExportTextures;

const cropImage = (imageData, canvasSizes) => {
  const { name, path } = imageData;
  const canvasSize = canvasSizes.find((canvasSize) => canvasSize.name === name);

  if (!canvasSize) {
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = canvasSize.size.width;
      canvas.height = canvasSize.size.height;
      const ctx = canvas.getContext("2d");

      const aspectRatio = canvasSize.size.width / canvasSize.size.height;

      // we need to crop image to this aspect ratio from center of image
      const imageAspectRatio = img.width / img.height;

      let newWidth;
      let newHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imageAspectRatio > aspectRatio) {
        newHeight = img.height;
        newWidth = img.height * aspectRatio;
        offsetX = (img.width - newWidth) / 2;
      } else {
        newWidth = img.width;
        newHeight = img.width / aspectRatio;
        offsetY = (img.height - newHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const newImagePath = URL.createObjectURL(blob);
          resolve(newImagePath);
        },
        "image/jpeg",
        1.0
      );
    };
  });
};

export const createImageSrc = async (printAreaSetting) => {
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (!printAreaSetting) {
    return null;
  }

  await drawImageAsync(ctx, printAreaSetting);

  if (printAreaSetting.texts?.length > 0) {
    drawTexts(ctx, printAreaSetting);
  }

  return canvas.toDataURL("image/png");
};

const drawImageAsync = (ctx, printAreaSetting) => {
  return new Promise((resolve, reject) => {
    const { image } = printAreaSetting;

    if (image?.src) {
      const { offset = { x: 0, y: 0 }, scale = 1 } = image;
      const img = new Image();

      img.onload = () => {
        try {
          ctx.drawImage(img, offset.x, offset.y, img.width * scale, img.height * scale);
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = (e) => {
        reject(new Error(`Failed to load image: ${e.message}`));
      };

      img.src = image.src;
    } else {
      resolve();
    }
  });
};

const drawTexts = (ctx, printAreaSetting) => {
  const { texts } = printAreaSetting;

  texts.forEach((text) => {
    const { position, content, size, font, color, align, bold, italic, stroke, underline } = text;
    let maxWidth = 0;
    let fontStyle = `${italic ? "italic" : ""} ${bold ? "bold" : ""}`;
    ctx.font = `${fontStyle} ${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "top";

    const lineHeight = size * 1.2;
    const lines = content.split("\n");

    lines.forEach((line) => {
      const metrics = ctx.measureText(line);
      maxWidth = Math.max(metrics.width, maxWidth);
    });

    lines.forEach((line, index) => {
      const linePositionY = position.y + index * lineHeight;

      const linePositionX =
        align === "left" ? position.x - maxWidth / 2 : align === "right" ? position.x + maxWidth / 2 : position.x;
      drawLine(ctx, line, linePositionX, linePositionY, stroke, align, underline, size, color);
    });
  });
};

const drawLine = (ctx, line, x, y, stroke, align, underline, size, color) => {
  ctx.fillText(line, x, y);

  if (stroke && stroke.width > 0) {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.strokeText(line, x, y);
    ctx.fillText(line, x, y);
  }

  if (underline) {
    const textWidth = ctx.measureText(line).width;

    let underlineStartX;
    if (align === "left") {
      underlineStartX = x;
    } else if (align === "right") {
      underlineStartX = x - textWidth;
    } else {
      underlineStartX = x - textWidth / 2;
    }

    const underlineEndX = underlineStartX + textWidth;

    const underlineY = y + size * 1.1;

    ctx.beginPath();
    ctx.moveTo(underlineStartX, underlineY);
    ctx.lineWidth = 5;
    if (stroke && stroke.width > 0) {
      ctx.strokeStyle = stroke.color;
    } else {
      ctx.strokeStyle = color;
    }
    ctx.lineTo(underlineEndX, underlineY);
    ctx.stroke();
  }
};
