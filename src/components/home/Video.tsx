export default function Video() {
    return (
        <section className="min-h-screen text-center py-16 bg-secondary-bg">
            <h2 className="text-2xl font-semibold text-header mb-6">Demo Videosu</h2>
            <div
                style={{
                    position: 'relative',
                    paddingBottom: '45.9375%',
                    height: 0,
                }}
            >
                <iframe
                    src="https://www.loom.com/embed/070cca1de1f64c5cbb2b0d5fcd140beb?sid=52198199-5825-44e6-abc1-6def76b21a84"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '70%',
                        height: '75%',
                        margin: '0 auto',
                        display: 'block',
                        right: 0,
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                ></iframe>
            </div>
        </section>
    );
}
