import { useState } from "react";

type Task = {
  title: string;
  type: string;
  dueDate: string;
};

export default function TodoListWithMeta() {
  const [title, setTitle] = useState<string>(""); // งานที่ต้องทำ
  const [type, setType] = useState<string>(""); // ประเภทงาน
  const [dueDate, setDueDate] = useState<string>(""); // วันที่ต้องส่ง
  const [tasks, setTasks] = useState<Task[]>([]); // รายการงานทั้งหมด

  const addTask = () => {
    if (title.trim() === "") return; // กัน input ว่าง
    const newTask: Task = { title, type, dueDate };
    setTasks((prev) => [...prev, newTask]); // เพิ่ม task ลงใน array
    setTitle("");
    setType("");
    setDueDate("");
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">useState หลายช่อง: title / type / dueDate</h3>
      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="rounded border border-[#B0B0B0] bg-white px-3 py-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="พิมพ์งานที่ต้องทำ..."
        />
        <select
          className="rounded border border-[#B0B0B0] bg-white px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">เลือกประเภทงาน</option>
          <option value="เรียน">เรียน</option>
          <option value="ทำงาน">ทำงาน</option>
          <option value="บ้าน">งานบ้าน</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
        <input
          className="rounded border border-[#B0B0B0] bg-white px-3 py-2"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="rounded border border-[#B0B0B0] bg-white px-3 py-2 hover:bg-[#F5F5F5]" onClick={addTask}>Add</button>
      </div>

      <ul className="list-none p-0 m-0 space-y-2">
        {tasks.map((t, index) => (
          <li key={index} className="text-sm">
            <strong>{t.title}</strong>
            {t.type && <> | ประเภท: {t.type}</>}
            {t.dueDate && <> | ส่งภายใน: {t.dueDate}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}
