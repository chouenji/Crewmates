import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useLocation } from 'wouter';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(`${SUPABASE_URL}`, `${SUPABASE_API_KEY}`);

function CrewForm() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [isImposter, setIsImposter] = useState(false);
  const [location, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedColor = document.getElementById(
      'colors'
    ) as HTMLSelectElement;
    const selectedColorValue = selectedColor.value;
    const { data, error } = await supabase.from('crewmates').insert([
      {
        name,
        color: selectedColorValue,
        isImposter,
      },
    ]);

    if (!error) {
      console.log(data);
      navigate('/crews');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  const handleIsImposterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImposter(e.target.checked);
  };

  return (
    <div className="text-center w-80 mx-auto bg-red-800 rounded-xl p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name&nbsp;&nbsp;</label>
        <input
          className="text-black"
          onChange={handleNameChange}
          type="text"
          name="name"
          id="name"
          required
        />
        <br />
        <br />
        <label htmlFor="color">Color&nbsp;&nbsp;</label>
        <select
          onChange={handleColorChange}
          className="text-black"
          name="colors"
          id="colors"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="purple">Purple</option>
          <option value="brown">Brown</option>
          <option value="cyan">Cyan</option>
          <option value="lime">Lime</option>
        </select>
        <br />
        <br />
        <label htmlFor="isImposter">Is Imposter? &nbsp;</label>
        <input
          onChange={handleIsImposterChange}
          type="checkbox"
          name="isImposter"
          id="isImposter"
        />
        <br />
        <br />
        <button className="bg-gray-800 p-2 rounded-lg" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CrewForm;
