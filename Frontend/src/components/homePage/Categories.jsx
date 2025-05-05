import computers from '../../assets/home/Category/Computer.jpg';
import tv from '../../assets/home/Category/TV.jpg';
import photo from '../../assets/home/Category/Camera.jpg';
import audio from '../../assets/home/Category/Audio.jpg';
import home from '../../assets/home/Category/AirConditioner.jpg';
import kitchen from '../../assets/home/Category/Teepod.jpg';
import sport from '../../assets/home/Category/Bike.jpg';
import fаurniture from '../../assets/home/Category/Chair.jpg';

const categories = [
  { name: 'Computers', image: computers },
  { name: 'TV and monitors', image: tv },
  { name: 'Photo and Video', image: photo },
  { name: 'Audio', image: audio },
  { name: 'Home electronics', image: home },
  { name: 'Kitchen appliances', image: kitchen },
  { name: 'Sport', image: sport },
  { name: 'Furniture', image: fаurniture },
];

const Categories = () => {
    return (
      <section className="px-10 py-16 w-full max-w-5xl flex flex-col mx-auto">
        <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-[#3B3B3B] rounded-xl overflow-hidden text-center">
              <div className="bg-white p-4">
                <img src={cat.image} alt={cat.name} className="mx-auto h-32 object-contain" />
              </div>
              <div className="p-3 text-sm font-medium">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Categories;
