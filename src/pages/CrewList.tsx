import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(`${SUPABASE_URL}`, `${SUPABASE_API_KEY}`);

function CrewList() {
  const [crew, setCrew] = useState([]) as any;
  const [location, navigate] = useLocation();

  const getCrew = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setCrew(data);
    }
  };

  useEffect(() => {
    getCrew();
  }, []);

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const redirectToCrewForm = () => {
    navigate('/');
  };

  const redirectProfile = (id: any) => {
    navigate('/crew/' + id);
  };

  return (
    <>
      <button className="text-white" onClick={redirectToCrewForm}>
        Go Back
      </button>
      <div className="text-white w-6/12 mx-auto">
        <h1 className="text-4xl text-white text-center mb-4">Crew List</h1>
        {crew.length > 0 ? (
          <ul className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4 justify-center">
            {crew.map((crewmate: any) => (
              <li
                className="grid grid-cols-3 gap-4 bg-red-800 rounded-xl p-2 cursor-pointer"
                key={crewmate.id}
                onClick={() => {
                  redirectProfile(crewmate.id);
                }}
              >
                <div className="text-center">
                  <h1 className="text-xl w-8/12 text-center mb-4 mt-4">
                    {crewmate.name}
                  </h1>

                  <div className="flex mx-auto">
                    <img
                      className="w-full mx-auto mr-4"
                      src="./profile.png"
                      alt="Sussy Baka"
                    />
                    <div className="flex flex-col">
                      <h2>{capitalizeFirstLetter(crewmate.color)}</h2>
                      <h2>{crewmate.isImposter ? 'Imposter' : 'Crewmate'}</h2>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No crewmates yet!</p>
        )}
      </div>
    </>
  );
}

export default CrewList;
