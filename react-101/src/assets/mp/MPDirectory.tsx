import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import anutin1 from '../anutin-1.svg'
import anutin2 from '../anutin-2.svg'

const MemberSchema = z.object({
  title: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  firstName: z.string().trim().min(2, 'กรุณากรอกชื่อให้ถูกต้อง'),
  lastName: z.string().trim().min(2, 'กรุณากรอกนามสกุลให้ถูกต้อง'),
  party: z.string().trim().min(1, 'กรุณากรอกสังกัดพรรคการเมือง'),
  ministerPosition: z.string().trim().optional().default(''),
  ministry: z.string().trim().optional().default(''),
  career: z.string().trim().optional().default(''),
  achievements: z.string().trim().optional().default(''),
})

type MemberBase = z.infer<typeof MemberSchema>

export type Member = MemberBase & {
  id: string
  photoUrls: string[] // 2 รูป
}

type FormValues = MemberBase

const TITLES = ['นาย', 'นาง', 'นางสาว', 'อื่นๆ']

export default function MPDirectory() {
  const externalAnutin = 'https://commons.wikimedia.org/wiki/Special:FilePath/Anutin_Charnvirakul_-_2023_(52638148766)_(cropped).jpg?width=640'
  const seedPhotos = [externalAnutin, anutin1 as string, anutin2 as string]
  const [members, setMembers] = useState<Member[]>([{
    id: 'seed-anutin',
    title: 'นาย',
    firstName: 'อนุทิน',
    lastName: 'ชาญวีรกูล',
    party: 'ภูมิใจไทย',
    ministerPosition: 'นายกรัฐมนตรี',
    ministry: 'ทำเนียบรัฐบาล',
    career: 'นักการเมือง นักธุรกิจ อดีตรองนายกรัฐมนตรีและรัฐมนตรีว่าการกระทรวงสาธารณสุข',
    achievements: 'ผลักดันนโยบายด้านสาธารณสุขและพัฒนาประเทศหลายด้าน',
    photoUrls: seedPhotos,
  }])
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = useMemo(() => members.find(m => m.id === editingId) || null, [members, editingId])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(MemberSchema) as any,
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      party: '',
      ministerPosition: '',
      ministry: '',
      career: '',
      achievements: '',
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    if (editing) {
      reset({
        title: editing.title,
        firstName: editing.firstName,
        lastName: editing.lastName,
        party: editing.party,
        ministerPosition: editing.ministerPosition,
        ministry: editing.ministry,
        career: editing.career,
        achievements: editing.achievements,
      })
    } else {
      reset()
    }
  }, [editing, reset])

  const onSubmit = (data: FormValues) => {
    if (editing) {
      const updated: Member = {
        id: editing.id,
        title: data.title,
        firstName: data.firstName,
        lastName: data.lastName,
        party: data.party,
        ministerPosition: data.ministerPosition || '',
        ministry: data.ministry || '',
        career: data.career || '',
        achievements: data.achievements || '',
        photoUrls: editing.photoUrls,
      }
      setMembers((prev) => prev.map((m) => (m.id === editing.id ? updated : m)))
      setEditingId(null)
      reset()
      return
    }

    const newMember: Member = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      party: data.party,
      ministerPosition: data.ministerPosition || '',
      ministry: data.ministry || '',
      career: data.career || '',
      achievements: data.achievements || '',
      photoUrls: [],
    }
    setMembers((prev) => [newMember, ...prev])
    reset()
  }

  const onEdit = (id: string) => setEditingId(id)
  const onCancel = () => { setEditingId(null); reset() }
  const onDelete = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id))

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 text-[#000000] font-sans">
      {/* Minimal Neutral header */}
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-display tracking-wide text-[#000000]">ทำเนียบ ส.ส.</h2>
        <p className="text-sm text-[#B0B0B0] mt-1">รายชื่อสมาชิกสภาผู้แทนราษฎร — เพิ่ม/แก้ไข/ลบ ได้</p>
        <div className="mx-auto mt-3 h-px w-24 bg-[#B0B0B0]" />
      </header>

      {/* List first: minimal neutral cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((m) => (
          <article key={m.id} className="rounded-xl border border-[#B0B0B0] bg-[#FFFFFF] overflow-hidden transition-shadow hover:shadow-sm">
            {m.photoUrls.length > 0 ? (
              <div className="grid grid-cols-2 gap-1 p-2 bg-[#F5F5F5]">
                {m.photoUrls.slice(0, 2).map((u, idx) => (
                  <img key={idx} src={u} className="h-28 w-full object-cover rounded-lg border border-[#B0B0B0]" />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-[#F5F5F5] border-b border-[#B0B0B0] text-center text-[#B0B0B0]">ไม่มีรูปภาพ</div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-[#000000]">{m.title}{m.firstName} {m.lastName}</h3>
              <p className="text-sm text-[#000000] mt-1">พรรค: <span className="text-[#000000]">{m.party || '—'}</span></p>
              {(m.ministerPosition || m.ministry) && (
                <p className="text-sm text-[#B0B0B0] mt-1">ตำแหน่ง: {m.ministerPosition || '—'} {m.ministry && `(${m.ministry})`}</p>
              )}
              {m.career && (
                <p className="text-sm mt-2 text-[#000000]">{m.career}</p>
              )}
              {m.achievements && (
                <p className="text-sm mt-1 text-[#000000]">{m.achievements}</p>
              )}
              <div className="mt-3 flex gap-3">
                <button onClick={() => onEdit(m.id)} className="px-3 py-1.5 rounded border border-[#B0B0B0] text-[#000000] bg-[#FFFFFF] hover:bg-[#F5F5F5]">แก้ไข</button>
                <button onClick={() => onDelete(m.id)} className="px-3 py-1.5 rounded border border-[#B0B0B0] text-[#000000] bg-[#FFFFFF] hover:bg-[#F5F5F5]">ลบ</button>
              </div>
            </div>
          </article>
        ))}
        {members.length === 0 && (
          <div className="text-[#B0B0B0]">ยังไม่มีรายชื่อ</div>
        )}
      </section>

      {/* Form after list: minimal neutral */}
      <section className="mt-8 rounded-xl border border-[#B0B0B0] bg-[#FFFFFF] p-5">
        <h3 className="text-lg font-medium text-[#000000] mb-3">เพิ่ม/แก้ไข รายชื่อ</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#000000]">คำนำหน้า</label>
            <select {...register('title')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]">
              <option value="">เลือกคำนำหน้า</option>
              {TITLES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000]">ชื่อ</label>
            <input {...register('firstName')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]" placeholder="ชื่อ" />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000]">นามสกุล</label>
            <input {...register('lastName')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]" placeholder="นามสกุล" />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000]">สังกัดพรรคการเมือง</label>
            <input {...register('party')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]" placeholder="ชื่อพรรค" />
            {errors.party && <p className="text-red-600 text-sm mt-1">{errors.party.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000]">ตำแหน่งรัฐมนตรี (ถ้ามี)</label>
            <input {...register('ministerPosition')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]" placeholder="เช่น รัฐมนตรีว่าการ" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#000000]">กระทรวง (ถ้ามี)</label>
            <input {...register('ministry')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]" placeholder="ชื่อกระทรวง" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#000000]">ประวัติการทำงาน</label>
            <textarea {...register('career')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]" rows={3} placeholder="สรุปประวัติการทำงาน" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#000000]">ผลงานที่ผ่านมา</label>
            <textarea {...register('achievements')} className="mt-1 w-full rounded border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] p-2 focus:outline-none focus:ring-1 focus:ring-[#000000]" rows={3} placeholder="สรุปผลงานเด่น" />
          </div>

          {/* ไม่ต้องใส่รูปในฟอร์มตามคำขอ */}

          <div className="md:col-span-2 flex gap-3 pt-1">
            <button type="submit" disabled={isSubmitting} className="inline-flex items-center rounded px-4 py-2 border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5] disabled:opacity-60">
              {editing ? 'บันทึกการแก้ไข' : 'เพิ่มรายชื่อ'}
            </button>
            {editing && (
              <button type="button" onClick={onCancel} className="inline-flex items-center rounded px-4 py-2 border border-[#B0B0B0] bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F5]">
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}
