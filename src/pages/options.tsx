import { IoClose } from "react-icons/io5";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Options() {
  return (
    <>
      <div className="flex items-center">
        {<IoClose className="self-start" />}
        <h6>Opções</h6>
      </div>
      <hr />
      <div className="flex flex-col">
        <div>
          <p>Sua conta</p>
          {<AiOutlineArrowRight />}
        </div>
        <hr />
        <div>
          <p>Seja Premium</p>
          {<AiOutlineArrowRight />}
        </div>
        <hr />
        <div>
          <p>Restaurar assinatura existente</p>
          {<AiOutlineArrowRight />}
        </div>
        <hr />
        <div>
          <p>Ajuda</p>
          {<AiOutlineArrowRight />}
        </div>
        <hr />
        <button>
          <p>Sair</p>
          {<BsArrowBarRight />}
        </button>
      </div>
    </>
  );
}
