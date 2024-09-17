import {FaGithub, FaLinkedin, FaLaptopCode, FaWhatsapp} from 'react-icons/fa6';

export const SocialMedia = () => {
  return (
    <div className=" md:my-3 md:py-4 ">
      <div className="flex justify-center gap-5  ">
        <a
          href="https://portfoliomacrountree.netlify.app/"
          target="_blank"
          className="hover:cursor-pointer  hover:scale-125  transition-transform duration-300 text-white "
        >
          <FaLaptopCode className="h-12 w-12" />
        </a>
        <a
          href="https://github.com/macRountree/Kcal_counter"
          target="_blank"
          className="hover:cursor-pointer  hover:scale-125  transition-transform duration-300 text-white "
        >
          <FaGithub className="h-12 w-12" />
        </a>
        <a
          href="https://www.linkedin.com/in/macrountree/"
          target="_blank"
          className=" hover:scale-125  transition-transform duration-300 text-white "
        >
          <FaLinkedin className="h-12 w-12" />
        </a>
        <a
          href="https://wa.me/526622277834"
          target="_blank"
          className=" hover:scale-125  transition-transform duration-300 text-white "
        >
          <FaWhatsapp className="h-12 w-12" />
        </a>
      </div>
    </div>
  );
};
