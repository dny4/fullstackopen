
function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises :  10
      },
      { 
        name: 'Using props to pass data',
        exercises: 7
      },
      { 
        name: 'State of a component',
        exercises: 14
      }
    ]}

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
  )}

  const Content = (props) => {
    const parts = props.parts
    return (
      <>
        <p>
          {parts[0].name} {parts[0].exercises}
        </p>
        <p>
          {parts[1].name} {parts[1].exercises}
        </p>
        <p>
          {parts[2].name} {parts[2].exercises}
        </p>
      </>
  )}

  const Total = (props) => {
    return (
      <p>
        Total chapters {props.parts[0].exercises + 
          props.parts[1].exercises +  
          props.parts[2].exercises}
      </p>
  )}

  

  return (
    <div >
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
