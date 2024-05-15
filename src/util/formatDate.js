function formatDate(date) {
    // Define an array of month names
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
    const month = monthNames[date.getMonth()]; // Get full month name
    const year = date.getFullYear(); // Get year
  
    // Format the date string
    return `${day} ${month} ${year}`;
  }

export default formatDate;