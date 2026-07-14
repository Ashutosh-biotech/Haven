interface AboutResortProps {
  description: string;
  categories: string[];
}

export default function AboutResort({ description, categories }: AboutResortProps): React.ReactNode {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Resort</h2>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="text-sm font-bold text-gray-800 border-b-2 border-teal-500 pb-0.5 hover:text-teal-600 transition-colors cursor-default"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
