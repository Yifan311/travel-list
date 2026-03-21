export default function App() {
  return (
    <>
      <Logo />
      <Form />
      <Stats />
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>Logo</h1>
    </div>
  );
}

function Form() {
  return (
    <div className="form">
      <h2>Form</h2>
    </div>
  );
}

function Stats() {
  return (
    <div className="stats">
      <h2>Stats</h2>
    </div>
  );
}
