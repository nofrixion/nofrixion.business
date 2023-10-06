import CopyLinkButton from '../CopyLinkButton/CopyLinkButton'

export const CopyLink = ({ link }: { link: string }) => {
  return (
    <div className="flex items-center h-10 rounded-full justify-between px-4 pr-4 shadow-[0_0_0.5rem_rgba(4,41,49,0.15)] text-[0.813rem] relative bg-white">
      <span className="whitespace-nowrap overflow-x-clip">{link}</span>
      <div className="w-14 h-6 bg-gradient-to-l from-white right-[5.5rem] absolute pointer-events-none"></div>
      <CopyLinkButton variant="hoverable" link={link} className="absolute right-0 mr-2" />
    </div>
  )
}
