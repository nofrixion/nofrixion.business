export interface ChipProps {
  label: string
}

const Chip = ({ label }: ChipProps) => {
  return (
    <span className="text-[#454D54] hover:bg-grey-bg px-3 py-1 rounded-[0.25rem] border-[#ABB2BA] border-[0.063rem] border-solid text-xs whitespace-nowrap inline-block align-middle">
      {label}
    </span>
  )
}

export default Chip
