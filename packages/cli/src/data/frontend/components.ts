export const react_app_tsx = `
import "./App.css";
import Card from "./components/Card";

function App() {
  return <Card />;
}

export default App;
`;

export const react_tw_card = `
function Card() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white-100">
      <div className="rounded-lg bg-white-100 shadow-lg px-16 py-14">
        <div className="flex justify-center">
          <span className="text-[4em]">🎉</span>
        </div>
        <h3 className="my-4 text-center text-3xl font-semibold text-gray-700">
          Congratuation!!!
        </h3>
        <p className="w-[230px] font-poppins text-center font-normal text-gray-600">
          You're all setup!.
        </p>
      </div>
    </div>
  );
}

export default Card;
`;

export const nextjs_app_tsx = `

`;
