import React from "react";

interface LayoutProps {
    title: string;
    content: string;
    children?: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ title, content, children }) => {
    const hasChildren = !!children && React.Children.count(children) > 0;

    return (
        <div>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-24 bg-primary-bg">
                <h1 className="text-3xl text-header">{title}</h1>
                <p className="text-lg text-paragraph text-justify mt-6">
                    {content}
                </p>
            </section>

            {hasChildren && (
                <section
                    id="content"
                    className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-24 bg-secondary-bg"
                >
                    {children}
                </section>
            )}
        </div>
    );
};

export default PageLayout;
