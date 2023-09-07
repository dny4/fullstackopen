export function Filter({ contacts, setFilteredContacts }) {
  const handleFilter = (e) =>
    setFilteredContacts(
      contacts.filter((c) =>
        c.name.toUpperCase().match(e.target.value.toUpperCase()),
      ),
    );

  return (
    <div>
      Filter names by <input onChange={handleFilter} />
    </div>
  );
}
