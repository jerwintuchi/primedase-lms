import React from "react";
import MainNav from "../mainnav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const AboutPage = () => {
  return (
    <div className="about-page bg-yellow-300">
      <MainNav />

      <section className="hero flex flex-col justify-center items-center h-screen">
        <img
          src="/book-open.svg"
          alt="Book Icon"
          className="book-image justify-center h-20 w-20 pb-5"
        />{" "}
        {/* Position hero image in center */}
        <div className="hero-content w-full mx-auto max-w-screen-lg">
          {" "}
          {/* Center content horizontally */}
          <h1 className="text-3xl font-bold text-purple-800 mb-4 text-center pb-10">
            About Our Learning Management System
          </h1>{" "}
          {/* Center text horizontally */}
          <p className="text-lg text-purple-700 mb-4 px-20 indent-16">
            {" "}
            {/* Reduced margin and centered text */}
            Empower educators, ignite student passion. Our Learning Management
            System (LMS) is your one-stop shop for creating engaging online
            learning experiences. Educators can save time managing courses,
            personalize learning paths, and gain valuable insights with progress
            tracking. Learners stay motivated with interactive elements, deepen
            understanding through discussion forums, and track their progress
            towards success. Ready to transform your online learning? Contact us
            today!
          </p>
          <p className="text-lg text-purple-700 mb-4 px-20">
            {" "}
            {/* Reduced margin and centered text */}
            With features such as interactive quizzes, discussion forums, and
            progress analytics, our LMS aims to enhance the online learning
            experience for students of all levels.
          </p>
        </div>
      </section>

      <section className="benefits pb-5">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center justify-center pb-20">
          Benefits of Our LMS
        </h2>
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-x-48 gap-y-10 px-20 ml-10 mb-10">
          {" "}
          {/* Added grid-column-gap to benefits-grid class */}
          <div className="benefit">
            <i className="fas fa-check-circle text-purple-700 text-3xl mb-2"></i>
            <h3 className="text-lg font-medium text-purple-800 mb-2">
              Increased Engagement
            </h3>
            <p className="text-base text-gray-600">
              Engaging features keep students motivated and improve learning
              outcomes. The skills and knowledge gained through engaging
              features prepare students for future academic and professional
              endeavors.
            </p>
          </div>
          <div className="benefit">
            <i className="fas fa-chart-line text-purple-700 text-3xl mb-2"></i>
            <h3 className="text-lg font-medium text-purple-800 mb-2">
              Improved Learning Outcomes
            </h3>
            <p className="text-base text-gray-600">
              Track progress and personalize learning for better results.
              Detailed reports and analytics provide educators with valuable
              insights into student performance, allowing them to identify areas
              of strength and weakness.
            </p>
          </div>
          <div className="benefit">
            <i className="fas fa-users text-purple-700 text-3xl mb-2"></i>
            <h3 className="text-lg font-medium text-purple-800 mb-2">
              Streamlined Administration
            </h3>
            <p className="text-base text-gray-600">
              Say goodbye to cumbersome course management and resource
              organization. The LMS empowers you to manage courses, users, and
              resources efficiently. With intuitive tools for course creation,
              user administration, and resource sharing, educators can focus on
              what matters most - delivering engaging and effective learning
              experiences.
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm text-gray-700 text-center mb-4">
        Contact us to learn more about how our LMS can benefit your educational
        institution or organization. (+63) 91234567891
      </p>

      <section className="call-to-action">
        <div className="cta-container flex justify-center items-center px-20 py-8 bg-purple-700 text-white">
          <h3 className="text-xl font-bold mb-2 mr-20">
            Ready to empower your learning experience?
          </h3>
          <Link href="/sign-up">
            <Button
              variant="ghost"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md">
              Start Your Free Trial
            </Button>
          </Link>

          <div className="ml-10 flex items-center">
            <Image
              src="/primedase-footer.svg"
              alt="Logo Icon"
              width={50} // specify the width of the image
              height={50} // specify the height of the image
            />
            <div className="text-xs mb-3.5">&apos;©&apos; 2024 Primedase.</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
