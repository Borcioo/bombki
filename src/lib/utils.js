import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Box3, Vector3 } from "three";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Control functions for img adjustments on 2d canvas for image
 */

export const offsetText = ({ direction, setCanvas2dSettings }) => {
  setCanvas2dSettings((prevSettings) => {
    const step = 25;
    let newOffsetX = prevSettings.text.position.x;
    let newOffsetY = prevSettings.text.position.y;

    switch (direction) {
      case "left":
        newOffsetX -= step;
        break;
      case "right":
        newOffsetX += step;
        break;
      case "up":
        newOffsetY -= step;
        break;
      case "down":
        newOffsetY += step;
        break;
      default:
        break;
    }
    return { ...prevSettings, text: { ...prevSettings.text, position: { x: newOffsetX, y: newOffsetY } } };
  });
};

export const translateObjectSizeToCanvasPixels = (obj) => {
  let canvas2dSizes = [];
  if (!obj || !obj.children) return [];

  obj.children.forEach((child) => {
    const boundingBox = new Box3().setFromObject(child);
    const objectDimensions = new Vector3();
    boundingBox.getSize(objectDimensions);

    const objWidth = objectDimensions.z;
    const objHeight = objectDimensions.y;
    const aspectRatio = objWidth / objHeight;

    let canvas2dSize;
    if (aspectRatio >= 1) {
      canvas2dSize = { width: 1024, height: 1024 / aspectRatio };
    } else {
      canvas2dSize = { height: 1024, width: 1024 * aspectRatio };
    }

    canvas2dSizes.push({ name: child.name, size: canvas2dSize });
  });

  return canvas2dSizes;
};

export const getCurrentPrintArea = ({ settings, printArea }) => {
  const printAreas = settings?.printAreas;
  if (!printAreas) return null;
  const currentPrintArea = printAreas.find((area) => area.id === printArea?.id);
  return currentPrintArea;
};

export const generateNextTextId = (texts) => {
  let maxId = texts.reduce((max, text) => (text.id > max ? text.id : max), texts[0]?.id || 0);
  return maxId + 1;
};
