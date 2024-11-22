import { ComponentProps, ReactNode } from "react";

interface ICard extends ComponentProps<"div"> {
  contents: string;
  children: ReactNode;
  small?: boolean; // Aggiunto per differenziare la variante
}

export const Card = ({
  contents,
  children,
  small = false,
  ...props
}: ICard) => {
  return (
    <div
      className={`card  ${small ? "bg-base-200 w-24" : "bg-base-100 w-40 p-4"}`}
      {...props}
    >
      {children}
      {!small && (
        <div className="card-body">
          <small>{contents}</small>
        </div>
      )}
    </div>
  );
};
