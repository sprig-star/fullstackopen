const Header = ({ name }) =>
  <h1>
    {name}
  </h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Total = ({ parts }) =>
  <p>
    total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
  </p>

const Course = ({ course }) =>
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'State of another component',
        exercises: 14,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}


export default App