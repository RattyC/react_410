``
import { useState } from "react";

type Task = {
    title: string;
    type: string;
    dueDate: string;
};

export default function TodoApp() {
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = () => {
        if (title.trim() === "") return;
        const newTask: Task = { title, type, dueDate };
        setTasks((prev) => [...prev, newTask]);
        setTitle("");
        setType("");
        setDueDate("");
    };

    const removeTask = (index: number) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>My To-do List</h1>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="พิมพ์งานที่ต้องทำ..."
                style={{ marginRight: "5px" }}
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ marginRight: "5px" }}
            >
                <option value="">เลือกประเภทงาน</option>
                <option value="เรียน">เรียน</option>
                <option value="ทำงาน">ทำงาน</option>
                <option value="บ้าน">งานบ้าน</option>
                <option value="อื่นๆ">อื่นๆ</option>
            </select>

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ marginRight: "5px" }}
            />

            <button onClick={addTask}>Add</button>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
                {tasks.map((t, index) => (
                    <li key={index} style={{ margin: "10px 0" }}>
                        <strong>{t.title}</strong>
                        {t.type && <> | ประเภท: {t.type}</>}
                        {t.dueDate && <> | ส่งภายใน: {t.dueDate}</>}
                        <button onClick={() => removeTask(index)} style={{ marginLeft: 8 }}>ลบ</button>
                    </li>
                ))}
                {tasks.length === 0 && (
                    <li style={{ color: "#888" }}>ยังไม่มีงานในรายการ</li>
                )}
            </ul>
        </div>
    );
}
