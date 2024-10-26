import Footer from '../../components/Footer/Footer';
import Features from '../../components/Features/Features';
import Banner from '../../components/Banner/Banner';


export default function Home() {
    return (
        <div>
            <main className='main'>
                <Banner />
                <Features />
            </main>
            <Footer />
        </div>    
    )
}