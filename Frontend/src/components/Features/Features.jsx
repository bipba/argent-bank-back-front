import featuresData from '../../data/features.json';

import Feature from '../../components/Feature/Feature';

export default function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map(feature =>
                <Feature feature={feature} key={feature.id}/>
            )}
        </section>
    )
}