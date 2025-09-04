
import { useEffect, useState } from "react";
import { MapPin, Building2 } from "lucide-react";
import "../app/globals.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();
        setSchools(Array.isArray(data) ? data : []);
      } catch (_e) {
        setSchools([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="animate-pulse text-lg text-blue-600">Loading schools...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        📚 Explore Schools
      </h1>

      {schools.length === 0 ? (
        <p className="text-center text-gray-600">
          No schools found. Add some from{" "}
          <a href="/addSchool" className="text-blue-600 underline">
            Add School
          </a>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300 overflow-hidden"
            >
              {/* School Image */}
              <div className="aspect-video w-full bg-gray-100 relative">
                <img
                  src={`/schoolImages/${s.image}`}
                  alt={s.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>

              {/* School Info */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Building2 size={20} className="text-blue-600" />
                  {s.name}
                </h2>

                <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  {s.address}, {s.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
