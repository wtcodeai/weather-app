/* eslint-disable jsx-a11y/anchor-is-valid */
import { forwardRef, FC, HTMLProps } from "react";

interface IProps {
  onSuccessfullyClicked?: Function;
}

type AnchorProps = HTMLProps<HTMLAnchorElement> 

export const CustomToggle: FC<IProps> = forwardRef<HTMLAnchorElement, AnchorProps & IProps>(
  ({ children, onClick, onSuccessfullyClicked }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        onSuccessfullyClicked?.()
      }}
    >
      {children}
      &#x25bc;
    </a>
  )
);