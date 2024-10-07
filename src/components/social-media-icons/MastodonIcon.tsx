const MastodonIcon = ({ width = "2rem", height = "2rem" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm5.25 17.25h-1.5v-1.5h1.5v1.5zm-3-3h-1.5v-1.5h1.5v1.5zm-3 0h-1.5v-1.5h1.5v1.5zm-3 3h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-1.5h1.5v1.5zm3 0h-1.5v-1.5h1.5v1.5zm3 0h-1.5v-1.5h1.5v1.5zm3 3h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-1.5h1.5v1.5z"
      />
    </svg>
  )
}

export default MastodonIcon
