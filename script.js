// Campaign data
const campaigns = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description:
      "Bringing clean, safe drinking water to underserved communities through innovative filtration systems and sustainable infrastructure.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    raised: 45000,
    target: 75000,
    donors: 234,
    daysLeft: 45,
    category: "Water & Health",
    impact: "500+ families will have access to clean water",
    featured: true,
    urgency: "high",
    video: true,
    tags: ["health", "featured"],
  },
  {
    id: 2,
    title: "Digital Education Bridge",
    description:
      "Providing tablets, internet access, and digital literacy training to students in remote areas to bridge the education gap.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    raised: 28000,
    target: 50000,
    donors: 156,
    daysLeft: 30,
    category: "Education",
    impact: "200+ students will receive digital education tools",
    featured: true,
    urgency: "medium",
    video: false,
    tags: ["education", "featured"],
  },
  {
    id: 3,
    title: "Mental Health Support Network",
    description:
      "Creating accessible mental health resources and peer support groups for young adults facing anxiety and depression.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    raised: 62000,
    target: 100000,
    donors: 312,
    daysLeft: 60,
    category: "Mental Health",
    impact: "1000+ young adults will receive mental health support",
    featured: false,
    urgency: "high",
    video: true,
    tags: ["health"],
  },
  {
    id: 4,
    title: "Sustainable Agriculture Training",
    description:
      "Teaching farmers eco-friendly farming techniques to increase crop yields while protecting the environment.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    raised: 18000,
    target: 35000,
    donors: 89,
    daysLeft: 25,
    category: "Environment",
    impact: "150+ farmers will learn sustainable practices",
    featured: false,
    urgency: "medium",
    video: false,
    tags: ["environment"],
  },
  {
    id: 5,
    title: "Emergency Medical Response",
    description:
      "Equipping rural communities with emergency medical supplies and training local volunteers in first aid and CPR.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    raised: 85000,
    target: 120000,
    donors: 445,
    daysLeft: 15,
    category: "Healthcare",
    impact: "2000+ people will have access to emergency medical care",
    featured: true,
    urgency: "high",
    video: true,
    tags: ["health", "featured"],
  },
  {
    id: 6,
    title: "Women Entrepreneur Fund",
    description:
      "Supporting women-led startups with microloans, mentorship, and business development resources in developing regions.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    raised: 32000,
    target: 60000,
    donors: 178,
    daysLeft: 40,
    category: "Economic Empowerment",
    impact: "300+ women will start their own businesses",
    featured: false,
    urgency: "medium",
    video: false,
    tags: [],
  },
]

// Global variables
let currentFilter = "all"
let selectedCampaign = null
let selectedAmount = 0
let currentStep = 1

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderCampaigns()
  animateStats()
  setupScrollEffects()
})

// Animate statistics on page load
function animateStats() {
  setTimeout(() => {
    animateNumber("total-raised", 270000, "$", "+")
    animateNumber("total-donors", 1414, "", "+")
    animateNumber("active-campaigns", 6, "", "")
  }, 500)
}

// Animate number counting
function animateNumber(elementId, targetValue, prefix = "", suffix = "") {
  const element = document.getElementById(elementId)
  const duration = 2000
  const startTime = Date.now()
  const startValue = 0

  function updateNumber() {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)
    element.textContent = prefix + currentValue.toLocaleString() + suffix

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  updateNumber()
}

// Setup scroll effects
function setupScrollEffects() {
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header")
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled")
    } else {
      header.classList.remove("header-scrolled")
    }
  })
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  })
}

// Filter campaigns
function filterCampaigns(filter) {
  currentFilter = filter

  // Update filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active", "bg-green-500", "hover:bg-green-600", "text-white", "shadow-lg")
    btn.classList.add("border", "border-slate-600", "text-slate-300", "hover:bg-slate-800", "hover:border-green-400/50")
  })

  event.target.classList.add("active", "bg-green-500", "hover:bg-green-600", "text-white", "shadow-lg")
  event.target.classList.remove(
    "border",
    "border-slate-600",
    "text-slate-300",
    "hover:bg-slate-800",
    "hover:border-green-400/50",
  )

  renderCampaigns()
}

