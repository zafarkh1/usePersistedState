import usePersistency from "./hooks/usePersistency";

function App() {
  const [greeting, setGreeting] = usePersistency('translate', 'Assalomu alaykum');

  return (
      <div>
        <div>
          <button onClick={() => setGreeting('Assalomu alaykum')}>uz</button>
          <button onClick={() => setGreeting('Здраствуйте')}>ru</button>
          <button onClick={() => setGreeting('Hello')}>eng</button>
        </div>
        {greeting && <h3>{greeting}</h3>}
      </div>
  );
}

export default App;
