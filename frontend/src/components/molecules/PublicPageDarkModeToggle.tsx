import DarkModeToggle from '../atoms/DarkModeToggle'

export default function PublicDarkModeToggle() {
  return (
    <div
      className="flex items-center"
      style={{ position: 'absolute', right: 15, top: 15 }}
    >
      <span className="text-colored mr-2">Dark Mode</span>
      <DarkModeToggle />
    </div>
  )
}
