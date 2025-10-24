interface Props {
  title: string;
  description: string;
}

export function Header({ title, description }: Props) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">🐯</span>
        </div>
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xs text-blue-200">{description}</p>
        </div>
      </div>
    </div>
  );
}
