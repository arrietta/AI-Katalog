// Основные карточки
import phoneImg from '../../assets/home/icons/Phone.jpg';
import laptopImg from '../../assets/home/icons/Laptop.jpg';
import cameraImg from '../../assets/home/icons/Camera.png';

// Превью снизу
import monitorImg from '../../assets/home/icons/Monitor.jpg';
import speakerImg from '../../assets/home/icons/Speeker.jpg';
import gimbalImg from '../../assets/home/icons/TeePod.jpg';
import coffeeImg from '../../assets/home/icons/Coffee.jpg';
import kettleImg from '../../assets/home/icons/Blender.jpg';
import clockImg from '../../assets/home/icons/Clock.jpg';

const TrendingSection = () => {
    const mainImages = [phoneImg, laptopImg, cameraImg];

  const previewItems = [
    monitorImg,
    speakerImg,
    'counter',
    gimbalImg,
    coffeeImg,
    'counter',
    kettleImg,
    clockImg,
    'counter',
  ];

  return (
    <section className="text-white px-10 py-16 flex flex-col mx-auto gap-10 w-full max-w-5xl">
      <div className="mb-10 ms-10">
        <h2 className="text-4xl font-bold mb-2">Trending Collection</h2>
        <p className="text-gray-400">
          Checkout Our Weekly Updated Trending Collection.
        </p>
      </div>

      {/* Основные карточки */}
      <div className="flex justify-center gap-6 ">
        {mainImages.map((src, i) => (
          <div
            key={i}
            className="w-[268px] h-[268px] rounded-3xl overflow-hidden"
          >
            <img src={src} alt="product" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>

      {/* Превью снизу */}
      <div className="flex justify-center flex-wrap gap-4">
        {previewItems.map((item, i) =>
          item === 'counter' ? (
            <div
              key={i}
              className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center text-white font-semibold text-sm"
            >
              1025+
            </div>
          ) : (
            <div
              key={i}
              className="w-20 h-20 rounded-3xl overflow-hidden "
            >
              <img src={item} alt="preview" className="object-cover w-full h-full" />
            </div>
          )
        )}
      </div>
    </section>
  );
};
export default TrendingSection;