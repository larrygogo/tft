import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#08042e]">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
