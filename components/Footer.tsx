export default function Footer() {
  return (
    <footer className="bg-blue text-white mt-12">
      <div className="mx-auto max-w-7xl p-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} REESET Truck & Trailer Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
