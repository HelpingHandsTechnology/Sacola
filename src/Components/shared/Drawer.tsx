import DrawerModern from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

interface IProps {
  open: boolean;
  onClose(): void;
  direction?: "top" | "left" | "right" | "bottom";
  children?: React.ReactNode;
}

export const Drawer = ({
  onClose,
  open,
  children,
  direction = "top",
}: IProps) => {
  return (
    <DrawerModern
      {...{
        onClose,
        open,
        children,
        direction,
      }}
    >
      {children}
    </DrawerModern>
  );
};
