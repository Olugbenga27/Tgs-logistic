import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiCamera, HiTrash, HiUpload, HiCheck } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'

export function AvatarUpload() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setAvatar(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Avatar</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Upload your profile picture</p>
      </div>
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Preview */}
        <motion.div
          layout
          className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border-subtle)] overflow-hidden"
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{ borderColor: dragging ? 'var(--tsg-500)' : undefined }}
        >
          {avatar ? (
            <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <HiCamera className="h-10 w-10 text-[var(--text-muted)]" />
          )}
          {dragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-tsg-500/10">
              <HiUpload className="h-8 w-8 text-tsg-500" />
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <div className="space-y-3 flex-1">
          <div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <HiUpload className="h-4 w-4" />
              Choose Image
            </Button>
            <p className="mt-1.5 text-xs text-[var(--text-muted)]">
              PNG, JPG or WEBP. Max 2MB. Square recommended.
            </p>
          </div>
          {avatar && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setAvatar(null)}
              >
                <HiTrash className="h-4 w-4" />
                Remove
              </Button>
              <Button variant="primary" size="sm">
                <HiCheck className="h-4 w-4" />
                Save Avatar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
