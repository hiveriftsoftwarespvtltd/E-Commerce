import React from "react";

const blogs = [
  {
    title: "Corporate Gifting in India Made Memorable – By EarthStore.in",
    date: "June 17, 2025",
    author: "MARKETING TES",
    link: "#",
    img: "https://www.earthstore.in/cdn/shop/articles/Types_of_Coffee_1_772x.progressive.png.jpg?v=1750147309",
    desc: "Why Corporate Gifting Matters in 2025 — gifting isn’t just about giving, it's about building relationships...",
  },
  {
    title: "5 Unique Sweet Oats Recipes You’ve Probably Never Tried Before",
    date: "June 14, 2025",
    author: "MARKETING TES",
    link: "#",
    img: "https://www.earthstore.in/cdn/shop/articles/Types_of_Coffee_abe4315a-caa0-44cf-b98a-6722d5d9c8c6_772x.progressive.png.jpg?v=1749901817",
    desc: "Oats are a pantry staple — healthy, filling, versatile. Here are 5 creative sweet oats recipes...",
  },
  {
    title: "A Beginner’s Guide to Coffee Types (and How to Enjoy Them Best)",
    date: "June 12, 2025",
    author: "MARKETING TES",
    link: "#",
    img: "https://www.earthstore.in/cdn/shop/articles/Types_of_Coffee_772x.progressive.png.jpg?v=1749715542",
    desc: "Espresso, macchiato, Americano — confused by coffee menus? This guide breaks everything down...",
  },
  {
    title: "The Best Korean Noodles You Must Try",
    date: "May 31, 2025",
    author: "MARKETING TES",
    link: "#",
    img: "https://www.earthstore.in/cdn/shop/articles/korean_noodles_772x.progressive.jpg?v=1747997662",
    desc: "If you're a fan of bold Korean flavors, these must-try noodle varieties will blow your mind...",
  },
  {
    title: "The Beauty and Benefits of Glassware in Everyday Living",
    date: "May 30, 2025",
    author: "MARKETING TES",
    link: "#",
    img: "https://www.earthstore.in/cdn/shop/articles/ceramic_2_772x.progressive.jpg?v=1747988874",
    desc: "Glass is elegant, sustainable, and functional — here's why glassware is loved worldwide...",
  },
];

export default function BlogCard() {
  return (
    <div className="py-10 text-accent" >
      <div className="max-w-6xl mx-auto px-4">

        <h1
          className="text-3xl font-bold mb-10 text-center"
          
        >
          Blogs
        </h1>

        <div className="space-y-16">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="text-center border-b pb-10"
              
            >
              <h2
                className="text-2xl font-semibold mb-3"
                
              >
                <a href={blog.link} className="hover:opacity-80">
                  {blog.title}
                </a>
              </h2>

              <p className="italic" style={{ color: "#858585" }}>
                {blog.date} — Posted by {blog.author}
              </p>

              <a href={blog.link} className="block mt-5">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300"
                />
              </a>

              <p
                className="mt-6 text-[15px] max-w-3xl mx-auto"
                
              >
                {blog.desc}
              </p>

              <div className="mt-6 flex justify-center">
                <a
                  href={blog.link}
                  className="px-6 py-2 rounded transition"
                  
                >
                  LEARN MORE
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
