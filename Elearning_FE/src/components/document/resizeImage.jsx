// src/helpers/resizeImage.js
export const resizeImage = (file, maxWidth, maxHeight, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(callback, 'image/jpeg', 0.7); // Tạo blob hình ảnh giảm kích thước
    };
  };
};
