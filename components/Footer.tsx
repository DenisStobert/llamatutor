import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://x.com/nutlope",
    src: "/twitter.svg",
    alt: "Twitter",
    width: 15,
    height: 15,
  },
  {
    href: "https://github.com/Nutlope/llamatutor",
    src: "/github.svg",
    alt: "GitHub",
    width: 16,
    height: 16,
  },
];

const Footer = () => {
  return (
    <div className="container flex min-h-[72px] items-center justify-between border-t border-[#D2D2D2] px-4 pb-3 pt-5 lg:min-h-[72px] lg:px-0 lg:py-5">
      <a href="/" className="flex items-center gap-2.5">
        <Image
          unoptimized
          src="/new-logo.svg"
          alt="footer logo"
          width={160}
          height={30}
        />
      </a>
      <div className="flex items-center gap-3">
        {socialLinks.map(({ href, src, alt, width, height }) => (
          <Link key={alt} href={href} target="_blank">
            <Image
              unoptimized
              src={src}
              alt={alt}
              width={width}
              height={height}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;