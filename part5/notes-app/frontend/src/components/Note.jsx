const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <div className="note text-md flex-inline m-2 rounded-md border border-solid p-1">
      {note.content} {}
      <button
        className="rounded border-2 border-solid
        bg-gray-200 px-1 hover:bg-green-800 hover:text-white"
        onClick={toggleImportance}>{label}</button>
    </div>
  )
}

export default Note

