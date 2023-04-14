import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import HeroSection from '../hero/HeroSection';
import ProjectSection from './ProjectSection/ProjectSection';
import StorySection from './StorySection/StorySection';
import ActionSection from './ActionSection/ActionSection';

const homeHeroData: {heading: string, subheading: string} = {
    "heading": `Small Actions can add up to improve racial equality`,
    "subheading": `Take action. Share your story. Inspire others.`
}

function Home(){
    return (
        <div>
            <NavBar />
            <HeroSection heading={homeHeroData.heading} subheading={homeHeroData.subheading} />
            <ProjectSection />
            <StorySection />
            <ActionSection />
            <Footer />
        </div>
    )
}
export default Home;