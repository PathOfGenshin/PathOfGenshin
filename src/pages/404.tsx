import Image from "next/image"

export default function Custom404(): React.ReactNode {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Image
        src="/paimon-sticker.png"
        alt="Paimon Sticker"
        layout="intrinsic"
        width={192}
        height={166}
      />
      <h1 className="py-4 px-2 text-lg text-center">
        Huh? It seems like this page doesn&apos;t exist.
        <br />
        Ask Paimon to bring you back home!
      </h1>
    </div>
  )
}
