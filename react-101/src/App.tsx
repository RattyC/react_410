import './App.css'
import GPAList from './gpa'
import TodoListBasic from './TodoListBasic'
import TodoListWithMeta from './TodoListWithMeta'
import TodoListRHF from './TodoListRHF'
import TodoListRHFZod from './TodoListRHFZod'
import MPDirectory from './assets/mp/MPDirectory'

function App() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[#B0B0B0]">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="m-0 text-xl font-display">React 101 Playground</h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-10">
        {/* MP Directory */}
        <section>
          <MPDirectory />
        </section>

        {/* React + FORM demos */}
        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold m-0">React + FORM</h2>
            <p className="text-[#666] m-0">ตัวอย่าง 4 แบบ: useState, useState หลายช่อง, React Hook Form, React Hook Form + Zod</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#B0B0B0] bg-white p-4">
              <TodoListBasic />
            </div>
            <div className="rounded-xl border border-[#B0B0B0] bg-white p-4">
              <TodoListWithMeta />
            </div>
            <div className="rounded-xl border border-[#B0B0B0] bg-white p-4 md:col-span-2">
              <TodoListRHF />
            </div>
            <div className="rounded-xl border border-[#B0B0B0] bg-white p-4 md:col-span-2">
              <TodoListRHFZod />
            </div>
          </div>
        </section>

        {/* GPA */}
        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold m-0">GPA Calculator</h2>
            <p className="text-[#666] m-0">บันทึกรายวิชาและเกรด แล้วคำนวณ GPA</p>
          </div>
          <div className="rounded-xl border border-[#B0B0B0] bg-white p-4">
            <GPAList />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
