import React from "react";

interface LayoutProps {
    title: string;
    content: string;
    children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ title, content, children }) => {
    return (
        <div>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-primary-bg">
                <h1 className="text-3xl text-header">{title}</h1>
                <p className="text-lg text-gray-600 text-justify mt-25">
                    {content}
                </p>
            </section>

            <section id="content" className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-secondary-bg">
                {children}
            </section>
        </div>
    );
};

export default PageLayout;
