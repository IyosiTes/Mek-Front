type Props = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({
  title,
  subtitle,
}: Props) {
  return (
    <header className="space-y-2 text-center">
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

      <p className="text-sm leading-6 text-zinc-400">
        {subtitle}
      </p>
    </header>
  );
}