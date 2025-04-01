// Sliders for controlling palettes
let brightnessSlider, hueSlider, numberSlider, saturationSlider;

function setup() {
    createCanvas(800, 600);
    colorMode(HSB, 360, 100, 100);
    background(0);  // Black background for the canvas 
    textSize(14);
    
    let sliderX = 600;
    let sliderY = 50;
    let sliderSpacing = 40;
    
         // Create sliders
            brightnessSlider = createSlider(0, 100, 100);
            brightnessSlider.position(sliderX, sliderY);
            brightnessSlider.input(() => redraw());
    
        hueSlider = createSlider(0, 360, 60);
        hueSlider.position(sliderX, sliderY + sliderSpacing);
        hueSlider.input(() => redraw());
    
    numberSlider = createSlider(3, 12, 4);
     numberSlider.position(sliderX, sliderY + sliderSpacing * 2);
    numberSlider.input(() => redraw());
    
        saturationSlider = createSlider(0, 100, 100);
        saturationSlider.position(sliderX, sliderY + sliderSpacing * 3);
        saturationSlider.input(() => redraw());
}

function draw() {
    background(0);  // Clear frame
    
    // Draw patterns first
    let textX = 200;
    let yOffset = 40;
    let sectionSpacing = 60;
    
    textAlign(LEFT, CENTER);
    textSize(14);
    fill(255);
    
    // Pattern sections
    text("Monochromatic", textX, yOffset);
    drawMonochromatic(textX, yOffset + 10, 300, 30);
    yOffset += sectionSpacing;

    // analogous paallet
    text("Analogous with interval = 15", textX, yOffset);
    drawAnalogous(textX, yOffset + 10, 15);
    yOffset += sectionSpacing;
    
     text("Analogous with interval = 30", textX, yOffset);
     drawAnalogous(textX, yOffset + 10, 30);
     yOffset += sectionSpacing;
    
     //rectangles
    text("Smaller rectangles", textX, yOffset);
    drawSmallRectangles(textX, yOffset + 10);
    yOffset += sectionSpacing;
    
    text("Analogous with interval = 90, 4 colors", textX, yOffset);
    drawFourColors(textX, yOffset + 10);
    yOffset += sectionSpacing;
    
        text("Sine Intervals", textX, yOffset);
        drawSinePattern(textX, yOffset + 10, 300, 30);
        yOffset += sectionSpacing;
    
    text("Logarithmic Intervals", textX, yOffset);
    drawLogarithmicIntervals(textX, yOffset + 10);
    yOffset += sectionSpacing;
    
    text("Shape Pattern", textX, yOffset);
    drawShapePattern(textX, yOffset + 10);
    yOffset += sectionSpacing;
    
    text("Opacity Pattern", textX, yOffset);
    drawOpacityPalette(textX, yOffset + 10);
    
    // Draw UI elements last to ensure they're on top
    drawUI();
}

function drawUI() {
    textAlign(LEFT, CENTER);
    textSize(14);
    fill(255);
    
    // Draw labels to the left of sliders
    text("Brightness", brightnessSlider.x - 70, brightnessSlider.y + 5);
    text("Hue", hueSlider.x - 40, hueSlider.y + 5);
    text("Number", numberSlider.x - 50, numberSlider.y + 5);
    text("Saturation", saturationSlider.x - 70, saturationSlider.y + 5);
    
    // Dynamically clear and reapply slider values
     fill(255);
     text(brightnessSlider.value(), brightnessSlider.x + brightnessSlider.width + 10, brightnessSlider.y + 5);
     text(hueSlider.value(), hueSlider.x + hueSlider.width + 10, hueSlider.y + 5);
     text(numberSlider.value(), numberSlider.x + numberSlider.width + 10, numberSlider.y + 5);
     text(saturationSlider.value(), saturationSlider.x + saturationSlider.width + 10, saturationSlider.y + 5);
    
    // outputs for slider names 
    console.log("Brightness:", brightnessSlider.value());
    console.log("Hue:", hueSlider.value());
     console.log("Number:", numberSlider.value());
    console.log("Saturation:", saturationSlider.value());
}
//To create colour variations, a monochromatic palette alters hue while adjusting brightness.

