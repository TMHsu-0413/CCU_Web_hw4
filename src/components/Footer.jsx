import React from "react";
import { BsGithub, BsFacebook, BsDiscord } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <hr className="border-1 border-solid border-e-gray-700 w-100"/>
      <div className="flex gap-4 p-3">
        <a href="https://github.com/TMHsu-0413" className="visited:text-black"><BsGithub className="text-5xl"/></a>
        <a href="https://www.facebook.com/profile.php?id=100008041262760" className="visited:text-black"><BsFacebook className="text-5xl" /></a>
        <a href="https://discord.com/users/412464606183817226" className="visited:text-black"><BsDiscord className="text-5xl"/></a>
      </div>
      <h2 className="text-xl">Copyright &copy; Denny Hsu 2023</h2>
    </div>
  )
}

export default Footer;
