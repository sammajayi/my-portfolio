
import logo from '/src/assets/images/my-logo-2.png'; // Import the logo

const Header = () => {
  return (
    <header className="flex justify-between p-5 h-[5rem] container">
      <div className="flex mt-[-2rem]">
        <img src={logo} alt="my-logo" className="h-28 w-auto  md:h-20 " />
      </div>

      <nav>
        <ul className="flex gap-8 text-black">
          <li className="hover:text-gray-200 text-xl cursor-pointer">HOME</li>
          <li className="hover:text-gray-200 text-xl cursor-pointer">ABOUT</li>
          <li className="hover:text-gray-200 text-xl cursor-pointer">PROJECTS</li>
          <li className="hover:text-gray-200 text-xl cursor-pointer">CONTACT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
