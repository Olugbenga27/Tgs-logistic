import { useState } from 'react'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { DatePicker } from '@/components/ui/DatePicker'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Pagination } from '@/components/ui/Pagination'
import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui/Skeleton'
import { Modal } from '@/components/ui/Modal'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { useToast } from '@/components/ui/Toast'
import { HiPlus, HiSearch, HiStar } from 'react-icons/hi'

function ColorSwatch({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] p-3">
      <div
        className="h-10 w-10 rounded-lg border border-[var(--border-subtle)]"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>
        <p className="text-xs text-[var(--text-muted)]">{color}</p>
      </div>
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <Text variant="h4" className="text-[var(--text-primary)]">{title}</Text>
        {description && <Text variant="bodySm" className="mt-1 text-[var(--text-secondary)]">{description}</Text>}
      </div>
      {children}
    </div>
  )
}

export function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const toast = useToast()

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div>
        <Breadcrumbs
          items={[{ label: 'Design System' }]}
          showHome
        />
        <Text variant="h2" className="mt-4">T.S.G Grateful Logistics</Text>
        <Text variant="subtitle">Premium Design System — Luxury Logistics SaaS</Text>
      </div>

      {/* ── Color Palette ── */}
      <Section title="T.S.G Color Palette" description="Updated brand colors and semantic palette">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ColorSwatch name="TSG-500 (Primary)" color="#173A7A" />
          <ColorSwatch name="TSG-400 (Secondary)" color="#244F9E" />
          <ColorSwatch name="TSG-700" color="#0d224a" />
          <ColorSwatch name="TSG-900" color="#040a1a" />
          <ColorSwatch name="Gold-400" color="#f4894e" />
          <ColorSwatch name="Gold-500 (Accent)" color="#f26722" />
          <ColorSwatch name="Gold-600" color="#d4550a" />
          <ColorSwatch name="Surface Dark" color="#0c0f1a" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Success / Delivered</p>
            <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">#10b981</p>
          </div>
          <div className="rounded-lg border border-gold-200 bg-gold-50 p-3 dark:border-gold-500/20 dark:bg-gold-500/10">
            <p className="text-sm font-semibold text-gold-700 dark:text-gold-300">Warning / Pending</p>
            <p className="text-xs text-gold-600/70 dark:text-gold-400/70">#f59e0b</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">Error / Critical</p>
            <p className="text-xs text-red-600/70 dark:text-red-400/70">#ef4444</p>
          </div>
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 dark:border-sky-500/20 dark:bg-sky-500/10">
            <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">Info / In Transit</p>
            <p className="text-xs text-sky-600/70 dark:text-sky-400/70">#0ea5e9</p>
          </div>
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography" description="Text component variants with consistent scale">
        <Card>
          <CardContent className="space-y-4 p-6">
            <Text variant="h1">Heading 1 — Display</Text>
            <Text variant="h2">Heading 2 — Page Title</Text>
            <Text variant="h3">Heading 3 — Section Title</Text>
            <Text variant="h4">Heading 4 — Card Title</Text>
            <Text variant="h5">Heading 5 — Subsection</Text>
            <Text variant="h6">Heading 6 — Small Heading</Text>
            <Text variant="subtitle">Subtitle — Secondary page description</Text>
            <Text variant="body">
              Body — The quick brown fox jumps over the lazy dog. This is a standard paragraph used for general content across the platform. It features a comfortable line-height and optimized readability.
            </Text>
            <Text variant="bodySm">Body Small — Used for metadata, descriptions, and secondary content.</Text>
            <Text variant="caption">Caption — Tiny text for timestamps, helper text.</Text>
            <Text variant="overline">OVERLINE — UPPERCASE LABELS</Text>
          </CardContent>
        </Card>
      </Section>

      {/* ── Buttons ── */}
      <Section title="Buttons" description="All variants and sizes">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="gold">Gold</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
              <Button size="icon"><HiPlus className="h-5 w-5" /></Button>
              <Button size="icon-sm"><HiSearch className="h-4 w-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
              <Button variant="gold" disabled>Disabled Gold</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm"><HiPlus className="h-4 w-4" /> New Shipment</Button>
              <Button variant="secondary" size="sm"><HiStar className="h-4 w-4" /> Featured</Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Cards ── */}
      <Section title="Cards" description="Default, elevated, glass, and gradient-border variants">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Standard card with subtle border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">Content goes here with standard padding.</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated</CardTitle>
              <CardDescription>Lifted with shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">Content goes here with standard padding.</p>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass</CardTitle>
              <CardDescription>Frosted glass effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">Content goes here with standard padding.</p>
            </CardContent>
          </Card>
          <Card variant="gradient-border">
            <CardHeader>
              <CardTitle>Gradient</CardTitle>
              <CardDescription>Premium gradient border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-secondary)]">Content goes here with standard padding.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── Badges ── */}
      <Section title="Badges" description="Status indicators with dot option">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="danger" dot>Overdue</Badge>
          <Badge variant="info" dot>In Transit</Badge>
          <Badge variant="neutral" dot>Draft</Badge>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </Section>

      {/* ── Alerts ── */}
      <Section title="Alerts" description="Contextual messages for feedback">
        <div className="space-y-3">
          <Alert variant="info">
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>Your shipment SH-001 has been updated with new tracking information.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Shipment SH-004 has been delivered successfully.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Fleet vehicle TRK-103 is due for maintenance tomorrow.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to update shipment status. Please try again.</AlertDescription>
          </Alert>
        </div>
      </Section>

      {/* ── Inputs ── */}
      <Section title="Inputs" description="Form inputs with label, error, icon, and password variants">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Standard Input" placeholder="Placeholder text..." />
          <Input label="With Error" error="This field is required" placeholder="Invalid value" />
          <Input label="With Hint" hint="Enter your full legal name" placeholder="John Doe" />
          <Input label="Password" type="password" placeholder="Enter password" />
          <div className="sm:col-span-2">
            <Input
              label="With Left Icon"
              leftIcon={<HiSearch className="h-4 w-4" />}
              placeholder="Search shipments..."
            />
          </div>
        </div>
      </Section>

      {/* ── Select ── */}
      <Section title="Select" description="Dropdown selection component">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Shipment Status"
            placeholder="Select status..."
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in_transit', label: 'In Transit' },
              { value: 'delivered', label: 'Delivered' },
            ]}
          />
          <Select
            label="With Error"
            error="Please select a status"
            options={[
              { value: 'all', label: 'All Shipments' },
              { value: 'pending', label: 'Pending' },
            ]}
          />
        </div>
      </Section>

      {/* ── DatePicker ── */}
      <Section title="Date Picker" description="Calendar date selection">
        <div className="max-w-sm">
          <DatePicker
            label="Select Date"
            value={date}
            onChange={setDate}
            placeholder="Choose a delivery date..."
          />
        </div>
      </Section>

      {/* ── Tabs ── */}
      <Section title="Tabs" description="Animated tab navigation with three variants">
        <div className="space-y-8">
          <Tabs defaultValue="tab1">
            <TabsList variant="default">
              <TabsTrigger value="tab1">Active Shipments</TabsTrigger>
              <TabsTrigger value="tab2">Pending</TabsTrigger>
              <TabsTrigger value="tab3">Delivered</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card><CardContent className="p-6"><Text>Showing 142 active shipments across all regions.</Text></CardContent></Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card><CardContent className="p-6"><Text>38 shipments awaiting pickup.</Text></CardContent></Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card><CardContent className="p-6"><Text>89 shipments delivered today.</Text></CardContent></Card>
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="a">
            <TabsList variant="pills">
              <TabsTrigger value="a">Pill Tab A</TabsTrigger>
              <TabsTrigger value="b">Pill Tab B</TabsTrigger>
              <TabsTrigger value="c">Pill Tab C</TabsTrigger>
            </TabsList>
            <TabsContent value="a"><Card><CardContent className="p-6"><Text>Pill variant content A.</Text></CardContent></Card></TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* ── Accordion ── */}
      <Section title="Accordion" description="Expandable content sections with animation">
        <Accordion>
          <AccordionItem title="What is T.S.G Grateful Logistics?">
            T.S.G Grateful Logistics is a premium logistics management platform that provides end-to-end visibility and control over your supply chain operations.
          </AccordionItem>
          <AccordionItem title="How do I track a shipment?" defaultOpen>
            Use the Tracking page to search by shipment ID. You can also set up webhook notifications for real-time status updates.
          </AccordionItem>
          <AccordionItem title="What integrations are supported?">
            The platform supports integrations with FedEx, UPS, DHL, and major warehouse management systems via REST APIs.
          </AccordionItem>
        </Accordion>
      </Section>

      {/* ── Table ── */}
      <Section title="Tables" description="Data tables with clean styling">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 'SH-001', origin: 'New York', dest: 'Los Angeles', status: 'In Transit', eta: 'Aug 2' },
                  { id: 'SH-002', origin: 'Chicago', dest: 'Miami', status: 'Pending', eta: 'Aug 4' },
                  { id: 'SH-003', origin: 'Houston', dest: 'Seattle', status: 'Delivered', eta: 'Jul 29' },
                  { id: 'SH-004', origin: 'San Francisco', dest: 'Boston', status: 'In Transit', eta: 'Aug 3' },
                ].map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium text-[var(--text-primary)]">{s.id}</TableCell>
                    <TableCell>{s.origin}</TableCell>
                    <TableCell>{s.dest}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          s.status === 'In Transit' ? 'info' :
                          s.status === 'Pending' ? 'warning' : 'success'
                        }
                        size="sm"
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{s.eta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Section>

      {/* ── Pagination ── */}
      <Section title="Pagination" description="Page navigation control">
        <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
      </Section>

      {/* ── Breadcrumbs ── */}
      <Section title="Breadcrumbs" description="Navigation trail">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Shipments', href: '/shipments' },
            { label: 'SH-001 Details' },
          ]}
        />
      </Section>

      {/* ── Skeleton ── */}
      <Section title="Skeletons" description="Loading placeholders">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <div className="sm:col-span-2">
            <Card>
              <CardContent className="p-6">
                <SkeletonTable rows={4} />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Skeleton variant="circular" className="h-12 w-12" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </Section>

      {/* ── Toast ── */}
      <Section title="Toasts" description="Notification system">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast.success('Shipment delivered', 'SH-001 has been delivered successfully.')}>
            Success Toast
          </Button>
          <Button variant="destructive" onClick={() => toast.error('Delivery failed', 'Package was damaged during transit.')}>
            Error Toast
          </Button>
          <Button variant="gold" onClick={() => toast.warning('Maintenance due', 'Vehicle TRK-103 needs service.')}>
            Warning Toast
          </Button>
          <Button variant="secondary" onClick={() => toast.info('New update available', 'Version 2.1.0 is ready to install.')}>
            Info Toast
          </Button>
        </div>
      </Section>

      {/* ── Modal ── */}
      <Section title="Modal" description="Dialog windows">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Shipment"
          description="Fill in the details to create a new shipment order."
          size="md"
        >
          <div className="space-y-4">
            <Input label="Origin" placeholder="City or location" />
            <Input label="Destination" placeholder="City or location" />
            <Select
              label="Priority"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => { setModalOpen(false); toast.success('Shipment created', 'New shipment has been created successfully.') }}>
                Create Shipment
              </Button>
            </div>
          </div>
        </Modal>
      </Section>
    </div>
  )
}
