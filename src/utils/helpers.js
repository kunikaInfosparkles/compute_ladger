//map images dynamically
const images = import.meta.glob('/src/assets/images/*.{png,jpg,jpeg,svg,JPG}', { eager: true });

const image = Object.keys(images).reduce((acc, path) => {
  const fileName = path.split('/').pop(); // Extract file name (e.g., "photo.png")
  acc[fileName] = images[path].default || images[path];
  return acc;
}, {});


export default image;