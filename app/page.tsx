// app/page.tsx
import data from "./data/restaurants.json";
import RestaurantCard from "./(site)/components/RestaurantCard";

export default function Page() {
  const rows: any[] = (data as any);
  return (
    <main className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Discover Halal Spots Near You</h1>
        <p className="text-gray-600">HFSAA-certified and carefully labeled self-declared listings.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rows.map((r: any) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </div>
    </main>
  );
}
