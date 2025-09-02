import React, { useState } from 'react'
import './gpa.css'

export type Grade = 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F' | 'W'

export interface Course {
    id: string
    name: string
    grade: Grade
}

const GRADE_POINT: Record<Grade, number | null> = {
    A: 4.0,
    'B+': 3.5,
    B: 3.0,
    'C+': 2.5,
    C: 2.0,
    'D+': 1.5,
    D: 1.0,
    F: 0.0,
    W: null, // ไม่นับใน GPA
}

const GRADE_OPTIONS: Grade[] = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'W']

function calcGPA(courses: Course[]): number | null {
    const graded = courses.filter((c) => GRADE_POINT[c.grade] !== null)
    if (graded.length === 0) return null
    const sum = graded.reduce((acc, c) => acc + (GRADE_POINT[c.grade] as number), 0)
    return sum / graded.length
}

const GPAList: React.FC = () => {
    const [subject, setSubject] = useState<string>('')
    const [grade, setGrade] = useState<Grade>('A')
    const [items, setItems] = useState<Course[]>([])
    const [gpa, setGpa] = useState<number | null>(null)

    function addItem() {
        const name = subject.trim()
        if (!name) return
        const newItem: Course = {
            id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
            name,
            grade,
        }
        setItems((prev) => [...prev, newItem])
        setSubject('')
        setGrade('A')
        setGpa(null) // รอให้กดปุ่มคำนวณใหม่
    }

    function removeItem(id: string) {
        setItems((prev) => prev.filter((it) => it.id !== id))
        setGpa(null)
    }

    function clearAll() {
        setItems([])
        setGpa(null)
    }

    function calculate() {
        setGpa(calcGPA(items))
    }

    return (
        <div className="gpa-card">
            <div className="gpa-header">
                <h2>GPA Calculator</h2>
                <p className="gpa-sub">บันทึกรายวิชาและเกรด กดปุ่มคำนวณเพื่อดูค่า GPA</p>
            </div>

            <div className="gpa-form">
                <input
                    className="input"
                    placeholder="ชื่อวิชาเช่น Calculus, Physics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <select
                    className="select"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as Grade)}
                >
                    {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={addItem} disabled={!subject.trim()}>
                    เพิ่ม
                </button>
            </div>

            <ul className="gpa-list">
                {items.map((it) => (
                    <li key={it.id} className="gpa-item">
                        <div className="gpa-item-main">
                            <span className="course-name">{it.name}</span>
                            <span className={`grade-badge ${it.grade === 'F' ? 'grade-F' : ''}`}>
                                {it.grade}
                            </span>
                        </div>
                        <div className="gpa-item-actions">
                            <button className="btn btn-ghost" onClick={() => removeItem(it.id)}>
                                ลบ
                            </button>
                        </div>
                    </li>
                ))}
                {items.length === 0 && (
                    <li className="gpa-empty">ยังไม่มีรายการวิชา เพิ่มรายการด้านบน</li>
                )}
            </ul>

            <div className="gpa-footer">
                <div className="gpa-actions">
                    <button className="btn btn-ghost" onClick={clearAll} disabled={items.length === 0}>
                        ล้างรายการ
                    </button>
                    <button className="btn btn-primary" onClick={calculate} disabled={items.length === 0}>
                        คำนวณ GPA
                    </button>
                </div>
                <div className="gpa-value" aria-live="polite">
                    GPA
                    <strong>{gpa === null ? '—' : gpa.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    )
}

export default GPAList
