const validateReminder = (reminder) => {

  if (reminder.description.length > 30) {
    return 'Description should be maximum of 30 chars.';
  }

  if (Object.entries(reminder).some(([_, value]) => value === '')) {
    return 'All fields are required.';
  }

  return true;
}

export default validateReminder;