// Render campaigns
function renderCampaigns() {
  const grid = document.getElementById("campaigns-grid")
  let filteredCampaigns = campaigns

  if (currentFilter !== "all") {
    if (currentFilter === "featured") {
      filteredCampaigns = campaigns.filter((c) => c.featured)
    } else {
      filteredCampaigns = campaigns.filter((c) => c.tags.includes(currentFilter))
    }
  }

  grid.innerHTML = filteredCampaigns
    .map(
      (campaign, index) => `
        <div class="campaign-card group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-500 rounded-2xl overflow-hidden animate-fade-in-up ${campaign.featured ? "ring-2 ring-green-400/30" : ""}" style="animation-delay: ${index * 100}ms;">
            <div class="relative overflow-hidden">
                <img src="${campaign.image}" alt="${campaign.title}" class="w-full h-56 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Badges -->
                <div class="absolute top-4 left-4 flex flex-col gap-2">
                    ${campaign.featured ? '<span class="bg-green-500 text-white shadow-lg px-3 py-1 rounded-full text-sm font-medium"><i class="fas fa-star mr-1"></i>Featured</span>' : ""}
                    <span class="bg-${getUrgencyColor(campaign.urgency)}-500 text-white shadow-lg px-3 py-1 rounded-full text-sm font-medium">
                        ${campaign.urgency === "high" ? "Urgent" : campaign.urgency === "medium" ? "Active" : "Ongoing"}
                    </span>
                </div>
                
                <div class="absolute top-4 right-4">
                    <span class="bg-slate-900/80 text-white backdrop-blur-sm px-3 py-1 rounded-full text-sm">${campaign.category}</span>
                </div>
                
                ${campaign.video ? '<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="bg-white/20 backdrop-blur-sm rounded-full p-4"><i class="fas fa-play text-white text-2xl"></i></div></div>' : ""}
            </div>
            
            <div class="p-6 space-y-4">
                <div>
                    <h3 class="text-white font-bold text-xl mb-2 group-hover:text-green-400 transition-colors">${campaign.title}</h3>
                    <p class="text-slate-300 text-sm leading-relaxed line-clamp-3">${campaign.description}</p>
                </div>
                
                <!-- Progress Section -->
                <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                        <span class="text-slate-400">Raised: $${campaign.raised.toLocaleString()}</span>
                        <span class="text-slate-400">Goal: $${campaign.target.toLocaleString()}</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${getProgressPercentage(campaign.raised, campaign.target)}%"></div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="text-green-400 text-sm font-semibold">
                            ${getProgressPercentage(campaign.raised, campaign.target).toFixed(1)}% funded
                        </div>
                        <div class="text-slate-400 text-sm">${campaign.daysLeft} days left</div>
                    </div>
                </div>
                
                <!-- Stats -->
                <div class="flex justify-between items-center text-sm text-slate-400 pt-2 border-t border-slate-700">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-users"></i>
                        <span>${campaign.donors} supporters</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-chart-line"></i>
                        <span>${campaign.impact.split(" ")[0]} impacted</span>
                    </div>
                </div>
                
                <!-- Impact Preview -->
                <div class="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20">
                    <div class="flex items-center space-x-2 text-green-400 text-sm font-medium mb-1">
                        <i class="fas fa-target"></i>
                        <span>Impact Goal:</span>
                    </div>
                    <p class="text-slate-300 text-sm">${campaign.impact}</p>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex gap-3 pt-2">
                    <button onclick="openDonationModal(${campaign.id})" class="flex-1 btn-primary text-white font-medium shadow-lg py-3 rounded-lg transition-all duration-300">
                        Support Now
                        <i class="fas fa-heart ml-2"></i>
                    </button>
                    <button class="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-green-400 bg-transparent px-4 py-3 rounded-lg transition-all duration-300">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Get progress percentage
function getProgressPercentage(raised, target) {
  return Math.min((raised / target) * 100, 100)
}

// Get urgency color
function getUrgencyColor(urgency) {
  switch (urgency) {
    case "high":
      return "red"
    case "medium":
      return "yellow"
    default:
      return "green"
  }
}

// Open donation modal
function openDonationModal(campaignId) {
  selectedCampaign = campaigns.find((c) => c.id === campaignId)
  document.getElementById("modal-campaign-title").textContent = selectedCampaign.title
  document.getElementById("modal-campaign-impact").textContent = selectedCampaign.impact
  document.getElementById("summary-campaign").textContent = selectedCampaign.title

  const modal = document.getElementById("donation-modal")
  modal.classList.remove("hidden")
  modal.classList.add("flex", "modal-enter")

  // Reset form
  currentStep = 1
  selectedAmount = 0
  showStep(1)
}

// Close donation modal
function closeDonationModal() {
  const modal = document.getElementById("donation-modal")
  modal.classList.add("hidden")
  modal.classList.remove("flex", "modal-enter")
}

// Show donation step
function showStep(step) {
  document.querySelectorAll(".donation-step").forEach((el) => el.classList.add("hidden"))
  document.getElementById(`donation-step-${step}`).classList.remove("hidden")
  currentStep = step
}

// Next step
function nextStep(step) {
  showStep(step)
}

// Select amount
function selectAmount(amount) {
  selectedAmount = amount
  document.getElementById("custom-amount").value = ""

  // Update button states
  document.querySelectorAll(".amount-btn").forEach((btn) => {
    btn.classList.remove("selected", "bg-green-500", "hover:bg-green-600", "text-white", "border-green-500")
    btn.classList.add("border-slate-600", "text-slate-300", "hover:bg-slate-700", "hover:border-green-400")
  })

  event.target.classList.add("selected", "bg-green-500", "hover:bg-green-600", "text-white", "border-green-500")
  event.target.classList.remove("border-slate-600", "text-slate-300", "hover:bg-slate-700", "hover:border-green-400")

  updateSummary()
}

// Select payment method
function selectPayment(method) {
  // Update button states
  document.querySelectorAll(".payment-btn").forEach((btn) => {
    btn.classList.remove("selected", "bg-green-500", "hover:bg-green-600", "text-white", "border-green-500")
    btn.classList.add("border-slate-600", "text-slate-300", "hover:bg-slate-700")
  })

  event.target.classList.add("selected", "bg-green-500", "hover:bg-green-600", "text-white", "border-green-500")
  event.target.classList.remove("border-slate-600", "text-slate-300", "hover:bg-slate-700")
}

// Update summary
function updateSummary() {
  const customAmount = document.getElementById("custom-amount").value
  const amount = customAmount || selectedAmount

  document.getElementById("summary-amount").textContent = `$${amount}`
  document.getElementById("summary-total").textContent = `$${amount}`
}

// Complete donation
function completeDonation() {
  // Here you would integrate with a real payment processor
  alert("Thank you for your support! This is a demo - no actual payment was processed.")
  closeDonationModal()
}

// Handle custom amount input
document.addEventListener("DOMContentLoaded", () => {
  const customAmountInput = document.getElementById("custom-amount")
  if (customAmountInput) {
    customAmountInput.addEventListener("input", () => {
      selectedAmount = 0
      document.querySelectorAll(".amount-btn").forEach((btn) => {
        btn.classList.remove("selected", "bg-green-500", "hover:bg-green-600", "text-white", "border-green-500")
        btn.classList.add("border-slate-600", "text-slate-300", "hover:bg-slate-700", "hover:border-green-400")
      })
      updateSummary()
    })
  }
})

// Close modal when clicking outside
document.addEventListener("click", (event) => {
  const modal = document.getElementById("donation-modal")
  if (event.target === modal) {
    closeDonationModal()
  }
})

// Handle escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDonationModal()
  }
})
