import React from 'react';
import { ReactComponent as Logo } from '../../../../assets/images/logo.svg';

interface IOwnerProps {
  style?: React.StyleHTMLAttributes<HTMLImageElement>;
  className?: string;
}
export default (props: IOwnerProps) => <Logo {...props} />;
