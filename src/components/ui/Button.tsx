import { motion } from "framer-motion";

const buttonVarients = {
  click: { scale: 0.9 },
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      type: "linear",
    },
  },
};

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ children, className = "", onClick }: Props) {
  return (
    <motion.button
      variants={buttonVarients}
      initial="normal"
      animate="animate"
      whileTap="click"
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export default Button;
