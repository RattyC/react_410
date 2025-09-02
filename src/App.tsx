import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GPAList from './gpa'

export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}]

function App() {
  // name --> show 
  const [name, setName] = useState('CSMJU')
  // massage (คงชื่อตัวแปรเดิมไว้)
  const [massage, setmassge] = useState(' สอบถามได้ครับ ')
  const [count, setCount] = useState(0)

  // 3) true = เขียว, false = แดง
  const status: boolean = false
  const statusClass = status ? 'green-txt' : 'red-txt'

  // 4–5) state สำหรับขนาดตัวอักษรของ <h1> (ที่แสดง name)
  const [titleSize, setTitleSize] = useState<number>(32)
  const MIN_PX = 16
  const MAX_PX = 80

  const inc = () => {
    setCount(c => c + 1)
    setTitleSize(s => Math.min(s + 2, MAX_PX)) // ขยาย h1 ทีละ 2px
  }

  const dec = () => {
    setCount(c => Math.max(c - 1, 0))
    setTitleSize(s => Math.max(s - 2, MIN_PX)) // ย่อ h1 ทีละ 2px
  }


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* 3) ใส่คลาสสีตาม status + 4–5) คุมขนาดด้วย state */}
      <h1
        className={`status ${statusClass}`}
        style={{ fontSize: `${titleSize}px` }}
      >
        {name}
      </h1>

      <h2>{massage}</h2>
      <h1>Vite + React</h1>

      <div className="card">
        {/* 4) ปรับปุ่ม ++ ให้ขยายตัวอักษรด้วย */}
        <button onClick={inc}>
          Counter ++ (โตตัวอักษร) — count is {count}
        </button>

        {/* 5) ปุ่มลบให้ย่อขนาดตัวอักษรลง */}
        <button onClick={dec} style={{ marginLeft: 8 }}>
          Counter -- (ย่อตัวอักษร)
        </button>

        <p style={{ marginTop: 8 }}>
          Font size: <strong>{titleSize}px</strong>
        </p>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* GPA Component */}
      <hr />
      <GPAList />

    </>
  )

}

export default App
