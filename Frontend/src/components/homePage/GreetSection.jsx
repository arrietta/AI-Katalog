import Background from '../../assets/home/Backgrounds/Greet Section.jpg';
import { Link } from 'react-router-dom';
const GreetSection = () => {
    return (
        <section className='flex flex-col items-center justify-center bg-cover bg-no-repeat xl:bg-contain bg-center  ' style={{ backgroundImage: `url(${Background})`, height: '724px', backgroundPositionX: '100%' }}>
            <div className="z-10 w-4xl ">
                <h1 className="text-4xl font-bold leading-snug mb-4">
                    Discover Trending <br /> Products & Ask Your <br /> AI Consultant
                </h1>
                <p className="text-gray-400 mb-8">
                    Get Advice, Explore Features, And Shop Smarter With AI Guidance.
                </p>
                <Link to="/assistent">
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-lg py-3 px-6 rounded-full mb-10">
                        🚀 Get Started
                    </button>
                </Link>

                {/* Метрики */}
                <div className="flex gap-14 text-white/80">
                    <div>
                        <div className="text-2xl font-semibold">40K+</div>
                        <div className="text-sm">Products</div>
                    </div>
                    <div>
                        <div className="text-2xl font-semibold">20+</div>
                        <div className="text-sm">Sellers</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GreetSection
