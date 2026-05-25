"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="block">
      <span className="sr-only">Search posts</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Search title, excerpt, or tags"
        className="h-12 w-full rounded-md border border-alabaster-grey bg-white px-4 text-sm text-black outline-none transition placeholder:text-muted/70 focus:border-bright-marine focus:ring-4 focus:ring-[var(--ring)]"
      />
    </label>
  );
}
