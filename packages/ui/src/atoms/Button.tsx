import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return <button className="bg-red-400 rounded p-6" {...props} />;
};
