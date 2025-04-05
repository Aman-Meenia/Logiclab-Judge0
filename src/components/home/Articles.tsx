"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    id: 1,
    title: "How To Deploy Personal Projects On AWS",
    summary: "Complete guide on how to deploy on AWS",
    image: "/AWS.jpg",
    slug: "https://www.amanmeenia.com/blog/How-To-Deploy-Personal-Project-On-Aws",
  },
  {
    id: 2,
    title: "Nginx as a Load Balancer",
    summary:
      "Learn how to use Nginx as a load balancer to distribute traffic across multiple Docker containers running Express servers.",
    image: "/Nginx-As-Load-Balancer.jpg",
    slug: "https://www.amanmeenia.com/blog/Load-Balancing-With-Nginx",
  },
  {
    id: 3,
    title: "Nginx And SSL",
    summary: "How to user Nginx as reverse proxy and generate ssl for websites",
    image: "/Nginx.jpg",
    slug: "https://www.amanmeenia.com/blog/Nginx-And-Ssl",
  },
  {
    id: 4,
    title: "Wezterm setup for Macos or Linux",
    summary: "How to make your boring terminal look Beautiful",
    image: "/wezterm.jpg",
    slug: "https://www.amanmeenia.com/blog/wezterm",
  },
];

export default function Articles() {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Latest Articles
          </h2>
          <Link
            href="https://www.amanmeenia.com/blog"
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link href={article.slug} key={article.id}>
              <Card className="h-full dark:bg-black border-2 border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:dark:border-blue-500 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden group cursor-pointer">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={article.image}
                    width={300}
                    height={300}
                    alt={article.title}
                    className="w-full h-full object-fit transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 z-20 bg-blue-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read article
                  </div>
                </div>
                <CardHeader className="p-5">
                  <CardTitle className="text-lg font-bold dark:text-white group-hover:text-blue-600 group-hover:dark:text-blue-500 transition-colors duration-300">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-sm dark:text-zinc-400 text-gray-600 line-clamp-2 group-hover:text-gray-800 group-hover:dark:text-zinc-300 transition-colors duration-300">
                    {article.summary}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
