import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import  {newPropertySheetAtom} from "../store/sheetAtom"; 

type MenuIconProps = {
  title: string;
  path: string;
  navigate: (path: string) => void;
};

const menus = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contacts",
    path: "/contacts",
  },
];

const MenuIcon = ({ title, path, navigate }: MenuIconProps) => {
  return (
    <div
      className="p-4 px-8 cursor-pointer text-white hover:bg-blue-500"
      onClick={() => {
        navigate(path);
      }}
    >
      {title}
    </div>
  );
};

const Navbar = () => {
  const setIsOpen = useSetAtom(newPropertySheetAtom); // <-- Jotai hook
  const navigate = useNavigate();

  return (
    <div className="flex bg-blue-900 justify-between items-center">
      <div className="flex">
        {menus.map((menu) => (
          <div key={menu.path}>
            <MenuIcon title={menu.title} path={menu.path} navigate={navigate} />
          </div>
        ))}
      </div>
      <div>
        {/* Optional search input here */}
        <Button
          className="text-white cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Add listing
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
