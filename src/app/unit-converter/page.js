import UnitConverter from "./component"

export const metadata = {
    title: "Unit Converter - Convert Length, Weight, Temperature, and More",
    description: "Easily convert units like length, weight, temperature, data, time and more with our free online unit converter. Fast, high-quality, and perfect for any device.",
    keywords: "unit converter, convert units online, length converter, weight converter, temperature converter, free unit converter, online unit converter, unit conversion, convert units of measurement, convert units of length, convert units of weight, convert units of temperature, unit converter for mobile, high-quality unit conversion, fast unit converter, data converter, time converter, area converter, speed converter, pressure converter, energy converter, angle converter",
};

const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Unit Converter",
    "url": "https://convertandcompress.com/unit-converter",
    "description": metadata.description,
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
            />
            <UnitConverter />
        </>
    );
}