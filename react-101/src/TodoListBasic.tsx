import { useState } from "react";

export default function TodoListBasic() {
  const [task, setTask] = useState<string>(""); // เก็บค่าที่พิมพ์ใน input
  const [tasks, setTasks] = useState<string[]>([]); // เก็บรายการงานทั้งหมด

  const addTask = () => {
    if (task.trim() === "") return; // กัน input ว่าง
    setTasks((prev) => [...prev, task]); // เพิ่ม task ลงใน array
    setTask(""); // เคลียร์ input หลังเพิ่ม
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Basic: useState เท่านั้น</h3>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border border-[#B0B0B0] bg-white px-3 py-2"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="พิมพ์งานที่ต้องทำ..."
        />
        <button className="rounded border border-[#B0B0B0] bg-white px-3 py-2 hover:bg-[#F5F5F5]" onClick={addTask}>Add</button>
      </div>
      <ul className="list-none p-0 m-0 space-y-2">
        {tasks.map((t, index) => (
          <li key={index} className="text-sm text-[#000000]">{t}</li>
        ))}
      </ul>
    </div>
  );
}
