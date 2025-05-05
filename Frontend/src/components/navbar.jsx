import {Link} from 'react-router-dom'
import CatalogSearch from '../assets/CatalogSearch.svg'
import SearchSvg from '../assets/Search.svg'
import FavoritesSvg from '../assets/Favorites.svg'
import ProfileSvg from '../assets/User.svg'
import AISvg from '../assets/AI.svg'

function Navbar() {
    return (
        <>
            <nav className='py-4 flex items-center mx-auto justify-center width-container '>
                <Link to="/catalog" className='h-10 mx-1 min-w-32 purple bg-white rounded-2xl py-2 hidden md:flex items-center gap-1 justify-center m-auto'>
                    <img className='h-7 w-7' src={CatalogSearch} alt="" />
                    <p className='text-base purple font-semibold'>Catalog</p>
                </Link> 
                <form className='flex mx-2 items-center gap-2 ml-5 border-2 rounded-3xl w-lg m-auto' style={{ borderColor: '#3B3B3B' }}>
                    
                    <input type="text" placeholder='Search your favourite product' className='h-12 w-full rounded-3xl px-4 py-2' />
                    <button className='h-10 purple rounded-xl px-4 py-2'><img className='h-7 w-7' src={SearchSvg} alt="" /></button>
                </form>
                <Link to="/" className='hidden md:flex mx-3 flex-col items-center justify-center h-12 w-22 m-auto '>
                    <img src={FavoritesSvg} className='w-5 h-5' alt="" />
                    <p>Favorites</p>
                </Link>
                <Link to="/assistent" className='hidden md:flex flex-col mx-3 items-center justify-center h-12 w-22 m-auto '>
                    <img src={AISvg} className='w-5 h-5' alt="" />
                    <p>Assistent</p>
                </Link>
                <Link to="/" className='hidden md:flex flex-col mx-3 items-center justify-center h-12 w-22 m-auto '>
                    <img src={ProfileSvg} className='w-5 h-5' alt="" />
                    <p>Profile</p>
                </Link>
                
            </nav>
            
        </>
    );
}

export default Navbar;