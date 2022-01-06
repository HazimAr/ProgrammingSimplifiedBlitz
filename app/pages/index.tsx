import Stats from "app/core/components/home/stats"
import CoursesSection from "app/core/components/home/courses"
import Faq from "app/core/components/home/faq"
import Features from "app/core/components/home/features"
import Footer from "app/core/components/home/footer"
import Header from "app/core/components/home/header"
import Hero from "app/core/components/home/hero"
import Language from "app/core/components/home/language"
import Testimonials from "app/core/components/home/testimonials"
import { Course } from "types"
import { getCourses } from "app/core/api/notion"

function Home({ courses }: { courses: Course[] }) {
  return (
    <main style={{ color: "#101010" }}>
      <Header />

      <Hero />
      <Stats />
      <Features />
      <CoursesSection courses={courses} />
      <Language />
      <Testimonials />
      <Faq />

      <Footer />
    </main>
  )
}

export async function getStaticProps() {
  return {
    props: {
      courses: (await getCourses()).reverse(),
    },
    revalidate: 3600,
  }
}

Home.suppressFirstRenderFlicker = true

export default Home
