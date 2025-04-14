// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const submitBtn = document.getElementById('submit-btn');
const symptomsInput = document.getElementById('symptoms');
const loadingSection = document.getElementById('loading');
const resultsSection = document.getElementById('results');
const resultsContainer = document.getElementById('results-container');
const newAnalysisBtn = document.getElementById('new-analysis');

// Theme Toggle Functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Mock data for demonstration (this would come from a real backend API)
const mockRecommendations = [
    {
        title: "Migraine",
        description: "Your symptoms align with common migraine patterns. Migraines are severe headaches often accompanied by nausea and sensitivity to light or sound.",
        severity: "medium",
        icon: "🩺",
        action: "Consider over-the-counter pain relievers and rest in a dark, quiet room. If symptoms persist or worsen, consult a healthcare provider."
    },
    {
        title: "Tension Headache",
        description: "Your symptoms suggest a tension headache, which is often related to stress, muscle tension, or dehydration.",
        severity: "low",
        icon: "💆",
        action: "Try relaxation techniques, proper hydration, and OTC pain relievers. Maintain a regular sleep schedule and consider stress management techniques."
    },
    {
        title: "Cluster Headache",
        description: "Your symptoms have some characteristics of cluster headaches, which are extremely painful headaches that occur in patterns or clusters.",
        severity: "high",
        icon: "⚡",
        action: "Seek immediate medical attention as cluster headaches often require specialized treatment. Avoid alcohol and tobacco during episodes."
    }
];

// Form Submission
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Validate form
    if (!symptomsInput.value.trim()) {
        alert('Please describe your symptoms before submitting.');
        return;
    }
    
    // Show loading animation
    loadingSection.style.display = 'block';
    
    // Simulate API call
    setTimeout(() => {
        loadingSection.style.display = 'none';
        displayResults(mockRecommendations);
    }, 2000);
});

// Display Results
function displayResults(recommendations) {
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Create result cards
    recommendations.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <div class="card-icon">${rec.icon}</div>
            <h4 class="card-title">${rec.title}</h4>
            <span class="severity ${rec.severity}">${rec.severity.charAt(0).toUpperCase() + rec.severity.slice(1)} Priority</span>
            <p class="card-description">${rec.description}</p>
            <p><strong>Recommended Action:</strong> ${rec.action}</p>
            <a href="#" class="card-link">Learn more</a>
        `;
        resultsContainer.appendChild(card);
    });
    
    // Show results section with smooth entrance
    resultsSection.style.opacity = '0';
    resultsSection.style.display = 'block';
    setTimeout(() => {
        resultsSection.style.opacity = '1';
        resultsSection.style.transition = 'opacity 0.5s ease';
    }, 50);
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Start New Analysis Button
newAnalysisBtn.addEventListener('click', () => {
    symptomsInput.value = '';
    resultsSection.style.display = 'none';
    
    // Scroll to input form
    document.getElementById('input-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Detect system theme preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    }
});
