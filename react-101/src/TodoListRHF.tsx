import { useState } from "react";
import { useForm } from "react-hook-form";

type Task = {
  title: string;
  type: string;
  dueDate: string;
};

export default function TodoListRHF() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({ defaultValues: { title: "", type: "", dueDate: "" } });

  const onAdd = (data: Task) => {
    if (!data.title.trim()) return;
    setTasks((prev) => [...prev, data]);
    reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">React Hook Form (ไม่ใช้ Zod)</h3>
      <form onSubmit={handleSubmit(onAdd)} noValidate className="flex flex-wrap gap-2 items-center">
        <div>
          <input
            placeholder="งานที่ต้องทำ"
            {...register("title", { required: "กรุณากรอกชื่องาน" })}
            className="rounded border border-[#B0B0B0] bg-white px-3 py-2"
          />
          {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title.message}</div>}
        </div>
        <div>
          <select {...register("type")} className="rounded border border-[#B0B0B0] bg-white px-3 py-2">
            <option value="">เลือกประเภทงาน</option>
            <option value="เรียน">เรียน</option>
            <option value="ทำงาน">ทำงาน</option>
            <option value="บ้าน">งานบ้าน</option>
            <option value="อื่นๆ">อื่นๆ</option>
          </select>
        </div>
        <div>
          <input type="date" {...register("dueDate")} className="rounded border border-[#B0B0B0] bg-white px-3 py-2" />
        </div>
        <button type="submit" className="rounded border border-[#B0B0B0] bg-white px-3 py-2 hover:bg-[#F5F5F5]">Add</button>
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
