const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <Part
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises} />
            )}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum += part.exercises, 0)
    return (
        <strong>
            total of {total} exercises
        </strong>
    )
}

const Course = ({ name, parts }) => {
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course
