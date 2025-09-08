import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ฟอร์ม Todo + รายการงาน ด้วย react-hook-form + zod
const TaskSchema = z.object({
  title: z.string().trim().min(1, 'กรุณากรอกชื่องาน'),
  type: z.enum(['เรียน', 'ทำงาน', 'บ้าน', 'อื่นๆ']).optional().or(z.literal('')),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
})

type Task = z.infer<typeof TaskSchema>

export default function Form() {
  const [tasks, setTasks] = useState<Task[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Task>({
    resolver: zodResolver(TaskSchema) as any,
    defaultValues: { title: '', type: '', dueDate: '' },
    mode: 'onSubmit',
  })

  const onAdd = (data: Task) => {
    setTasks((prev) => [...prev, data])
    reset()
  }

  const remove = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div style={{ marginTop: 24, padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>My To‑do List (RHF + Zod)</h2>
      <form onSubmit={handleSubmit((d) => onAdd(d as Task))} noValidate>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ minWidth: 220 }}>
            <input
              placeholder="งานที่ต้องทำ"
              {...register('title')}
              style={{ width: '100%', padding: '8px 10px' }}
            />
            {errors.title && <div style={{ color: 'crimson' }}>{errors.title.message}</div>}
          </div>

          <div>
            <select {...register('type')} style={{ padding: '8px 10px' }}>
              <option value="">เลือกประเภทงาน</option>
              <option value="เรียน">เรียน</option>
              <option value="ทำงาน">ทำงาน</option>
              <option value="บ้าน">งานบ้าน</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
            {errors.type && <div style={{ color: 'crimson' }}>{errors.type.message}</div>}
          </div>

          <div>
            <input type="date" {...register('dueDate')} style={{ padding: '8px 10px' }} />
            {errors.dueDate && <div style={{ color: 'crimson' }}>{errors.dueDate.message}</div>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            Add
          </button>
          <button type="button" onClick={() => reset()}>
            ล้างฟอร์ม
          </button>
        </div>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {tasks.map((t, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              borderBottom: '1px dashed #e5e7eb',
              padding: '8px 0',
            }}
          >
            <strong style={{ flex: 1 }}>{t.title}</strong>
            {t.type && <span>ประเภท: {t.type}</span>}
            {t.dueDate && <span>กำหนดส่ง: {t.dueDate}</span>}
            <button onClick={() => remove(idx)} style={{ marginLeft: 'auto' }}>
              ลบ
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <li style={{ color: '#888' }}>ยังไม่มีงานในรายการ</li>
        )}
      </ul>
    </div>
  )
}
