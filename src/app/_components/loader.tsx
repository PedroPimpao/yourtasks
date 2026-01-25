import Logo from "./logo";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Logo />
      <div className="flex flex-row gap-2">
        <span>Carregando...</span>
        <Loader className=" text-green-300"/>
      </div>
    </div>
  );
};

export default Loading;
