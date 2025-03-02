export default function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl md:text-4xl font-black py-5">{children}</h1>;
}
