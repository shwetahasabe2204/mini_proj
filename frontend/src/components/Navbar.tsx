import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import { newPropertySheetAtom, filterSheetAtom } from "../store/sheetAtom"; // ✅ Import both

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
      onClick={() => navigate(path)}
    >
      {title}
    </div>
  );
};

const Navbar = () => {
  const authToken = localStorage.getItem("authToken");
  const setNewPropertySheet = useSetAtom(newPropertySheetAtom);
  const setFilterSheet = useSetAtom(filterSheetAtom); // ✅ Hook for filter sheet
  const navigate = useNavigate();

  const handleOpenFilter = () => {
    setFilterSheet({
      isOpen: true,
      budget: 0,
      city: '',
    });
  };

  const handleOpenListing = () => {
    setNewPropertySheet(true);
  };

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
        {!authToken && (
          <Button className="text-white cursor-pointer" onClick={handleOpenFilter}>
            Add filter
          </Button>
        )}
        {authToken && (
          <Button className="text-white cursor-pointer" onClick={handleOpenListing}>
            Add listing
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
