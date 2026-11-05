import { ArchiveHeader } from './ArchiveHeader'
import { ArchiveDescription } from './ArchiveStyles'
import { DebateList } from './DebateList'
import { debates } from './archiveData'

export default function ArchivePage() {
  return (
    <>
      <ArchiveHeader title="지난 토론" />
      <ArchiveDescription>토론 기록 {debates.length}개</ArchiveDescription>
      <DebateList debates={debates} />
    </>
  )
}
