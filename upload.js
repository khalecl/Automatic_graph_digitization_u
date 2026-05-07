window.App = window.App || {};

window.App.upload_js = (function() {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  let uploadedImage = null;

  function validateImage(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, message: 'Invalid file type. Please upload JPEG, PNG, GIF, or WebP.' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, message: 'File too large. Maximum size is 5MB.' };
    }
    return { valid: true };
  }

  function setupUpload() {
    const uploadButton = document.getElementById('upload-button');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (!uploadButton || !dropZone || !fileInput) {
      console.error('Upload elements not found in DOM');
      return;
    }

    uploadButton.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
      }
    });

    // Drag and drop events
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        handleImageUpload(e.dataTransfer.files[0]);
      }
    });
  }

  function handleImageUpload(file) {
    const validation = validateImage(file);
    if (!validation.valid) {
      window.App.app_js.showError(validation.message);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage = e.target.result;
      window.App.sharedState.uploadedImage = uploadedImage;
      window.App.app_js.updatePreview(uploadedImage);
      window.App.app_js.showSuccess('Image uploaded successfully!');
    };
    reader.onerror = () => {
      window.App.app_js.showError('Error reading file.');
    };
    reader.readAsDataURL(file);
  }

  // Public API
  return {
    setupUpload,
    handleImageUpload
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.App.upload_js.setupUpload);
} else {
  window.App.upload_js.setupUpload();
}