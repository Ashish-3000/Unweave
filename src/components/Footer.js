import Link from "next/link";

function Footer() {
  return (
    <footer className="side-margin flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <h2 className="block font-Permanent font-bold text-xl leading-relaxed text-blue-gray-900 antialiased">
        Unweave
      </h2>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Link
            href="/about/#about"
            className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/tags"
            className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
          >
            Tags
          </Link>
        </li>
        {/* <li>
          <Link
            href="#"
            className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
          >
            Contribute
          </Link>
        </li> */}
        <li>
          <Link
            href="#"
            className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
