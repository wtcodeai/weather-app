import { FC, forwardRef, HTMLProps, useState } from 'react'
import { GeolocationSelect } from './GeolocationSelect';

type DivProps = HTMLProps<HTMLDivElement>

export const CustomDropdown: FC = forwardRef<HTMLDivElement, DivProps>(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <GeolocationSelect />
      </div>
    );
  },
);