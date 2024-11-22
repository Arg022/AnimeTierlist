import { ComponentProps } from "react";

interface IImage extends ComponentProps<"img"> {
  className: string;
  src: string;
  alt: string;
}

export const ImageAnime = ({ src, alt, className, ...props }: IImage) => {
  return <img src={src} alt={alt} className={className} {...props} />;
};
