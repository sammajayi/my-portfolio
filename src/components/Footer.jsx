import logo from "../assets/images/my-logo-2.png";

const Footer = () => {
  return (
    <footer className="flex justify-between p-[1rem]">
      <div className="flex flex-col mt-[-1rem]">
        <img src={logo} alt="my-logo" className="h-28 w-20  md:h-20" />

        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
      </div>

      <div className="flex flex- gap-5 mt-10">
        <a
          href="https://github.com/sammajayi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200 cursor-pointer"
        >
          <img
            src="./src/assets/images/social-icons/github-fill.svg"
            alt="github-icon"
            className="w-9 h-9"
          />
        </a>

        <a
          href="https://linkedin.com/in/samuel-ajayi-"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200 cursor-pointer"
        >
          <img
            src="./src/assets/images/social-icons/linkedin-box-fill.svg"
            alt="linkedin-icon"
            className="w-9 h-9"
          />
        </a>

        <a
          href="mailto:samuelajayi554@gmail.com"
          className="hover:text-gray-200 cursor-pointer"
        >
          <img
            src="./src/assets/images/social-icons/mail-fill.svg"
            alt="mail-icon"
            className="w-9 h-9"
          />
        </a>

        <a
          href="https://twitter.com/sammajayi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200 cursor-pointer"
        >
          <img
            src="./src/assets/images/social-icons/twitter-x-line.svg"
            alt="icon"
            className="w-9 h-9"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
