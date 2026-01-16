import React from "react";
import Image from "next/image";
import logo from "@/images/logo.png";
import fb from "@/images/fb.svg";
import yt from "@/images/yt.svg";
import ins from "@/images/ins.svg";
import lin from "@/images/lin.svg";

import Link from "next/link";
import phoneIcon from "@/images/phone-icc.svg";
import mailIcon from "@/images/mail-icc.svg";

const Footer = () => {
  const policyLinks = [
    {
      title: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      title: "Terms and Conditions",
      link: "/terms-and-conditions",
    },
    {
      title: "Refund Policy",
      link: "/refund-policy",
    },
  ];
  const ftColumns = [
    {
      title: "Escape Room",
      links: [
        {
          title: "Koramangala",
          link: "#",
        },
        {
          title: "JP Nagar",
          link: "#",
        },
        {
          title: "Whitefield",
          link: "#",
        },
      ],
    },
    {
      title: "Parties",
      links: [
        {
          title: "Birthdays",
          link: "#",
        },
        {
          title: "Farewells",
          link: "#",
        },
        {
          title: "Bachelor(ette)",
          link: "#",
        },
      ],
    },
    {
      title: "Corporate",
      links: [
        {
          title: "Unwind",
          link: "#",
        },
        {
          title: "Retreats",
          link: "#",
        },
        {
          title: "Connect",
          link: "#",
        },
      ],
    },
  ];
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="ft-inner">
          <div className="row flex-lg-row-reverse row-gap-25">
            <div className="col-lg-3 col-12">
              <div className="ft-logo-col">
                <Link href="/" className="ft-logo">
                  <Image src={logo} alt="logo" />
                </Link>
                <ul className="ft-contact-list">
                  <li>
                    <Link href="mailto:info@breakout.in">
                      <Image src={mailIcon} alt="mail" />
                      <span>info@breakout.in</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="tel:+919742386781">
                      <Image src={phoneIcon} alt="phone" />
                      <span>+91 974 238 6781</span>
                    </Link>
                  </li>
                </ul>

                <ul className="soc-links">
                  <li>
                    <Link href="/">
                      <Image src={fb} alt="fb" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <Image src={yt} alt="yt" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <Image src={ins} alt="insta" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <Image src={lin} alt="lin" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-12">
              <div className="row row-gap-25">
                {ftColumns.map((item, index) => (
                  <div className="col-lg-4 col-6" key={index}>
                    <h4 className="ft-head">{item.title}</h4>
                    <ul className="ft-list">
                      {item.links.map((link, index) => (
                        <li key={index}>
                          <Link href={link.link}>{link.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ft-btm">
          <p>&copy; {new Date().getFullYear()} Breakout all rights reserved.</p>
          <ul className="ft-policy-list">
            {policyLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.link}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
