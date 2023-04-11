import { useLocation, useRoute } from 'wouter';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(`${SUPABASE_URL}`, `${SUPABASE_API_KEY}`);

function CrewDetails() {
  const [location, navigate] = useLocation();
  const [match, params] = useRoute('/crew/:param2');
  const [crew, setCrew] = useState([]) as any;
  const [createdAt, setCreatedAt] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const redirectToCrewForm = () => {
    navigate('/crews');
  };

  const getDateCreated = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', params?.param2);

    if (error) {
      console.log(error);
    }

    console.log(data);

    if (data) {
      const date = new Date(data[0].created_at);
      const formattedDate = format(date, ' HH:mm:ss MM-dd-yyyy');

      setCreatedAt(formattedDate);
      setCrew(data);
    }
  };

  useEffect(() => {
    getDateCreated();
  }, []);

  console.log(crew);

  return (
    <div className="text-white">
      <button className="text-white" onClick={redirectToCrewForm}>
        Go Back
      </button>
      <h1 className="text-4xl text-center mb-4">Crew Details</h1>
      <h2 className="text-center">
        This was the ;
        <span className="font-bold">
          {params?.param2}th sussy created at {createdAt}
        </span>
      </h2>
      <h2 className="text-center">
        Sussy's name is <span className="font-bold">{crew[0]?.name}</span>
      </h2>
      <h2 className="text-center">
        Sussy's color is <span className="font-bold">{crew[0]?.color}</span>
      </h2>
      <h2 className="text-center">
        Sussy's role is{' '}
        <span className="font-bold">
          {crew[0]?.isImposter === true ? 'Imposter' : 'Crewmate'}
        </span>
      </h2>

      <div className="text-center">
        Write another name if you want to change this sussy's name{' '}
        <span className="font-bold">
          <input
            className="text-black"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            className="text-white bg-red-800 p-1 mt-10"
            onClick={() => {
              supabase
                .from('crewmates')
                .update({ name: name })
                .eq('id', params?.param2)
                .then((res) => {
                  console.log(res);
                  navigate('/crews');
                });
            }}
          >
            Update
          </button>
        </span>
        <br />
        <span className="font-bold">
          <button
            className="text-white bg-red-800 p-1 mt-10"
            onClick={() => {
              supabase
                .from('crewmates')
                .update({ isImposter: !crew[0]?.isImposter })
                .eq('id', params?.param2)
                .then((res) => {
                  console.log(res);
                  navigate('/crews');
                });
            }}
          >
            Make Imposter/Not Imposter
          </button>
        </span>
        <br />
        <span className="font-bold">
          <input
            className="text-black"
            type="text"
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />

          <button
            className="text-white bg-red-800 p-1 mt-10"
            onClick={() => {
              supabase
                .from('crewmates')
                .update({ color: color })
                .eq('id', params?.param2)
                .then((res) => {
                  console.log(res);
                  navigate('/crews');
                });
            }}
          >
            Make Another Color
          </button>
        </span>
      </div>
      <h2 className="text-center">
        Do you want to delete this sussy?{' '}
        <span className="font-bold">
          <button
            className="text-white bg-red-800 p-1 mt-10"
            onClick={() => {
              supabase
                .from('crewmates')
                .delete()
                .eq('id', params?.param2)
                .then((res) => {
                  console.log(res);
                  navigate('/crews');
                });
            }}
          >
            Delete
          </button>
        </span>
      </h2>
    </div>
  );
}

export default CrewDetails;
