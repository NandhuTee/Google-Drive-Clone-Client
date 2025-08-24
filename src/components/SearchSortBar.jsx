// src/components/SearchSortBar.jsx
// SEARCH input + SORT dropdowns (name/date/size + asc/desc)
export default function SearchSortBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search files or folders…"
        className="w-full md:w-72 rounded-lg px-3 py-2 text-white"
      />

      <div className="flex items-center gap-2">
        <select
          value={sort.by}
          onChange={(e) => setSort((s) => ({ ...s, by: e.target.value }))}
          className="rounded-lg px-3 py-2 text-black"
        >
          <option value="created_at">Sort by: Date</option>
          <option value="name">Sort by: Name</option>
          <option value="size">Sort by: Size</option>
        </select>

        <select
          value={sort.dir}
          onChange={(e) => setSort((s) => ({ ...s, dir: e.target.value }))}
          className="rounded-lg px-3 py-2 text-black"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>
  );
}
