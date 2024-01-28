import { Logo, Profile, Search } from "./atoms";

const Header = async () => {
  return (
    <section className="px-[4%] w-full font-body shadow-dashboard-header h-fit sticky top-0 left-0  py-[19px] gap-4 flex items-center justify-between shadow-header bg-primary_white border-[#D2D2D2] bg-[#FFFFFF] z-50">
      <Logo className="lg:hidden" />
      {/* <Search /> */}
      <Profile />
    </section>
  );
};

export default Header;
