import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Tags,
  Building2,
  Percent,
  ShoppingBag,
  UserCheck,
  Image,
  PenTool
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Panel de control", path: "/admin" },
  { icon: BookOpen, label: "Gestión de libros", path: "/admin/libros" },
  { icon: Tags, label: "Gestión de géneros", path: "/admin/generos" },
  { icon: Building2, label: "Gestión de editoriales", path: "/admin/editoriales" },
  { icon: PenTool, label: "Gestión de autores", path: "/admin/autores" },
  { icon: Percent, label: "Gestión de descuentos", path: "/admin/descuentos" },
  { icon: ShoppingBag, label: "Ver pedidos", path: "/admin/pedidos" },
  { icon: UserCheck, label: "Ver usuarios", path: "/admin/usuarios" },
  { icon: Image, label: "Gestión de imágenes", path: "/admin/imagenes" },
];

function Sidebar() {
  return (
    <aside className="w-56 bg-[#7b5b99] min-h-screen fixed left-0 top-0">

      <div className="p-5">
        <div className="bg-white p-2 rounded">
          <img
            src="/logo.png"
            alt="Entre Letras"
            className="w-full h-auto"
          />
        </div>
      </div>

      <nav className="mt-10 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 text-sm text-white/90 text-left transition-colors ${
                  isActive
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={15} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;