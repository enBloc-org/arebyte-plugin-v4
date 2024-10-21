import "./ToggleSwitch.css"

export default function ToggleSwitch({
  clickHandler,
  isChecked
}: {
  clickHandler: () => void
  isChecked: boolean
}) {
  return (
    <label className="toggle--switch">
      <input
        onClick={clickHandler}
        checked={isChecked}
        className="toggle--input"
        type="checkbox"
      />
      <span className="toggle--slider" />
    </label>
  )
}
