import React from 'react';

export default function Demo() {
    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Video Demo Section */}
            <div className="max-w-5xl mx-auto">


                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/4Ohz3xRD4GM?si=QRYYkWARZwKLd6j5"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>


            </div>
        </section>
    );
}
