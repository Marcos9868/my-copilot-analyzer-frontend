import { ButtonProps } from "@/interfaces/ButtonProps";

export function Button({ variant = 'primary', loading, children, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${variants[variant]}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
}