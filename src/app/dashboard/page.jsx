import { permanentRedirect } from "next/navigation";

const page = () => {
  permanentRedirect("/dashboard/earn");
};

export default page;
