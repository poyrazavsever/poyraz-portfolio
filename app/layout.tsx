import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a `[locale]` layout, this layout is just a placeholder
// that passes children through.
export default function RootLayout({ children }: Props) {
  return children;
}
