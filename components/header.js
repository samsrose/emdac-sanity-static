import React from "react";
import Link from "next/link";
import Section from "./Section";

export default function Header(props) {
  const navigation = {
    main: [
      { name: 'News', href: '/' },
      { name: 'Lemsas', href: '/lemsas' },
      { name: 'Documents', href: '/documents' },
      { name: 'Directory', href: '/directory' },
      { name: 'Protocols', href: '/protocols' },
      { name: 'Meetings', href: '/meetings' },
    ],
  }

  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
      className={props.sticky && "mt-auto"}
    >
      <footer className="bg-gray-900">
      <div className="md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
          {navigation.main.map((item) => (
            <div key={item.name} className="pt-6 pb-2">
              <Link
                href={item.href}
                className="text-sm leading-6 px-2 text-gray-600 hover:text-gray-900">

                {item.name}

              </Link>
            </div>
          ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-4">
            &copy; 1998-2023 EMDAC. All rights reserved.
          </p>
        </div>
    </footer>
    </Section>
  );
}
