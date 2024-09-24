import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#08042e] text-[#ada9c8]">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
