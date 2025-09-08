import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'กรอกชื่ออย่างน้อย 2 ตัวอักษร'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  age: z.coerce
    .number()
    .int('ต้องเป็นจำนวนเต็ม')
    .min(0, 'ต้องไม่ติดลบ')
    .max(120, 'มากเกินไป')
    .optional(),
  agree: z.boolean().refine((v) => v === true, 'ต้องยอมรับเงื่อนไข'),
})

type FormData = z.infer<typeof schema>

export default function StudentForm() {
  const [submitted, setSubmitted] = useState<FormData | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) as any })

  const onSubmit = (data: FormData) => {
    setSubmitted(data)
  }

  return (
    <div style={{ marginTop: 24, padding: 16, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>สมัครรายชื่อ</h2>
      <form onSubmit={handleSubmit((data) => onSubmit(data as FormData))} noValidate>
        <div style={{ display: 'grid', gap: 12 }}>
          <label>
            ชื่อ
            <input
              {...register('name')}
              placeholder="เช่น สมชาย"
              style={{ display: 'block', width: '100%', padding: '8px 10px', marginTop: 4 }}
            />
            {errors.name && <span style={{ color: 'crimson' }}>{errors.name.message}</span>}
          </label>

          <label>
            อีเมล
            <input
              type="email"
              {...register('email')}
              placeholder="name@example.com"
              style={{ display: 'block', width: '100%', padding: '8px 10px', marginTop: 4 }}
            />
            {errors.email && <span style={{ color: 'crimson' }}>{errors.email.message}</span>}
          </label>

          <label>
            อายุ (ไม่บังคับ)
            <input
              type="number"
              inputMode="numeric"
              {...register('age')}
              placeholder="เช่น 20"
              style={{ display: 'block', width: '100%', padding: '8px 10px', marginTop: 4 }}
            />
            {errors.age && <span style={{ color: 'crimson' }}>{errors.age.message}</span>}
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" {...register('agree')} />
            ยอมรับเงื่อนไข
          </label>
          {errors.agree && <span style={{ color: 'crimson' }}>{errors.agree.message}</span>}

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" disabled={isSubmitting}>ส่งข้อมูล</button>
            <button type="button" onClick={() => { reset(); setSubmitted(null) }}>ล้าง</button>
          </div>
        </div>
      </form>

      {submitted && (
        <pre style={{ background: '#f9fafb', padding: 12, borderRadius: 6, marginTop: 12 }}>
{JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </div>
  )
}
