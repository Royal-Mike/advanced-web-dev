import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); 
  const routeChange = (path: string) =>{ 
    navigate(path);
  }

  return (
    <>
      <h1 className="px-4 py-2 text-2xl font-semibold">21127561</h1>
      <button className="mx-2 px-2 border-2 border-black rounded" onClick={() => routeChange('/tic-tac-toe')}>
        IA01: Tic-Tac-Toe
      </button>
      <button className="mx-2 px-2 border-2 border-black rounded" onClick={() => routeChange('/unsplash-gallery')}>
        IA02: Unsplash Gallery
      </button>
      <button className="mx-2 px-2 border-2 border-black rounded" onClick={() => routeChange('/user-registration')}>
        IA03+4: User Registration API + JWT Authentication
      </button>
    </>
  );
}