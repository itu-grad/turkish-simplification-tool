import PageLayout from "@/components/layout/PageLayout";

export default function ResourcesPage() {
    return (
        <PageLayout
            title="Kaynaklar"
            content="Bu sayfada bu aracı hazırlarken kullandığımız Türkçe kaynaklarını görebilirsiniz."
        >
            <div className="w-full max-w-2xl text-left space-y-4 text-paragraph">
                <ul className="list-disc list-inside space-y-2">

                </ul>
            </div>
        </PageLayout>
    );
}
