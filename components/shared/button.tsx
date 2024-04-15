import { isValidElement, cloneElement } from 'react';
import { ButtonProps, ButtonSlotProps } from '@/types';
import { clsx } from 'clsx';
import style from '@/styles/button.module.css';

const ButtonSlot = ({ children, ...rest }: ButtonSlotProps) => {
  if (isValidElement(children)) {
    return cloneElement(children, {
      ...rest,
      ...children.props,
      className: `${rest.className} ${children.props.className}`
    });
  }
  return null;
};

// Allows rendering button as its child component (useful w/ router links)
// <Button asChild>
//  <Link href="/"></Link>
// </Button> 
const Button = ({ asChild = false, size = 'lg', className = '', ...rest }: ButtonProps) => {
  const Component = asChild ? ButtonSlot : 'button';
  return (
    <Component {...rest} className={clsx(style.button, className, {
      [style.sm]: size === 'sm'
    })} />
  )
};

export default Button;