function drawMonochromatic(x, y, w, h) {
    noStroke();
    for (let i = 0; i < w; i++) {
        let bright = map(i, 0, w, 20, brightnessSlider.value());
        fill(hueSlider.value(), saturationSlider.value(), bright);
        rect(x + i, y, 1, h);
    }
}

// Analogous palette: Generates harmonious colors using fixed intervals between hues
function drawAnalogous(x, y, interval) {
    let w = 40;
    noStroke();
    for (let i = 0; i < numberSlider.value(); i++) {
        let hue = (hueSlider.value() + (i * interval)) % 360;
        fill(hue, saturationSlider.value(), brightnessSlider.value());
        rect(x + (i * (w + 5)), y, w, 30);
    }
}

// Small rectangles pattern: Similar to analogous but with compact dimensions
function drawSmallRectangles(x, y) {
    let w = 20;
    noStroke();
    for (let i = 0; i < numberSlider.value(); i++) {
        let hue = (hueSlider.value() + (i * 30)) % 360;
        fill(hue, saturationSlider.value(), brightnessSlider.value());
        rect(x + (i * (w + 5)), y, w, 20);
    }
}

// Four color analogous: Creates a balanced palette with 90-degree hue intervals
function drawFourColors(x, y) {
    let w = 40;
    noStroke();
    for (let i = 0; i < 4; i++) {
        let hue = (hueSlider.value() + (i * 90)) % 360;
        fill(hue, saturationSlider.value(), brightnessSlider.value());
        rect(x + (i * (w + 5)), y, w, 30);
    }
}

// Sine wave pattern: Uses trigonometry for smooth, wave-like color transitions
function drawSinePattern(x, y, w, h) {
    noStroke();
    for (let i = 0; i < w; i++) {
        let hue = (hueSlider.value() + sin(map(i, 0, w, 0, TWO_PI)) * 30) % 360;
        fill(hue, saturationSlider.value(), brightnessSlider.value());
        rect(x + i, y, 1, h);
    }
}

// Refined logarithmic intervals with adjusted spacing
function drawLogarithmicIntervals(x, y) {
    let w = 30;
    let spacing = 0;
    noStroke();
    for (let i = 0; i < numberSlider.value(); i++) {
        let hue = (hueSlider.value() + (i * 45)) % 360;
        fill(hue, saturationSlider.value(), brightnessSlider.value());
        rect(x + spacing, y, w, 30);
        spacing += w + log(i + 2) * 12; // Fine-tuned multiplier
    }
}

// Updated shape pattern to use only triangles
function drawShapePattern(x, y) {
    let size = 30;
    noStroke();
    for (let i = 0; i < numberSlider.value(); i++) {
        let hue = (hueSlider.value() + (i * 30)) % 360;
        fill(hue, saturationSlider.value(), brightnessSlider.value());
        triangle(
            x + (i * (size + 5)), y + size,
            x + (i * (size + 5)) + size/2, y,
            x + (i * (size + 5)) + size, y + size
        );
    }
}

// Improved opacity pattern with proper transparency
function drawOpacityPalette(x, y) {
    let w = 30;
    noStroke();
    for (let i = 0; i < numberSlider.value(); i++) {
        let hue = (hueSlider.value() + (i * 30)) % 360;
        // Reversed opacity mapping for better visual effect
        let opacityValue = map(i, 0, numberSlider.value() - 1, 255, 50);
        fill(hue, saturationSlider.value(), brightnessSlider.value(), opacityValue);
        rect(x + (i * (w + 5)), y, w, 30);
    }
}
