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

export default Course