import { IoClose } from "react-icons/io5";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Options() {
  return (
    <div>
      <div className="flex items-center justify-center p-12  text-gray-200">
        <h6 className="text-base">Opções</h6>
        {<IoClose size={20} className="ml-4" />}
      </div>
      <hr />
      <div className="flex flex-col justify-evenly  text-gray-200">
        <div className="flex items-center justify-center p-12">
          <p className="text-base">Sua conta</p>
          {<AiOutlineArrowRight size={20} className="ml-4 s" />}
        </div>
        <hr />
        <div className="flex items-center justify-center p-12">
          <p className="text-base">Seja Premium</p>
          {<AiOutlineArrowRight size={20} className="ml-4" />}
        </div>
        <hr />
        <div className="flex items-center justify-center p-12">
          <p className="text-base">Restaurar assinatura existente</p>
          {<AiOutlineArrowRight size={20} className="ml-4" />}
        </div>
        <hr />
        <div className="flex items-center justify-center p-12">
          <p className="text-base">Ajuda</p>
          {<AiOutlineArrowRight size={20} className="ml-4" />}
        </div>
        <hr />
        <button className="flex items-center justify-center p-12">
          <p className="text-base">Sair</p>
          {<BsArrowBarRight size={20} className="ml-4" />}
        </button>
      </div>
    </div>
  );
}
