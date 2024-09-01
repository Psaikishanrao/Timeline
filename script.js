let currentIndex = 1;

function showItem(index) {
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(`item-${index}`).classList.add('active');
}

function updateProgressBar(step) {
    const steps = document.querySelectorAll('.step');
    const progress = document.getElementById('line-progress');
    const droneIcon = document.getElementById('drone-icon');

    const stepPercentage = 100 / (steps.length - 1);
    const newWidth = `${stepPercentage * (step - 1)}%`;
    progress.style.width = newWidth;
    droneIcon.style.left = newWidth;

    steps.forEach((stepElement, index) => {
        stepElement.classList.toggle('active', index < step);
    });
}

function handleMouseMove(event) {
    const progressBarContainer = document.getElementById('progress-bar-container');
    const rect = progressBarContainer.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; 
    const percentage = mouseX / rect.width;

    const totalSteps = document.querySelectorAll('.step').length;
    const stepIndex = Math.min(totalSteps, Math.max(1, Math.round(percentage * (totalSteps - 1)) + 1));

    if (stepIndex !== currentIndex) {
        currentIndex = stepIndex;
        showItem(currentIndex);
        updateProgressBar(currentIndex);
    }
}

showItem(currentIndex);
updateProgressBar(currentIndex);

window.addEventListener('resize', () => {
    updateProgressBar(currentIndex);
});

const progressBarContainer = document.getElementById('progress-bar-container');
progressBarContainer.addEventListener('mousemove', handleMouseMove);
