import "./styles.css";

import Loading from "./Loading";
import Tours from "./Tours";
import { useEffect, useState } from "react";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
export default function App() {
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState([]);

  const removetour = (id) => {
    const newTour = tour.filter((tour) => tour.id !== id);
    setTour(newTour);
  };

  const fetchTour = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tour = await response.json();
      setLoading(false);
      setTour(tour);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTour();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tour.length === 0) {
    return (
      <main>
        <div className="title">
          <h2> no tour left </h2>
          <button className="btn" onClick={fetchTour}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tour={tour} removetour={removetour} />
    </main>
  );
}
