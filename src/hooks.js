import { useEffect, useState } from "react";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}

export function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setProject)
      .finally(() => setLoading(false));
  }, [id]);

  return { project, loading };
}
