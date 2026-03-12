
import { ClipLoader } from "react-spinners";

type LoaderSpinnerProps = {
  size?: number;
  color?: string;
};

export default function LoaderSpinner({ size = 30, color = "#3498db" }: LoaderSpinnerProps) {
  return (
    <div className="flex justify-center items-center py-4">
      <ClipLoader color={color} size={size} />
    </div>
  );
}