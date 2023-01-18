const Header = (props) => {
    return (
      <h2>
        {props.course.name}
      </h2>
    )
}
  
const Content = (props) => {
    return (
    <div>
        {props.course.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
    )
}
  
const Part = (props) => {
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>
    )
}
  
const Total = (props) => {
    const exercisesArray = props.course.parts.map(part => part.exercises)
    const initialValue = 0
    const total = exercisesArray.reduce((s, p) => s + p, initialValue)
    return (
        <b>
        total of {total} exercises
        </b>
    )
}
  
const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course