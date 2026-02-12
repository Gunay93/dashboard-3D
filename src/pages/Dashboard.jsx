import { useSelector } from "react-redux"

export default function Dashboard() {
  const designers = useSelector((state) => state.designers.list)
  const objects = useSelector((state) => state.objects.items)
  return (
    <div className="dashboard-cards">
      <h1>Welcome to the Admin Panel</h1>
      <div className="cards-container">
        <div className="card">
          <h2>Designers</h2>
          <p>{designers.length}</p>
        </div>

        <div className="card">
          <h2>Objects</h2>
          <p>{objects.length}</p>
        </div>
      </div>
    </div>
  )
}