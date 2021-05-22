import { NextPageContext } from "next"
import { ErrorProps } from "next/error"
import Image from "next/image"

function Error({ statusCode }: ErrorProps): React.ReactNode {
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
        {statusCode}
        <br />
        Oops! An unexpected error has occurred. Please contact the authors on GitHub
        about how you got here.
      </h1>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
