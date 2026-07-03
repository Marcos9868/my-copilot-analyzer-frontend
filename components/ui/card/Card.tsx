import { CardProps } from "@/interfaces/CardProps";

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      {title && <h3 className="font-semibold text-lg mb-4">{title}</h3>}
      {children}
    </div>
  );
}