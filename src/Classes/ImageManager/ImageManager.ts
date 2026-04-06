export class ImageManager {
  images: { [key: string]: HTMLImageElement } = {};

  addImage(key: string, src: string, width: number, height: number) {
    const image = new Image();
    image.src = src;
    image.width = width;
    image.height = height;
    this.images[key] = image;
  }

  getImage(key: string): HTMLImageElement | undefined {
    return this.images[key];
  }

  getImageDimensions(
    key: string,
  ): { width: number; height: number } | undefined {
    const image = this.images[key];
    if (image) {
      return { width: image.width, height: image.height };
    }
    return undefined;
  }
}
