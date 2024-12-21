'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function UnitConverter() {
    const [category, setCategory] = useState("");
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");

    const categories = {
        length: ["Meters", "Kilometers", "Centimeters", "Millimeters", "Miles", "Yards", "Feet", "Inches"],
        area: ["Square Meters", "Square Kilometers", "Square Miles", "Square Feet", "Square Inches", "Hectares", "Acres"],
        volume: ["Cubic Meters", "Cubic Feet", "Cubic Inches", "Liters", "Milliliters", "Gallons", "Quarts", "Cups"],
        weight: ["Kilograms", "Grams", "Milligrams", "Metric Tons", "Pounds", "Ounces", "Stone"],
        time: ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Years"],
        temperature: ["Celsius", "Fahrenheit", "Kelvin"],
        speed: ["Meters per second", "Kilometers per hour", "Miles per hour", "Knots", "Feet per second"],
        pressure: ["Pascal", "Kilopascal", "Bar", "PSI", "Atmosphere"],
        energy: ["Joules", "Kilojoules", "Calories", "Kilocalories", "Watt-hours", "Kilowatt-hours", "BTU"],
        data: ["Bytes", "Kilobytes", "Megabytes", "Gigabytes", "Terabytes", "Bits", "Kilobits", "Megabits"],
        angle: ["Degrees", "Radians", "Gradians"],
        frequency: ["Hertz", "Kilohertz", "Megahertz", "Gigahertz"],
    };

    const convert = () => {
        if (!inputValue || !fromUnit || !toUnit) return;

        let result;
        const value = parseFloat(inputValue);

        if (category === "temperature") {
            let celsius;
            switch (fromUnit) {
                case "Celsius": celsius = value; break;
                case "Fahrenheit": celsius = (value - 32) * 5 / 9; break;
                case "Kelvin": celsius = value - 273.15; break;
            }
            switch (toUnit) {
                case "Celsius": result = celsius; break;
                case "Fahrenheit": result = (celsius * 9 / 5) + 32; break;
                case "Kelvin": result = celsius + 273.15; break;
            }
        } else {
            const conversionRates = {
                "Meters": 1,
                "Kilometers": 1000,
                "Centimeters": 0.01,
                "Millimeters": 0.001,
                "Miles": 1609.34,
                "Yards": 0.9144,
                "Feet": 0.3048,
                "Inches": 0.0254,
                // Area (to square meters)
                "Square Meters": 1,
                "Square Kilometers": 1000000,
                "Square Miles": 2589988.11,
                "Square Feet": 0.092903,
                "Square Inches": 0.00064516,
                "Hectares": 10000,
                "Acres": 4046.86,
                // Volume (to cubic meters)
                "Cubic Meters": 1,
                "Cubic Feet": 0.0283168,
                "Cubic Inches": 0.0000163871,
                "Liters": 0.001,
                "Milliliters": 0.000001,
                "Gallons": 0.00378541,
                "Quarts": 0.000946353,
                "Cups": 0.000236588,
                // Weight (to grams)
                "Kilograms": 1000,
                "Grams": 1,
                "Milligrams": 0.001,
                "Metric Tons": 1000000,
                "Pounds": 453.592,
                "Ounces": 28.3495,
                "Stone": 6350.29,
                // Time (to seconds)
                "Seconds": 1,
                "Minutes": 60,
                "Hours": 3600,
                "Days": 86400,
                "Weeks": 604800,
                "Months": 2592000,
                "Years": 31536000,
                // Speed (to m/s)
                "Meters per second": 1,
                "Kilometers per hour": 0.277778,
                "Miles per hour": 0.44704,
                "Knots": 0.514444,
                "Feet per second": 0.3048,
                // Pressure (to Pascal)
                "Pascal": 1,
                "Kilopascal": 1000,
                "Bar": 100000,
                "PSI": 6894.76,
                "Atmosphere": 101325,
                // Energy (to Joules)
                "Joules": 1,
                "Kilojoules": 1000,
                "Calories": 4.184,
                "Kilocalories": 4184,
                "Watt-hours": 3600,
                "Kilowatt-hours": 3600000,
                "BTU": 1055.06,
                // Data (to bytes)
                "Bytes": 1,
                "Kilobytes": 1024,
                "Megabytes": 1048576,
                "Gigabytes": 1073741824,
                "Terabytes": 1099511627776,
                "Bits": 0.125,
                "Kilobits": 128,
                "Megabits": 131072,
                // Angle (to radians)
                "Radians": 1,
                "Degrees": 0.0174533,
                "Gradians": 0.015708,
                // Frequency (to Hz)
                "Hertz": 1,
                "Kilohertz": 1000,
                "Megahertz": 1000000,
                "Gigahertz": 1000000000
            };

            const baseValue = value * conversionRates[fromUnit];
            result = baseValue / conversionRates[toUnit];
        }

        setResult(result.toFixed(4));
    };

    const getCategoryIcon = (cat) => {
        const icons = {
            length: "📏",
            area: "📐",
            volume: "🧊",
            weight: "⚖️",
            time: "⏰",
            temperature: "🌡️",
            speed: "🚗",
            pressure: "🎈",
            energy: "⚡",
            data: "💾",
            angle: "📐",
            frequency: "〰️",
        };
        return icons[cat] || "🔄";
    };

    return (
        <main>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="navbar_in_pages">
                    <Navbar />
                </div>
                <Card className="card w-96 flex flex-col justify-center items-center shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-normal">Unit Converter</CardTitle>
                        <CardDescription className="text-center font-light">Quick and accurate conversions</CardDescription>

                        <div className="flex flex-wrap justify-center gap-2 pt-4">
                            {['length', 'weight', 'temperature', 'time'].map((cat) => (
                                <Button
                                    key={cat}
                                    variant="outline"
                                    size="sm"
                                    className={`px-3 py-1 ${category === cat ? 'bg-blue-50 text-blue-600' : ''}`}
                                    onClick={() => {
                                        setCategory(cat);
                                        setFromUnit("");
                                        setToUnit("");
                                        setResult("");
                                    }}
                                >
                                    <span className="mr-1">{getCategoryIcon(cat)}</span>
                                    <span className="capitalize">{cat}</span>
                                </Button>
                            ))}
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col justify-center items-center gap-4 w-full">
                        <Select value={category} onValueChange={(value) => {
                            setCategory(value);
                            setFromUnit("");
                            setToUnit("");
                            setResult("");
                        }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(categories).map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        <div className="flex items-center gap-2">
                                            <span>{getCategoryIcon(cat)}</span>
                                            <span className="capitalize">{cat}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {category && (
                            <div className="w-full space-y-4">
                                <div className="flex gap-2">
                                    <Select value={fromUnit} onValueChange={setFromUnit}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="From" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories[category].map((unit) => (
                                                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select value={toUnit} onValueChange={setToUnit}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Convert to" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories[category].map((unit) => (
                                                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <Input
                                        type="number"
                                        placeholder="Enter value"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <Button
                                    onClick={convert}
                                    className="w-full"
                                    disabled={!fromUnit || !toUnit || !inputValue}
                                >
                                    Convert
                                </Button>

                                {result && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1">Result</div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-lg">
                                                    {inputValue} {fromUnit}
                                                </div>
                                                <div className="text-xl font-semibold text-blue-600">
                                                    = {result} {toUnit}
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="ml-2"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${result} ${toUnit}`);
                                                }}
                                            >
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* {fromUnit && toUnit && (
                                    <div>
                                        <p className="text-sm text-gray-500">Quick Values</p>
                                        <div className="flex gap-2 pt-1">
                                            {['1', '10', '100'].map((val) => (
                                                <Button
                                                    key={val}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setInputValue(val);
                                                        setTimeout(convert, 0);
                                                    }}
                                                >
                                                    {val}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </main>
    );
}