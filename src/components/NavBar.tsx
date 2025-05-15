
import { User } from "lucide-react";

const NavBar = () => (
  <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-3 py-2 d-flex align-items-center" style={{minHeight: "64px"}}>
    <div className="container-fluid flex justify-between items-center">
      <span className="navbar-brand fw-bold text-primary fs-4 tracking-wide" style={{letterSpacing: "2px"}}>
        AI Image Prompt
      </span>
      <button className="btn btn-light rounded-circle border ms-auto" type="button" aria-label="Profil utilisateur" style={{width:"42px", height:"42px"}}>
        <User size={22} />
      </button>
    </div>
  </nav>
);

export default NavBar;
