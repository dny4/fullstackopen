export const ShowCountryList = ({ countries, handleShow }) => {
  return (
    countries.map(c => <div key={c.name.common}>
      {c.name.common}
      <input type="submit" value="show"
        onClick={handleShow} id={c.name.common} />
    </div>
    )
  );
};

