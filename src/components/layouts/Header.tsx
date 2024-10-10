import { Link } from "react-router-dom";


const Header = () => {

  return (
    <header className="bg-card sticky top-0 z-50">
      <div className="mx-auto container px-2 py-2 flex">
        <Link className="mr-8" to="/">
          <h1 className="text-xl text-white">阵容计算器</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
