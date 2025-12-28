// Contract Address
const CONTRACT_ADDRESS = "0x5E5Ca4eEF905cDE3C871A1f31e825eF159356Fad";

// Social links
const SOCIAL_LINKS = [
	{
		name: "X",
		url: "https://x.com/ShrimpArmy_erc",
		iconPath: "x.svg"
	},
	{
		name: "View Chart",
		url: "https://dexscreener.com/ethereum/0x00000000000000000000000000000000000000",
		iconPath: "dexscreener.svg"
	},
	{
		name: "Buy Now",
		url: "https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x00000000000000000000000000000000000000",
		iconPath: "pill.svg"
	}
];

// Meme images list
const MEME_IMAGES = [
	"c5fe6254-50c4-4689-9f35-5ad2a4bb6868.jpg",
	"G9N6EovWcAAZV1F.jpg",
	"G9Nayr7bgAE3UfZ.jpg",
	"G9NdzMiacAAIhJW.jpg",
	"G9NfryxbgAItdhv.jpg",
	"G9Ngq7ibAAA_rHA.jpg",
	"G9NpyATWUAAb71c.jpg",
	"G9NtrAEaEAAvjMU.jpg",
	"G9NTrHubgAA4deR.jpg",
	"G9OBFGvbIAAfhtB.jpg"
];

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
	initCopyButton();
	initBuyButton();
	initMemeGallery();
	initSocialLinks();
});

// Toast notification system
function showToast(message) {
	// Remove existing toast if any
	const existingToast = document.querySelector(".toast");
	if (existingToast) {
		existingToast.remove();
	}

	// Create toast element
	const toast = document.createElement("div");
	toast.className = "toast";
	toast.textContent = message;
	document.body.appendChild(toast);

	// Trigger animation
	setTimeout(() => {
		toast.classList.add("show");
	}, 10);

	// Remove toast after animation
	setTimeout(() => {
		toast.classList.remove("show");
		setTimeout(() => {
			toast.remove();
		}, 300);
	}, 2000);
}

// Copy contract address functionality
function initCopyButton() {
	const copyBtn = document.getElementById("copy-btn");
	const contractAddress = document.getElementById("contract-address");

	if (!copyBtn || !contractAddress) return;

	copyBtn.addEventListener("click", async () => {
		try {
			await navigator.clipboard.writeText(CONTRACT_ADDRESS);
			showToast("Contract address copied! 🦐");
		} catch (err) {
			// Fallback for older browsers
			const textArea = document.createElement("textarea");
			textArea.value = CONTRACT_ADDRESS;
			textArea.style.position = "fixed";
			textArea.style.opacity = "0";
			document.body.appendChild(textArea);
			textArea.select();
			
			try {
				document.execCommand("copy");
				showToast("Contract address copied! 🦐");
			} catch (fallbackErr) {
				console.error("Failed to copy:", fallbackErr);
				showToast("Failed to copy address");
			}
			
			document.body.removeChild(textArea);
		}
	});
}

// Buy button - opens pump.fun
function initBuyButton() {
	const buyBtn = document.getElementById("buy-btn");
	
	if (!buyBtn) return;
	
	buyBtn.addEventListener("click", () => {
		// Open pump.fun with the contract address
		const pumpUrl = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;
		window.open(pumpUrl, "_blank");
	});
}

// Image viewer functions
function openImageViewer(imageSrc) {
	const viewer = document.getElementById("image-viewer");
	const viewerImage = document.getElementById("viewer-image");
	
	if (!viewer || !viewerImage) return;
	
	viewerImage.src = imageSrc;
	viewer.classList.add("active");
	document.body.style.overflow = "hidden";
}

function closeImageViewer() {
	const viewer = document.getElementById("image-viewer");
	
	if (!viewer) return;
	
	viewer.classList.remove("active");
	document.body.style.overflow = "";
}

// Initialize meme gallery
function initMemeGallery() {
	const galleryContainer = document.getElementById("meme-gallery");
	
	if (!galleryContainer) return;
	
	MEME_IMAGES.forEach((imageName) => {
		const galleryItem = document.createElement("div");
		galleryItem.className = "gallery-item";
		
		const img = document.createElement("img");
		img.src = `memes/${imageName}`;
		img.alt = "Shrimp Army Meme";
		img.loading = "lazy";
		
		// Add click handler to open image viewer
		galleryItem.addEventListener("click", () => {
			openImageViewer(img.src);
		});
		
		galleryItem.appendChild(img);
		galleryContainer.appendChild(galleryItem);
	});
	
	// Initialize image viewer close handlers
	const viewer = document.getElementById("image-viewer");
	const closeBtn = document.getElementById("image-viewer-close");
	
	if (closeBtn) {
		closeBtn.addEventListener("click", closeImageViewer);
	}
	
	if (viewer) {
		// Close on overlay click
		viewer.addEventListener("click", (e) => {
			if (e.target === viewer || e.target.classList.contains("image-viewer-overlay")) {
				closeImageViewer();
			}
		});
		
		// Close on Escape key
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && viewer.classList.contains("active")) {
				closeImageViewer();
			}
		});
	}
}

// Initialize social links
async function initSocialLinks() {
	const socialLinksContainer = document.getElementById("social-links");
	
	if (!socialLinksContainer) return;
	
	for (const social of SOCIAL_LINKS) {
		try {
			// Fetch SVG content
			const response = await fetch(social.iconPath);
			const svgContent = await response.text();
			
			const linkElement = document.createElement("a");
			linkElement.href = social.url;
			linkElement.target = "_blank";
			linkElement.rel = "noopener noreferrer";
			linkElement.className = "social-link";
			linkElement.innerHTML = `${svgContent}<span>${social.name}</span>`;
			
			socialLinksContainer.appendChild(linkElement);
		} catch (error) {
			console.error(`Failed to load icon for ${social.name}:`, error);
			// Fallback: create link without icon
			const linkElement = document.createElement("a");
			linkElement.href = social.url;
			linkElement.target = "_blank";
			linkElement.rel = "noopener noreferrer";
			linkElement.className = "social-link";
			linkElement.innerHTML = `<span>${social.name}</span>`;
			socialLinksContainer.appendChild(linkElement);
		}
	}
}

// Add some interactive effects
document.addEventListener("mousemove", (e) => {
	const hero = document.querySelector(".hero");
	if (!hero) return;
	
	const { clientX, clientY } = e;
	const { innerWidth, innerHeight } = window;
	
	const xPercent = (clientX / innerWidth) * 100;
	const yPercent = (clientY / innerHeight) * 100;
	
	hero.style.background = `
		radial-gradient(ellipse at ${xPercent}% ${yPercent}%, rgba(255, 107, 107, 0.15) 0%, var(--darker) 70%),
		radial-gradient(circle at 20% 50%, rgba(78, 205, 196, 0.15) 0%, transparent 50%),
		radial-gradient(circle at 80% 80%, rgba(255, 230, 109, 0.1) 0%, transparent 50%)
	`;
});
