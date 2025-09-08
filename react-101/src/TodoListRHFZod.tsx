import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1) Zod schema
const TaskSchema = z.object({
  title: z.string().trim().min(1, "กรุณากรอกชื่องาน"),
  // อนุญาตให้เว้นว่าง หรือเลือกค่าจากรายการ
  type: z.enum(["เรียน", "ทำงาน", "บ้าน", "อื่นๆ"]).optional().or(z.literal("")),
  // input type="date" จะได้รูปแบบ YYYY-MM-DD
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)")
    .optional()
    .or(z.literal("")),
});

type Task = z.infer<typeof TaskSchema>;

export default function TodoListRHFZod() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Task>({
    // cast เล็กน้อยเพื่อให้เข้ากับ typings ของ resolver ในเวอร์ชันนี้
    resolver: zodResolver(TaskSchema) as any,
    defaultValues: { title: "", type: "", dueDate: "" },
    mode: "onSubmit",
  });

  const onAdd = (data: Task) => {
    setTasks((prev) => [...prev, data]);
    reset(); // เคลียร์ฟอร์มหลังเพิ่ม
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">React Hook Form + Zod</h3>
      <form onSubmit={handleSubmit(onAdd)} noValidate className="flex flex-wrap gap-2 items-center">
        {/* ชื่องาน (บังคับ) */}
        <div>
          <input
            placeholder="งานที่ต้องทำ"
            {...register("title")}
            className="rounded border border-[#B0B0B0] bg-white px-3 py-2"
          />
          {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title.message}</div>}
        </div>

        {/* ประเภทงาน (ไม่บังคับ) */}
        <div>
          <select {...register("type")} className="rounded border border-[#B0B0B0] bg-white px-3 py-2">
            <option value="">เลือกประเภทงาน</option>
            <option value="เรียน">เรียน</option>
            <option value="ทำงาน">ทำงาน</option>
            <option value="บ้าน">งานบ้าน</option>
            <option value="อื่นๆ">อื่นๆ</option>
          </select>
          {errors.type && <div className="text-red-600 text-sm mt-1">{errors.type.message}</div>}
        </div>

        {/* วันที่ต้องส่ง (ไม่บังคับ) */}
        <div>
          <input type="date" {...register("dueDate")} className="rounded border border-[#B0B0B0] bg-white px-3 py-2" />
          {errors.dueDate && <div className="text-red-600 text-sm mt-1">{errors.dueDate.message}</div>}
        </div>

        <button type="submit" disabled={isSubmitting} className="rounded border border-[#B0B0B0] bg-white px-3 py-2 hover:bg-[#F5F5F5]">Add</button>
      </form>

      <ul className="list-none p-0 m-0 space-y-2">
        {tasks.map((t, idx) => (
          <li key={idx} className="text-sm">
            {t.title}
            {t.type && ` | ประเภท: ${t.type}`}
            {t.dueDate && ` | ส่ง: ${t.dueDate}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
