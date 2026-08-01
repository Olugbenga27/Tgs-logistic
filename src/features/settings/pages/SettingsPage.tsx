import { motion } from 'framer-motion'
import {
  HiUser,
  HiLocationMarker,
  HiLockClosed,
  HiBell,
  HiColorSwatch,
  HiCamera,
} from 'react-icons/hi'
import { Card, CardContent } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { PersonalInfoForm } from '../components/PersonalInfoForm'
import { AddressesForm } from '../components/AddressesForm'
import { PasswordForm } from '../components/PasswordForm'
import { NotificationSettings } from '../components/NotificationSettings'
import { ThemeSettings } from '../components/ThemeSettings'
import { AvatarUpload } from '../components/AvatarUpload'

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: HiUser },
  { id: 'addresses', label: 'Addresses', icon: HiLocationMarker },
  { id: 'password', label: 'Password', icon: HiLockClosed },
  { id: 'notifications', label: 'Notifications', icon: HiBell },
  { id: 'theme', label: 'Theme', icon: HiColorSwatch },
  { id: 'avatar', label: 'Avatar', icon: HiCamera },
]

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Settings</h2>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage your profile and preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card>
          <CardContent className="p-5 sm:p-6">
            <Tabs defaultValue="personal">
              <TabsList variant="pills" className="mb-6 flex-wrap">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger key={tab.id} value={tab.id}>
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoForm />
              </TabsContent>
              <TabsContent value="addresses">
                <AddressesForm />
              </TabsContent>
              <TabsContent value="password">
                <PasswordForm />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="theme">
                <ThemeSettings />
              </TabsContent>
              <TabsContent value="avatar">
                <AvatarUpload />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
