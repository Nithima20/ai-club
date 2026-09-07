import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { StatTile } from '@/components/dashboard/widgets'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Users, Compass, Shield } from 'lucide-react'
import { api } from '@/services/api'
import { formatDate } from '@/lib/format'

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('')
}

const roleColor: Record<string, string> = {
  staff: 'bg-primary/15 text-primary border-primary/30',
  coordinator: 'bg-accent/15 text-accent border-accent/30',
  member: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
}

export default async function StaffMembersPage() {
  const users = await api.getUsers()
  const counts = {
    staff: users.filter((u) => u.role === 'staff').length,
    coordinator: users.filter((u) => u.role === 'coordinator').length,
    member: users.filter((u) => u.role === 'member').length,
  }

  return (
    <DashboardShell role="staff" title="Members" description="Everyone in the AI Club">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Staff" value={counts.staff} icon={Shield} accent="#a78bfa" />
        <StatTile label="Coordinators" value={counts.coordinator} icon={Compass} accent="#38bdf8" />
        <StatTile label="Members" value={counts.member} icon={Users} accent="#34d399" />
      </div>

      <Card className="mt-6 p-5">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-secondary text-xs">
                          {initials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`capitalize ${roleColor[u.role]}`}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {u.department}
                    {u.year ? ` · ${u.year}` : ''}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(u.joinedAt)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {u.points ?? '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardShell>
  )
}
