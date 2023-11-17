import { useSelector, useDispatch } from "react-redux";
import bubblesList from "const/bubblesList";
import { canvasSize } from "const/canvasSettings";
import { useEffect } from "react";
import { setTexturesImages } from "@/store/texturesImagesSlice";

const InvisibleCanvas = () => {
  const dispatch = useDispatch();

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
    dispatch(setTexturesImages(paths));
  };

  useEffect(() => {
    generateImagePaths();
  }, [settings]);

  return null;
};

export default InvisibleCanvas;

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
