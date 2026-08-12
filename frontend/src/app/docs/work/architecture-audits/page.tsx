import { DocsShell } from '@/components/docs/DocsShell';
import AuditIntro from '@/components/audit/AuditIntro';
import WhatThisIs from '@/components/audit/WhatThisIs';
import WhatWeAnalyze from '@/components/audit/WhatWeAnalyze';
import Deliverables from '@/components/audit/Deliverables';
import WhoThisIsFor from '@/components/audit/WhoThisIsFor';
import AuditCTA from '@/components/audit/AuditCTA';
export default function ArchitectureAuditsDocsPage() { return <DocsShell eyebrow="Docs / Work" title="Architecture Audits" description="A structured technical assessment to determine what should be built, connected, owned or reconsidered."><AuditIntro/><WhatThisIs/><WhatWeAnalyze/><Deliverables/><WhoThisIsFor/><AuditCTA/></DocsShell>; }
