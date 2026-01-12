const images = [
  "https://cdn.pixabay.com/photo/2021/05/02/14/53/perfume-6223754_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/05/02/14/53/perfume-6223754_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/05/02/14/53/perfume-6223754_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/05/02/14/53/perfume-6223754_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/05/02/14/53/perfume-6223754_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/05/02/14/53/perfume-6223754_1280.jpg"
];

const InstagramSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-6xl font-light tracking-widest text-center mb-10">
          Instagram #SPAroma
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-5">
          {images.map((src, index) => (
            <div key={index} className="aspect-square overflow-hidden">
              <img src={src} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
