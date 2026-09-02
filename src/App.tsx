import './App.css'
import "./index.css";
import { projects } from "./data/projects";
import { countByStatus, formatDueDate, getProjectsByStatus } from "./utils/projectUtils";

export default function App() {
  const active = getProjectsByStatus(projects, "active");

  return (
    <main style={{ padding: 16, fontFamily: "system-ui" }}>
      <h1>Project Tracker</h1>

      <section style={{ marginTop: 12 }}>
        <h2>Summary</h2>
        <ul>
          <li>Planned: {countByStatus(projects, "planned")}</li>
          <li>Active: {countByStatus(projects, "active")}</li>
          <li>Blocked: {countByStatus(projects, "blocked")}</li>
          <li>Done: {countByStatus(projects, "done")}</li>
        </ul>
      </section>

      <section style={{ marginTop: 12 }}>
        <h2>Active Projects</h2>
        <ul>
          {active.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — Due: {formatDueDate(p)} — Tags: {p.tags.join(", ")}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
