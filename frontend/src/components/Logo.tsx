import { ImgHTMLAttributes } from 'react'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export const StarterLogo = (props: ImageProps) => (
  <img alt="Starter" {...props} src="/logo512.png" />
)

export function LogoHeader(props: { title?: string }) {
  return (
    <div>
      <StarterLogo className="mx-auto w-auto h-32" />
      {props.title && (
        <h2 className="mt-6 text-center text-3xl font-extrabold text-e-gray-30">
          {props.title}
        </h2>
      )}
    </div>
  )
}
