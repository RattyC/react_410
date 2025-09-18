import GPAList from './gpa'
import TodoListBasic from './TodoListBasic'
import TodoListWithMeta from './TodoListWithMeta'
import TodoListRHF from './TodoListRHF'
import TodoListRHFZod from './TodoListRHFZod'
import MPDirectory from './assets/mp/MPDirectory'

function App() {
  return (
    <div>
      {/* Header: Rolex-inspired emerald + gold */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="brand">React 101</div>
          <nav className="nav-links">
            <a href="#gpa">GPA</a>
            <a href="#forms">Forms</a>
            <a href="#mp">Directory</a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container" style={{ paddingTop: 20, paddingBottom: 28 }}>
        {/* Hero removed per request */}

        {/* GPA FIRST */}
        <section id="gpa" style={{ marginTop: 8 }}>
          <h2 style={{ marginBottom: 8 }}>GPA Calculator</h2>
          <div className="card">
            <GPAList />
          </div>
        </section>

        {/* React + FORM demos SECOND */}
        <section id="forms" style={{ marginTop: 24 }}>
          <h2 style={{ marginBottom: 8 }}>React + Forms</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            <div className="card">
              <TodoListBasic />
            </div>
            <div className="card">
              <TodoListWithMeta />
            </div>
            <div className="card">
              <TodoListRHF />
            </div>
            <div className="card">
              <TodoListRHFZod />
            </div>
          </div>
        </section>

        {/* MP Directory LAST */}
        <section id="mp" style={{ marginTop: 24 }}>
          <h2 style={{ marginBottom: 8 }}>MP Directory</h2>
          <div className="card">
            <MPDirectory />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
