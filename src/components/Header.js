
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-cyan-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">My Blog</Link>
        </h1>
        <nav>
          <Link href="/" legacyBehavior>
            <a className="mx-2 hover:underline">Home</a>
          </Link>
          <Link href="/blog" legacyBehavior>
            <a className="mx-2 hover:underline">Blog</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="mx-2 hover:underline">About</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="mx-2 hover:underline">Contact</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
