import ErrImg from "../assets/404.png";

export default function Err404() {
  return (
    <div className="flex justify-center items-center align-center h-screen">
        <img src={ErrImg} alt="err404" className=" w-80 h-fit float-animation" />
    </div>
  );
}
