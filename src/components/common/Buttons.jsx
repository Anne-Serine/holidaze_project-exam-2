import { Link } from "react-router-dom";


function Button({ text, icon, id, type = "primary", onClick, url, title }) {

  const style = {
    primary: "bg-daze-primary p-2 px-4 border-daze-primary-op50 border-[5px] tracking-[0.5rem] text-daze-white font-light uppercase max-w-max mx-auto",
    secondary: "bg-daze-gray p-1 max-w-[10rem] w-full text-daze-accent tracking-wider uppercase",
    tertiary: "flex gap-2 items-center text-sm"
  }

  return url ? (
    <Link to={url} className={style[type]}>
      {icon}
      <span className="-mr-[0.25rem]">{text}</span>
    </Link>
  ) : (
    <button
      value={id}
      id={id}
      className={style[type]}
      onClick={(e) => onClick(e.target.value)}
      title={title}
    >
      {icon}
      <span className="-mr-[0.25rem]">{text}</span>
    </button>
  );
}

export default Button;
