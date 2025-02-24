import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-40 h-36">
        <Image
          fill
          alt="Logotipo Fresh Coffee"
          src="/logo-light.svg"
          className="block dark:hidden"
        />

        <Image
          fill
          alt="Logotipo Fresh Coffee"
          src="/logo-dark.svg"
          className="hidden dark:block"
        />
      </div>
    </div>
  );
}
