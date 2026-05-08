import { useSelector } from "react-redux";
import {
  FiUsers,
  FiBox,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";

export default function Dashboard() {
  const designers = useSelector(
    (state) => state.designers.list
  );

  const objects = useSelector(
    (state) => state.objects.items
  );

  const activeDesigners = designers.filter(
    (d) => d.status === "active"
  ).length;

  const performance =
    designers.length > 0
      ? Math.round(
        (activeDesigners / designers.length) * 100
      )
      : 0;
  const latestDesigner =
    designers[designers.length - 1];

  const latestObject =
    objects[objects.length - 1];
  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back to your creative workspace.
          </p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stats-card">
          <div className="stats-icon">
            <FiUsers />
          </div>

          <div>
            <h3>Total Designers</h3>
            <p>{designers.length}</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <FiBox />
          </div>

          <div>
            <h3>Total Objects</h3>
            <p>{objects.length}</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <FiActivity />
          </div>

          <div>
            <h3>Active Designers</h3>
            <p>{activeDesigners}</p>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <FiTrendingUp />
          </div>

          <div>
            <h3>Performance</h3>
            <p>{performance}%</p>
          </div>
        </div>

      </div>

      <div className="dashboard-bottom">

        <div className="recent-activity">
          <h2>Recent Activity</h2>

          {latestDesigner && (
            <div className="activity-item">
              <span className="dot"></span>

              <p>
                {latestDesigner.fullName} joined the team
              </p>
            </div>
          )}

          {latestObject && (
            <div className="activity-item">
              <span className="dot"></span>

              <p>
                New object created in editor
              </p>
            </div>
          )}

          <div className="activity-item">
            <span className="dot"></span>

            <p>
              {objects.length} total objects in scene
            </p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <a href="#/editor">Open Editor</a>
          <a href="#/designers">View Designers</a>
        </div>

      </div>
    </div>
  );
}