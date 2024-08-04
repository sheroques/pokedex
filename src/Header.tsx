import React, {ChangeEvent} from "react";
import pokebola from '../src/assets/pokebola.jpg';

interface HeaderProps{
  onSearch:(query:string)=>void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
 return(
<header className="bg-white p-4 text-black w-full fixed shadow-lg z-50" >
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <div className="flex items-center mb-4 md:mb-0">
          <img src={pokebola} alt="pokebola" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold font-sans">Pokedex</h1>
        </div>
        <div className="w-full md:w-auto" >
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-md border border-gray-400 text-black" 
            placeholder="Pesquisar pokemon..."
            onChange={handleChange}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;

